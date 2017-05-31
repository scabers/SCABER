/* Library */
const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');
const express = require('express');
const RedisSessions = require('redis-sessions');
const bodyParser = require('body-parser');
/* Server core */
const { IntroService } = require('./server-core/intro');
const { AuthService } = require('./server-core/auth');
const { UserService } = require('./server-core/user');
const { SyncService } = require('./server-core/io');
const { Debugger } = require('./server-core/debug');
const config = require('./server-core/config');
const app = express();
const rs = new RedisSessions();
const rsapp = config.redis.rsapp;

/* Setting static directory */
app.use(express.static('client-service/elements'));
app.use(express.static('client-service/img'));
app.use(express.static('client-service/css'));
app.use(express.static('client-service/sass'));
app.use(express.static('client-service/js'));
app.use(express.static('client-service/lib'));
app.use(express.static('client-service/fonts'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/* Redirect views path */
app.set('views', path.join(__dirname, 'client-service/views'));

/* Setting view engine as ejs */
app.set('view engine', 'ejs');
app.use(require('express-session')({
    secret: 'SCABER cat',
    resave: true,
    saveUninitialized: true
}));

/* Modules */
IntroService.init(app);

/* Server start */
AuthService.init(app);
UserService.init(app);
Debugger.init(app);

/* Create server */
const server_config = {
    key: fs.readFileSync(path.join(__dirname, '..', 'ssl', 'private.key')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'ssl', 'certificate.crt'))
}
const server = https.createServer(server_config, app);
SyncService.init(server);

server.listen(process.env.npm_package_config_port, function() {
    console.log("SCABER server listening on port " + process.env.npm_package_config_port);
});