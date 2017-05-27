// lib
const IO = require('socket.io');
const sjcl = require('sjcl');
const rs = require('randomstring');
const jsfs = require('jsonfile');
const path = require('path');

// server-core
const {RedisServer} = require('./redis');
const {MongoDBService} = require('./mongoDB_module');
// Monitor variable

class SyncService {
    init(server){
        this.io = new IO().listen(server);
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
            })

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
            })
        });
    }
}

module.exports = {
    SyncService : new SyncService()
}
