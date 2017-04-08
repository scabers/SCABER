// display message to viewers

// definition here
class IntroService {
    init(app){
        app.get('/about',this.about);
    }
    about(req,res){
        res.end("about us");
    }
}

module.exports = {
    IntroService: new IntroService()
};
