module.exports = {
    "auth": {
        "facebook": {
            "clientID": "355405361527732",
            "clientSecret": "b0e67a58bce114ff8ebfa3f400ae4bc9",
            "callback": "http://140.116.245.242:3000/auth/facebook/callback",
            "callback_luffy": "http://luffy.ee.ncku.edu.tw:3000/auth/facebook/callback",
            "profileFields": ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified' , 'picture.type(large)'],
            "successUrl": "http://140.116.245.242:3000/normal",
            "successUrl_luffy": "http://luffy.ee.ncku.edu.tw:3000/normal",
            "failureUrl": "http://140.116.245.242:3000/error",
            "failureUrl_luffy": "http://luffy.ee.ncku.edu.tw:3000/error",
            "userAgent": "SCABER"
        },
        "google": {
            "clientID": "877935941595-c8t5u1tj55ns8us3mc8d1a6qbhk2apnc.apps.googleusercontent.com",
            "clientSecret": "EyLka2fH3rCHDhfn43_PHP8F",
            "callback_luffy": "http://luffy.ee.ncku.edu.tw:3000/auth/google/callback",
            "successUrl_luffy": "http://luffy.ee.ncku.edu.tw:3000/normal?type=google",
            "failureUrl_luffy": "http://luffy.ee.ncku.edu.tw:3000/error"
        }
    },
    "db": {
        "dbname": "uidd2017_groupK",
        "user": "groupk",
        "password": "3W3j7uQI"
    }
}
