// Dealing with User authenticate
const https = require('https');
const config = require('./config');
const passport = require('passport');
const querystring = require('querystring');
const GithubStrategy = require('passport-github').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {RedisServer} = require('./redis');

// definition here
class AuthService{
    init(app){
        // Initial passport Strategy
        app.use(passport.initialize());
        app.use(passport.session());
        // Using luffy configuration
        passport.use(new FacebookStrategy({
            clientID: config.auth.facebook.clientID,
            clientSecret: config.auth.facebook.clientSecret,
            profileFields: config.auth.facebook.profileFields,
            callbackURL: config.auth.facebook.callback_luffy
            },
            function(accessToken, refreshToken, profile,done){
                let userdata = profile;
                return done(null,userdata);
            }
        ));
        passport.use(new GoogleStrategy({
            clientID: config.auth.google.clientID,
            clientSecret: config.auth.google.clientSecret,
            scope: ['profile'],
            callbackURL: config.auth.google.callback_luffy
            },
            function(accessToken, refreshToken, profile, done){
                return done(null,profile);
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
        // for facebook
        app.get('/login/facebook',this.fblogin);
        app.get('/auth/facebook',this.fbauth);
        app.get('/auth/facebook/callback',passport.authenticate('facebook',{ failureRedirect: config.auth.facebook.failureUrl_luffy}),
            function(req,res){
                console.log(req.user);
                req.session.auth_type = "facebook";
                res.redirect(config.auth.facebook.successUrl_luffy);
        }
        );
        // for google
        app.get('/login/google',this.googlelogin);
        app.get('/auth/google',this.googleauth);
        app.get('/auth/google/callback',passport.authenticate('google',{ failureRedirect: config.auth.google.failureUrl_luffy }),
            function(req,res){
                // successful goes here - debug with req.user data
                console.log(req.user);
                req.session.auth_type = "google";
                // Prepare page for Google Auth
                res.redirect(config.auth.google.successUrl_luffy);
            }
        );

        // logout
        app.get('/logout',this.logout);
    }
    // Facebook
    fblogin(req,res){
        if(req.isAuthenticated() && req.session.auth_type == "facebook"){
            res.redirect(config.auth.facebook.successUrl_luffy);
        }
        else{
            // Main Login page ~
            res.render('signin',{title:"LifeGamer-User login",type:'facebook'});
        }
    }
    fbauth(req,res,next){
        // Using passport to get authenticate
        if (!req.session) req.session = {};
        req.session.returnTo = config.auth.facebook.successUrl_luffy;
        // Pass them to session
        req.session.email = req.query.email;
        req.session.password = req.query.pwd;
        console.log('Email: ' + req.session.email + "; Pwd: " + req.session.password );
        passport.authenticate('facebook')(req, res, next);
    }
    // Google
    googlelogin(req,res){
        if(req.isAuthenticated() && req.session.auth_type == "google"){
            res.redirect(config.auth.google.successUrl_luffy);
        }
        else{
            // Main Login page ~
            res.render('signin',{title:"LifeGamer-User login",type:'google'});
        }
    }
    googleauth(req,res,next){
        // Using passport to get authenticate
        if (!req.session) req.session = {};
        req.session.returnTo = config.auth.google.successUrl_luffy;
        // Pass them to session
        req.session.email = req.query.email;
        req.session.password = req.query.pwd;
        console.log('Email: ' + req.session.email + "; Pwd: " + req.session.password );
        passport.authenticate('google')(req, res, next);
    }
    logout(req,res){
        req.session.destroy();
        // FIXME change to kill this logout person
        RedisServer.destroy();
        res.end("Logout");
    }
}

module.exports = {
    AuthService: new AuthService()
}
