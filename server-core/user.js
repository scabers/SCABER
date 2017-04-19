class UserService {
    init(app){
        app.get('/normal',this.normal);
        app.get('/error',this.error);
    }
    normal(req,res){
        res.end("Normal login");
        // res.render('index',{title: "SCABER - Your best choice of taxi."});
    }
    error(req,res){
        res.end("End");
        // res.render("about",{title: "About us"});
    }
}

module.exports = {
    UserService: new UserService()
};
