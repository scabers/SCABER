// Dealing with User authenticate
const https = require('https');
const config = require('./config');
const passport = require('passport');
const querystring = require('querystring');
const GithubStrategy = require('passport-github').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const child_process = require('child_process');

// definition here
class AuthService{
    init(app){
        // Initial passport Strategy
        app.use(passport.initialize());
        app.use(passport.session());
        // Facebook Strategy
        child_process.exec("hostname",function(err,stdout,stderr){
            var hostname = stdout.trim();
            if(hostname == 'luffy'){
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
                // for facebook
                app.get('/login/facebook',this.fblogin);
                app.get('/auth/facebook',this.fbauth);
                app.get('/auth/facebook/callback',passport.authenticate('facebook',{
                    successReturnToOrRedirect: config.auth.facebook.successUrl_luffy,
                    failureRedirect: config.auth.facebook.failureUrl_luffy
                }));
            }
            else{
                // Using origin configuration
                passport.use(new FacebookStrategy({
                    clientID: config.auth.facebook.clientID,
                    clientSecret: config.auth.facebook.clientSecret,
                    profileFields: config.auth.facebook.profileFields,
                    callbackURL: config.auth.facebook.callback
                    },
                    function(accessToken, refreshToken, profile,done){
                        let userdata = profile;
                        return done(null,userdata);
                    }
                ));
                // for facebook
                app.get('/login/facebook',this.fblogin);
                app.get('/auth/facebook',this.fbauth);
                app.get('/auth/facebook/callback',passport.authenticate('facebook',{
                    successReturnToOrRedirect: config.auth.facebook.successUrl,
                    failureRedirect: config.auth.facebook.failureUrl
                }));
            });
            //serialize and deserialize
            passport.serializeUser(function(user, done) {
                done(null, user);
            });

            passport.deserializeUser(function(user, done) {
                // And then here: attach user object to req!!
                done(null, user);
            });
        });
    }

    fblogin(req,res){
        if(req.isAuthenticated()){
            child_process.exec("hostname",function(err,stdout,stderr){
                if(stdout.trim() == 'luffy'){
                    res.redirect(config.auth.facebook.successUrl_luffy);
                }
                else{
                    res.redirect(config.auth.facebook.successUrl);
                }
            });
        }
        else{
            // Main Login page ~
            res.render('signin',{title:"LifeGamer-User login",type:'facebook'});
        }
    }
    fbauth(req,res,next){
        // Using passport to get authenticate
        if (!req.session) req.session = {};
        child_process.exec("hostname",function(err,stdout,stderr){
            if(stdout.trim() == 'luffy'){
                req.session.returnTo = config.auth.facebook.successUrl_luffy;
            }
            else{
                req.session.returnTo = config.auth.facebook.successUrl;
            }
        });

        // Pass them to session
        req.session.email = req.query.email;
        req.session.password = req.query.pwd;
        console.log('Email: ' + req.session.email + "; Pwd: " + req.session.password );
        passport.authenticate('facebook')(req, res, next);
    }
}

module.exports = {
    AuthService: new AuthService()
}
