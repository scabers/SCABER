const config = require('./config');
const { SyncService } = require('./io');

class Debugger{
    init(app){
        app.get('/road',this.road);
        app.get('/security',this.security);
        app.get('/waiting',this.waiting);
        app.get('/trip_launch',this.trip_launch);
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
    trip_launch(req,res){
        var type = req.query.type == undefined ? "monitor" : "host";
        res.render('chatRoom',{
            title: "歡迎來到共同頻道",
            channel: req.query.channel,
            chatter: req.query.chatter,
            type: type
        });
    }
}

module.exports = {
    Debugger: new Debugger()
}
