// display message to viewers

// definition here
class IntroService {
    init(app){
        app.get('/',this.index);
        app.get('/about',this.about);
    }
    index(req,res){
        // Define for landing page - parameter here
        res.render('index',{
            title: "SCABER - Your best choice of taxi."
        });
    }
    about(req,res){
        // Define for About us page
        res.render("about",{
            title: "About us"
        });
    }
}

module.exports = {
    IntroService: new IntroService()
};
