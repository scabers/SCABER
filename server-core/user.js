const config = require('./config');
const {MongoDBService} = require('./mongoDB_module');

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
        let profile = req.user;
        // Store in db
        MongoDBService.user_findOrCreateCB('facebook',profile.name.familyName + profile.name.givenName,function(err,msg_type){
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
        // res.render('index',{title: "SCABER - Your best choice of taxi."});
    }
    error(req,res){
        res.end("End");
        // res.render("about",{title: "About us"});
    }
    map(req,res){
        res.render('googlemap',{
            title: "SCABER Monitor"
        });
    }
}

module.exports = {
    UserService: new UserService()
};
