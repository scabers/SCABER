// Dealing with User authenticate
const https = require('https');
const config = require('./config');
const passport = require('passport');
const querystring = require('querystring');
const GithubStrategy = require('passport-github').Strategy;

// definition here
class AuthService{
    init(app){
        // Initial passport Strategy
        app.use(passport.initialize());
        app.use(passport.session());
        // FIXME: application id & secret replace with available one
        // Github Strategy
        passport.use(new GithubStrategy({
            clientID: config.auth.github.clientID,
            clientSecret: config.auth.github.clientSecret,
            scope: "user repo",
            callbackURL: config.auth.github.callback
            },
            function(accessToken, refreshToken, profile, done){
                let userdata = profile;
                // Return user model
                return done(null,userdata);
            }
        ));

        //serialize and deserialize
        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            // And then here: attach user object to req!!
            done(null, user);
        });

        // login/callback
        app.get('/login/github',this.gitlogin);
        app.get('/auth/github',this.gitauth);
        app.get('/auth/github/callback',this.gitauthcb);
    }

    gitlogin(req,res){
        res.end('login with github');
    }
    gitauth(req,res,next){
        if (!req.session) req.session = {};
        req.session.returnTo = config.auth.successUrl;
        // Pass them to session
        // FIXME: usr,pwd need to build in web
        // req.session.username = req.query.usr;
        // req.session.password = req.query.pwd;
        passport.authenticate('github')(req, res, next);
    }
    gitauthcb(req,res){
        if(req.query.error){
            // redirect to error page
            res.end("Github callback error");
        }
        else{
            // Redirect to successful url
            res.end("Github authenticate pass");
        }
    }
}

module.exports = {
    AuthService: new AuthService()
}
