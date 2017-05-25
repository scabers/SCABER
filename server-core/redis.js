const RedisSessions = require('redis-sessions');
const config = require('./config');

// usage
// @create : find & create new session
// @getActivity : get current activate users number
// @findall : get all session in this app
// @findbytoken : get session by token
// @findbyid : get session by id
// @clearbyid : clear this id's session
// @destroy : destroy all session

class RedisServer {
    constructor(){
        this.rs = new RedisSessions();
        this.rsapp = config.redis.rsapp;
    }
    create(id,ip,timeout,logintype,cb){
        // find and create !
        // bind for this
        var self = this;
        this.rs.soid({
            app:this.rsapp,
            id: id
        },function(err,resp){
            // return format:
            // resp.sessions[] if there has multiple session in redis server
            if(err==null){
                // not found , Create !
                console.log('Error['+err+']Not found this user in sessions! Create one for ' + id);
                self.rs.create({
                    app: self.rsapp,
                    id: id,
                    ip: ip,
                    ttl: timeout,
                    d: {
                        login_type: logintype
                    }
                },function(err,c_resp){
                    console.log("Err:" + err + "; Response:" + resp);
                    if(err)
                        cb(1,c_resp);
                    else {
                        // Return token
                        cb(0,c_resp.token);
                    }
                })
            }
            else {
                // exist , do nothing
                console.log("Code["+err+"]Exist this user");
                cb(1,resp);
            }
        });
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
    findall(duration,cb){
        this.rs.soapp({
            app:this.rsapp,
            dt: duration
        },function(err,resp){
            // return all session in app
            // format: resp.sessions[] , each has id to distinguish
            cb(err,resp);
        })
    }
    findbyid(id,cb){
        this.rs.soid({
            app:this.rsapp,
            id: id
        },function(err,resp){
            // return format:
            // resp.sessions[] if there has multiple session in redis server
            cb(err,resp);
        })
    }
    findbytoken(id,token,cb){
        this.rs.get({
            app: rsapp,
            token: token
        },function(err,resp){
            cb(err,resp);
        });
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
