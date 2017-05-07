// display message to viewers
const config = require('./config');
const {Converter} = require('./converter');

// definition here
class IntroService {
    init(app){
        // Landing page of SCABER.
        app.get('/',this.index);
        // About us page of SCABER
        app.get('/about',this.about);
        // List out all taxi guilds.
        app.get('/taxi_list',this.taxi_list);
    }
    index(req,res){
        // Define for landing page - parameter here
        res.render('index',{
            title: "SCABER - Your best choice of taxi."
        });
    }
    about(req,res){
        // Define for About us page
        res.render("aboutus",{
            title: "About us"
        });
    }
    taxi_list(req,res){
        // List out all valid taxi guilds
        let filter = req.query.filter;
        Converter.csv2json(config.taxi.valid_guild, (accept,data) => {
            if(accept==0){
                // print out the error message
                console.log(data);
            }
            else {
                if(filter != undefined){
                    var filterobj = [];
                    for(var index in data){
                        // Filtering
                        if(data[index].tax_number.includes(filter)||data[index].vendor_name.includes(filter)||data[index].vendor_address.includes(filter)||data[index].vendor_state.includes(filter)){
                            filterobj.push(data[index]);
                        }
                    }
                    res.render('valid_taxi',{title:"Current valid taxi vendor in Taiwan",taxi_list:filterobj});
                }
                else{
                    res.render('valid_taxi',{title:"Current valid taxi vendor in Taiwan",taxi_list:data});
                }
            }
        });
    }
}

module.exports = {
    IntroService: new IntroService()
};
