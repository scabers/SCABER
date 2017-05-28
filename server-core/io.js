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

// server-core
const {RedisServer} = require('./redis');
const {MongoDBService} = require('./mongoDB_module');

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
            // "Join" type
            socket.on("join",function(room_info){
                console.log('[Sync] Join Room request send from : ' + socket.request.connection.remoteAddress+" ; With Room ID :" + room_info.room_name);
            });
            // "Disconnect" type
            socket.on("disconnect",function(){
                console.log('[Sync] '+ socket.request.connection.remoteAddress +' ,detach from channel.' )
            });
            // "user first require random key"
            socket.on("randomkey_require",function(){
                // emit the random key to user
                socket.emit('randomkey_get',{ randomkey: rs.generate() });
            });

            // "User join service"
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
            // "Trip Start service"
            socket.on("trip_start",function(init_obj){
                // user,type,key,filter,pos
                console.dir(init_obj);
                // Fetch the car pool and find the available driver
                for(var index in self.carpool){
                    console.log(index);
                    if(carpool_filter(self.carpool[index],init_obj.filter,0.8)){
                        // send msg to client
                        socket.emit('match_driver',{
                            driver: self.carpool[index]
                        });
                        // FIXME remove this driver from carpool

                        // return
                        return;
                    }
                }
            });
        });
    }
}

module.exports = {
    SyncService : new SyncService()
}
