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
            authID: String,
            userTYPE: String,
            token: String,
            trueID: String
        });

        // user schema model
        this.user_m = mongoose.model('user_m',this.userSchema);
    }

    // callback method of findorCreate
    user_findOrCreateCB(scaber_account,auth_type,auth_id,scaber_type,token,trueid,callback){
        var usermodel = this.user_m;
        this.user_m.findOne({name: scaber_account,type: auth_type}, 'name type',function(err,user){
            if(err){
                console.log(err);
                callback(1,"User findone error.");
            }
            else{
                if(user == null){
                    // not found
                    let newuser = new usermodel({name:scaber_account,type:auth_type,authID: auth_id,userTYPE: scaber_type,token: token,trueID: trueid});
                    newuser.save(function(err,newuser){
                        if(err){
                            console.log("Error with user save:" + err);
                            callback(1,"New user saving error.");
                        }
                        else {
                            console.log("Successfully save user");
                            callback(0,"create");
                        }
                    });
                }
                else{
                    // found one , return with error
                    callback(1,"Duplicate account");
                }
            }
        });
    }
    // check user
    user_check(scaber_account,callback){
        this.user_m.findOne({name: scaber_account},'',function(err,user){
            if(err){
                console.log("Error occur when checking user");
                callback(1,"Error occur when checking user");
            }
            else{
                if(user == null){
                    console.log("Not found");
                    callback(1,"Not found");
                }
                else{
                    // find one
                    console.log("Find!");
                    callback(0,user);
                }
            }
        });
    }
}

module.exports = {
    MongoDBService : new MongoDBService()
}
