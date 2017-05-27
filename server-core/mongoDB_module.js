/* mongoose - usage */
const RedisSessions = require('redis-sessions');
const mongoose = require('mongoose');
const config = require('./config');

class MongoDBService {
    constructor(){
        this.options = {
            db: {native_parser: true},
            server: {poolSize:5},
            user: config.db.user,
            password: config.db.password
        }
        // Connect to our SCABER db
        mongoose.connect('mongodb://'+config.db.user+":"+config.db.password+"@localhost:27017/"+config.db.dbname);
        this.scaberdb = mongoose.connection;

        // Define user schema
        this.userSchema = mongoose.Schema({
            name: String,
            type: String,
            token: String,
            redisID: String
        });

        // user schema model
        this.user_m = mongoose.model('user_m',this.userSchema);
    }

    // callback method of findorCreate
    user_findOrCreateCB(n_type,n_name,n_token,n_id,callback){
        var usermodel = this.user_m;
        this.user_m.findOne({name: n_name,type: n_type}, 'name type',function(err,user){
            if(err)
                console.log(err);
            else{
                if(user == null){
                    // not found
                    let newuser = new usermodel({name:n_name,type:n_type,token:n_token,redisID:n_id});
                    newuser.save(function(err,newuser){
                        if(err){
                            console.log("Error with user save:" + err);
                            callback(0,err);
                        }
                        else {
                            console.log("Successfully save user");
                            callback(1,"create");
                        }
                    });
                }
                else{
                    // found one , and then do not create
                    // update token and id
                    console.log("Token: " + n_token + "; ID: " + n_id);
                    console.dir(n_token);
                    user.token = n_token;
                    user.redisID = n_id;
                    user.save(function(err,user){
                        if(err){
                            console.log("Exist user information update failure.");
                            callback(0,"Exist user information update failure.");
                        }
                        else{
                            console.log("Found one, so do nothing");
                            console.log("With info: "+user);
                            callback(1,"exist");
                        }
                    });
                }
            }
        });
    }
}

module.exports = {
    MongoDBService : new MongoDBService()
}
