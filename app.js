/**
 * Module dependencies.
 */

var express = require('express');
var boot = require('./lib/boot');
var path = require('path');
var Http = require('./lib/helpers');

GLOBAL.Http = Http;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'static/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'static/public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

boot(app);

