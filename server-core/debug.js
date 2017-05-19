class Debugger{
    init(app){
        app.get('/road',this.road);
    }
    road(req,res){
        res.render('road');
    }
}

module.exports = {
    Debugger: new Debugger()
}
