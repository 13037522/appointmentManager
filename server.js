//Appointment manager main
//This program is designed to make online booking
//It contains secure loging and option to book

﻿require('rootpath')();
var express = require('express');
var path = require('path');
const PORT = 3000;
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var mongo = require('mongoskin');

//option for mail server
const restify = require('restify');
const mailServer = restify.createServer({
	name: 'node_mailer'
});
mailServer.use(restify.acceptParser(mailServer.acceptable));
mailServer.use(restify.queryParser());
mailServer.use(restify.bodyParser());
restify.CORS.ALLOW_HEADERS.push('content-type');
mailServer.pre(restify.CORS({'origins': ['*']}));
require('./routes/mail.route')(mailServer);
//pointing to mail server not working yet
//app.use('/email', require('./controllers/mail.controller'));

//option for secure logging-in
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
//database mongodb  mongod --dbpath=../data/db
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('event');

// routes all secured but appo
app.use('/api', expressJwt({ secret: config.secret }).
	unless({ path: ['/api/users/authenticate', '/api/users/register'] }));
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));
app.use('/go',express.static(path.join(__dirname, 'public')));

app.get('/init', function(req, res){
	db.event.insert({
		text:"My test event A",
		start_date: new Date(2013,8,1),
		end_date:	new Date(2013,8,5)
	});
	db.event.insert({
		text:"My test event B",
		start_date: new Date(2013,8,19),
		end_date:	new Date(2013,8,24)
	});
	db.event.insert({
		text:"Morning event",
		start_date: new Date(2013,8,4,4,0),
		end_date:	new Date(2013,8,4,14,0)
	});
	db.event.insert({
		text:"One more test event",
		start_date: new Date(2013,8,3),
		end_date:	new Date(2013,8,8),
		color: "#DD8616"
	});

	res.send("Test events were added to the database")
});


app.get('/data', function(req, res){
	db.event.find().toArray(function(err, data){
			//set id property for all records
			for (var i = 0; i < data.length; i++)
				data[i].id = data[i]._id;
			//output response
			res.send(data);
	});
});

app.post('/data', function(req, res){
	var data = req.body;
	var mode = data["!nativeeditor_status"];
	var sid = data.id;
	var tid = sid;
	delete data.id;
	delete data.gr_id;
	delete data["!nativeeditor_status"];
	function update_response(err, result){
	if (err)
		mode = "error";
	else if (mode == "inserted")
		tid = data._id;
	res.setHeader("Content-Type","text/xml");
  res.send("<data><action type='"+mode+"' sid='"+sid+"' tid='"+tid+"'/></data>");
	}
	if (mode == "updated")
		db.event.updateById( sid, data, update_response);
		else if (mode == "inserted")
		db.event.insert(data, update_response);
		else if (mode == "deleted")
		db.event.removeById( sid, update_response);
		else
		res.send("Not supported operation");
});

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

// start server
var server = app.listen(PORT, function () {
	console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
