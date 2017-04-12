// display message to viewers

// definition here
class IntroService {
    init(app){
        app.get('/',this.index);
        app.get('/about',this.about);
    }
    index(req,res){
        res.render('index',{title: "SCABER - Your best choice of taxi."});
    }
    about(req,res){
        res.render("about",{title: "About us"});
    }
}

module.exports = {
    IntroService: new IntroService()
};
