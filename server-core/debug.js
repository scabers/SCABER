const config = require('./config');

class Debugger{
    init(app){
        app.get('/road',this.road);
        app.get('/security',this.security);
    }
    road(req,res){
        res.render('road');
    }
    security(req,res){
        // Just show how we ensure the security
        res.render('security',{
            title: "Security ensurement Test",
            apikey: config.map.apikey
        });
    }
}

module.exports = {
    Debugger: new Debugger()
}
