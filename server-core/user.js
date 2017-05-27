// lib
const rs = require('randomstring');
// server-core
const config = require('./config');
const {MongoDBService} = require('./mongoDB_module');
const {RedisServer} = require('./redis');

class UserService {
    init(app){
        // Normal usage
        app.get('/normal',this.normal);
        app.get('/error',this.error);
        // Google Map tracking
        app.get('/map',this.map);
    }
    normal(req,res){
        // Parsing parameter from session
        console.log("Successfully Login with : " + req.query.type);
        let logintype = req.query.type;
        let profile = req.user;
        // Successfully login , and get redis session create
        // User id : using authenticate id
        RedisServer.create( profile.id ,req.connection.remoteAddress,7200,logintype, (err,user_token) => {
            console.log("RedisServer:")
            if(err){
                console.log("Error in Redis Server user creation. Response: " + user_token);
                res.end("Error in Redis Server user creation. Response: " + user_token);
            }
            else {
                console.log("Get new user token: "+ user_token);
                // Store in db
                // FIXME Redis id need to store into mongo
                MongoDBService.user_findOrCreateCB(req.query.type,profile.name.familyName + profile.name.givenName,user_token,profile.id,function(err,msg_type){
                    if(err == 0){
                        // Error occur
                        console.log(msg_type);
                        res.end("Error: " + msg_type);
                    }
                    else{
                        console.log("success : " + msg_type);
                        res.end("Email: " + req.session.email + "Password: " + req.session.password + "\nOAuth name:" + profile.name.familyName + profile.name.givenName);
                    }
                });
            }
        });

        // res.render('index',{title: "SCABER - Your best choice of taxi."});
    }
    error(req,res){
        res.end("End");
        // res.render("about",{title: "About us"});
    }
    map(req,res){
        res.render('googlemap',{
            title: "SCABER Monitor",
            apikey: config.map.apikey
        });
    }
}

module.exports = {
    UserService: new UserService()
};
