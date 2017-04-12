// display message to viewers

// definition here
class IntroService {
    init(app){
        app.get('/',this.index);
        app.get('/about',this.about);
    }
    index(req,res){
        res.render('index');
    }
    about(req,res){
        res.render("about");
    }
}

module.exports = {
    IntroService: new IntroService()
};
