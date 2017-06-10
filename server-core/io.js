// lib
const IO = require('socket.io');
const sjcl = require('sjcl');
const rs = require('randomstring');
const jsfs = require('jsonfile');
const path = require('path');

// Define prototype of carpool element
const carpool_element_1 = {
    name: "勇盛老司機",
    type: ['high_rate','no_smoke','jp','en'],
    rate: 4,
    img: 'driver/liu.jpg'
}
const carpool_element_2 = {
    name: "旭民老司機",
    type: ['no_smoke','en','outgoing'],
    rate: 1,
    img: 'driver/chu.jpg'
}
// Define prototype of waiting channel
const waiting_channel_1 = {
    room: "username",
    driver: "driver_name",
    GAs: []
}

// server-core
const {RedisServer} = require('./redis');
const {MongoDBService} = require('./mongoDB_module');

// Get the specific element in waiting channel, and add GA
function add_channel_GA(room_name,channels,GA_name,GA_socket){
    for(var index in channels){
        if(channels[index].room == room_name){
            console.log("Push!");
            channels[index].GAs.push({
                ga_name: GA_name,
                ga_socket: GA_socket,
                accept: false
            });
        }
    }
}

// Get filter
function carpool_filter(pool,filter,percent){
    let matcher = 0;
    // if match rate > percentage, then return true
    for(var index in filter){
        if(pool.type.indexOf(filter[index]) > -1){
            // exist , ++
            matcher++;
        }
    }
    console.log("Current Percentage: " + (matcher / filter.length) + "; Threshold: " + percent);
    if((matcher / filter.length) > percent){
        return 1;
    }
    else{
        return 0;
    }
}

class SyncService {
    init(server){
        // Create Web Socket Server
        this.io = new IO().listen(server);
        // Maintain available car pool
        this.carpool = [];
        this.carpool.push(carpool_element_1);
        this.carpool.push(carpool_element_2);
        // Maintain current waiting GA channel
        this.waiting_channel = [];
        // Binding this to use
        var self = this;
        // Web Socket Listening
        this.io.sockets.on('connection',function(socket){
            // when client side connection to our server
            // ========================================================================================== "Join" type ==========================================================================================
            socket.on("join",function(room_info){
                console.log('[Sync] Join Room request send from : ' + socket.request.connection.remoteAddress+" ; With Room ID :" + room_info.room_name);
                // Remember the socket room_name
                socket.room_name = room_info.room_name;
                socket.room_type = room_info.type;
            });
            // ========================================================================================== "Disconnect" type ==========================================================================================
            socket.on("disconnect",function(){
                // disconnet
                console.log('[Sync] '+ socket.request.connection.remoteAddress +' ,detach from channel.' );
                // check out the room name
                console.log('[Sync] Leaving Room: ' + socket.room_name);
                if(socket.room_name == "waiting" || socket.room_name == undefined){
                    // don't splice
                }
                else{
                    // cancel the channel
                    if(socket.room_type == "user"){
                        socket.leave(socket.room_name);
                        self.waiting_channel.splice(self.waiting_channel.indexOf(socket.room_name),1);
                    }
                }
            });
            // "user first require random key"
            socket.on("randomkey_require",function(){
                // emit the random key to user
                socket.emit('randomkey_get',{ randomkey: rs.generate() });
            });

            // ========================================================================================== "User join service" ==========================================================================================
            socket.on("key_require",function(userdata){
                // First get user data :
                // @userdata.username : user account
                // @userdata.type : driver / passenger
                console.log("Get encrypted data, name = " + userdata.username + "; Get per-user encrypted key: " + userdata.key);
                // Found this user's data
                MongoDBService.user_m.findOne({name: sjcl.decrypt(userdata.key,userdata.username),type: sjcl.decrypt(userdata.key,userdata.type)},'name type token redisID',function(err,user){
                    if(err)
                        console.log('Server mongoDB error: ' + err);
                    else {
                        if(user == null){
                            // not found , emit error
                            console.log("Not found this user!");
                            socket.emit('user_error',{
                                msg: "Not found this user's data! Please enroll our service first!"
                            });
                        }
                        else{
                            console.log("key deliver to client!");
                            socket.emit('key_get',{
                                key: user.token,
                                id: user.redisID
                            });
                        }
                    }
                })
            });
            // ========================================================================================== "Trip launch" ==========================================================================================
            socket.on("trip_launch",function(init_obj){
                // get the object of GAs

                // emit signal to
                self.io.in(init_obj.user).emit('launch_receive',{
                    msg: "準備跳轉到共同搭乘畫面",
                    target: "/trip_launch",
                    type: "go",
                    channel: init_obj.user
                });
            });
            // ========================================================================================== "Trip Start service" ==========================================================================================
            socket.on("trip_start",function(init_obj){
                // user,type,key,filter,pos
                console.dir(init_obj);
                // add this socket into room
                socket.join(init_obj.user);
                // Fetch the car pool and find the available driver
                for(var index in self.carpool){
                    console.log(index);
                    if(carpool_filter(self.carpool[index],init_obj.filter,0.8)){
                        // send msg to client
                        socket.emit('match_driver',{
                            driver: self.carpool[index]
                        });
                        // FIXME remove this driver from carpool

                        // Add this into waiting channel
                        self.waiting_channel.push({
                            room: init_obj.user,
                            driver: self.carpool[index].name,
                            GAs: []
                        });
                        // return
                        return;
                    }
                }
            });
            // ========================================================================================== "Trip Cancel !" ==========================================================================================
            socket.on("trip_cancel",function(canc_obj){
                // user,type,key
                console.dir(canc_obj);
                socket.leave(canc_obj.user);
                // delete this from waiting_channel
                // cancel the channel
                self.waiting_channel.splice(self.waiting_channel.indexOf(canc_obj.user),1);
                // Emit delete message to user
                socket.emit('cancel_accept',{
                    msg: "This ride is deleted."
                });
            });
            // ========================================================================================== "GA was in here" ==========================================================================================
            socket.on('joinGA',function(ga_obj){
                // Add this socket into
                add_channel_GA(ga_obj.room,self.waiting_channel,ga_obj.ga,socket);
                // Emit to user
                self.io.in(ga_obj.room).emit('newGA',{
                    ga: ga_obj.ga,
                    rate: ga_obj.rate
                });
            });
            // ========================================================================================== "Accept this ga" ==========================================================================================
            socket.on('ga_accept',function(ga_obj){
                console.log("GA Accept Get!" + ga_obj.ga + "; User: " + ga_obj.user);
                // Find current channel
                for(var index in self.waiting_channel){
                    if(self.waiting_channel[index].room == ga_obj.user){
                        console.log("Match Room!");
                        for(var g_index in self.waiting_channel[index].GAs){
                            if(self.waiting_channel[index].GAs[g_index].ga_name == ga_obj.ga){
                                console.log("Match!");
                                // Add this user into the same socket with this passenger
                                self.waiting_channel[index].GAs[g_index].ga_socket.join(ga_obj.user);
                                self.io.in(ga_obj.user).emit('launch_receive',{
                                    msg: "新的守護天使: " + ga_obj.ga + " 加入護衛行列!",
                                    target: ga_obj.user,
                                    type: 'new GA'
                                });
                                self.waiting_channel[index].GAs[g_index].accept = true;
                                return;
                            }
                        }
                    }
                }
            });
            // ========================================================================================== "Bind together" ==========================================================================================
            socket.on('bind2gather',function(rawdata){
                // Just join this channel
                console.log("Join : " + rawdata.channel);
                socket.join(rawdata.channel);
            });
            socket.on('chat',function(rawdata){
                //
                console.log("Broadcast in channel: " + rawdata.channel);
                console.log("Sender: " + rawdata.who + "; Content: " + rawdata.content);
                self.io.in(rawdata.channel).emit('coming_msg',{
                    who: rawdata.who,
                    content: rawdata.content
                });
            });
        }); // Web Socket Listening
    }
}

module.exports = {
    SyncService : new SyncService()
}
