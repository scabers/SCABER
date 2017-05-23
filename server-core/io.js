// mostly use on sync service
const IO = require('socket.io');
const sjcl = require('sjcl');
const rs = require('randomstring');
const jsfs = require('jsonfile');
const path = require('path');

// Available car pool

// Monitor

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

            // "User join service"
            socket.on("key_require",function(userdata){
                // First get user data :
                // @userdata.username : user account
                // @userdata.type : driver / passenger

            })
        });
    }
}

module.exports = {
    SyncService : new SyncService()
}
