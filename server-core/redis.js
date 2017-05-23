const RedisSessions = require('redis-sessions');
const config = require('./config');

class RedisServer {
    constructor(){
        this.rs = new RedisSessions();
        this.rsapp = config.redis.rsapp;
    }
    create(id,ip,timeout,logintype,cb){
        this.rs.create({
            app: this.rsapp,
            id: id,
            ip: ip,
            ttl: timeout,
            d: {
                login_type: logintype
            }
        },function(err,resp){
            console.log("Err:" + err + "; Response:" + resp);
            if(err)
                cb(1,resp);
            else {
                // Return token
                cb(0,resp.token);
            }
        })
    }
    getActivity(duration,cb){
        // return the active user in this duration 
        this.rs.activity({
            app: this.rsapp,
            dt: duration
        },function(err,resp){
            // return resp.activity as the active user in this duration time
            cb(err,resp);
        })
    }
    fetchall(duration,cb){
        this.rs.soapp({
            app:this.rsapp,
            dt: duration
        },function(err,resp){
            // return all session in app
            // format: resp.sessions[] , each has id to distinguish
            cb(err,resp);
        })
    }
    fetchbyid(id,cb){
        this.rs.soid({
            app:this.rsapp,
            id: id
        },function(err,resp){
            // return format:
            // resp.sessions[] if there has multiple session in redis server
            cb(err,resp);
        })
    }
    clearbyid(id,cb){
        this.rs.kill({
            app: this.rsapp,
            id: id
        }, function(err,resp){
            // will return the amounts of session that were killed
            cb(err,resp);
        })
    }
    destroy(){
        // Kill all the session here
        this.rs.killall({
            app: this.rsapp
        },function(err,resp){
            if(err)
                console.log("Error in destory redis session.");
            else {
                console.log(resp);
            }
        });
    }
}

module.exports = {
    RedisServer : new RedisServer()
}
