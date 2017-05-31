const config = require('./config');
const { SyncService } = require('./io');

class Debugger{
    init(app){
        app.get('/road',this.road);
        app.get('/security',this.security);
        app.get('/waiting',this.waiting);
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
    waiting(req,res){
        // Debug Monitor of Driver
        console.dir(SyncService.waiting_channel);
        res.render('waiting_channel_debug',{
            title: "Waiting Channel Monitor",
            channel: SyncService.waiting_channel
        });
    }
}

module.exports = {
    Debugger: new Debugger()
}
