module.exports = {
    "auth": {
        "github": {
            "clientID": "xxxxxxxxxxxxxxx",
            "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "callback": "http://localhost:3000/auth/github/callback",
            "userAgent": "SCABER-dev"
        },
        "facebook": {
            "clientID": "355405361527732",
            "clientSecret": "b0e67a58bce114ff8ebfa3f400ae4bc9",
            "callback": "http://140.116.245.242:3000/auth/facebook/callback",
            "profileFields": ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified' , 'picture.type(large)'],
            "successUrl": "http://140.116.245.242:3000/normal",
            "failureUrl": "http://140.116.245.242:3000/error",
            "userAgent": "SCABER"
        }
    }
}
