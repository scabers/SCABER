// lib
const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// core
const {IntroService} = require('./server-core/intro');
/* Redirect views path */
app.set('views',path.join(__dirname,'client-service/views'));
/* Setting static directory - image use */
app.use(express.static('client-service/elements'));
app.use(express.static('client-service/images'));
app.use(express.static('client-service/js'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
/* Setting view engine as ejs */
app.set('view engine','ejs');

// Modules
IntroService.init(app);

// Server open
const server = http.createServer(app);

server.listen(process.env.npm_package_config_port,function(){
    console.log("SCABER server listening on port "+process.env.npm_package_config_port);
});
