/* mongoose - usage */
const mongoose = require('mongoose');

class DBModule_MDB {
    constructor(){
        // Connect to our SCABER db
        mongoose.connect('mongodb:://localhost/SCABER');
        this.scaberdb = mongoose.connection;

        // Define user schema
        this.userSchema = mongoose.Schema({
            name: String,
            type: String
        });
        this.locSchema = mongoose.Schema({
            owner: String,
            time: String,
            x: Number,
            y: Number
        })

        // user schema model
        this.user_m = mongoose.model('user_m',this.userSchema);
        // location schema model
        this.loc_m = mongoose.model('loc_m',this.locSchema);
    }
    user_findOrCreate(n_type,n_name){
        // Find
        this.user_m.findOne({ name: n_name, type: n_type },'name type')
            .then(function(person){
                if(person == null){
                    // not found , then we create
                    let newuser = new this.user_m({name: n_name,type:n_type});
                    newuser.save(function(err,newuser){
                        if(err)
                            console.log("Error save user:"+err)
                        else
                            console.log("Successful save user");
                    })
                }
                else{
                    // found one , and then do not create
                    console.log("Found one, so do nothing");
                    console.log("With info: "+person);
                }
            });
    }
    loc_findOrCreate(n_owner,n_time,n_x,n_y){
        // Find
        this.loc_m.findOne({ owner: n_owner, time: n_time, x: n_x, y: n_y },'owner time x y')
            .then(function(locdata){
                if(locdata == null){
                    // not found , then we create
                    let newloc = new this.loc_m({owner: n_owner,time:n_time,x: n_x,y: n_y});
                    newloc.save(function(err,newloc){
                        if(err)
                            console.log("Error save loc data:"+err);
                        else
                            console.log("Successful save loc data");
                    })
                }
                else{
                    // found one , and then do not create
                    console.log("Found one, so do nothing");
                    console.log("With info: "+locadata);
                }
            });
    }
}

module.exports = {
    MongoDBService = new DBModule_MDB()
}
