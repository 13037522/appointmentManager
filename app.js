var express = require('express');
var path = require('path');

//connect to the mongoDB
var db = require('mongoskin').db("localhost/testdb", { w: 0});
    db.bind('event');

//create express app, use public folder for static files
var app = express();
app.use(express.static(path.join(__dirname, 'public')));

//is necessary for parsing POST request
app.use(express.bodyParser());

app.listen(3000);
