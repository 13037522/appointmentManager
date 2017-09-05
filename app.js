var express = require('express');
var mango = require('mongoskin');
var path = require('path');
var app = express();
var util = require('util');
var bodyParser = require('body-parser');
const assert = require('assert');
const port = 3000;

//Call database booking on local host and connect
var db = mango.db('localhost:27017/booking',{ w: 0});
    db.bind('event');

//use public folder for static files
app.use(express.static(path.join(__dirname, 'public')));

//is necessary for parsing post request
app.use(express.bodyParser());

///init is necessary to generate test data
app.get('/init', function(req, res){
    db.event.insert({
		    text:"Fill in collection 1 ",
		      start_date: new Date(2017,8,1),
		        end_date:	new Date(2017,8,5)
	});
  	db.event.insert({
		text:"Fill in collections 2 ",
		start_date: new Date(2017,8,19),
		end_date:	new Date(2017,8,24)
	});
	db.event.insert({
		text:"Morning event",
		start_date: new Date(2017,8,4,4,0),
		end_date:	new Date(2017,8,4,14,0)
	});
	db.event.insert({
		text:"One more test event",
		start_date: new Date(2017,8,3),
		end_date:	new Date(2017,8,8),
		color: "#DD8616"
	});

	res.send("Test events were added to the database")
});

//http://localhost/3000/data will show what is inside collections
//data will be loaded inside teh calendar
app.get('/data', function(req, res){
	db.event.find().toArray(function(err, data){
		//set id property for all records
		for (var i = 0; i < data.length; i++)
			data[i].id = data[i]._id;

		//output response
		res.send(data);
	});
});

//update collections and save
app.post('/data', function(req, res){
	var data = req.body;

  //get operation type
	var mode = data["!nativeeditor_status"];
  //get id of record
	var sid = data.id;
	var tid = sid;

  //remove properties which we do not want to save in DB
	delete data.id;
	delete data.gr_id;
	delete data["!nativeeditor_status"];

  //output confirmation response
	function update_response(err, result){
		if (err)
			mode = "error";
		else if (mode == "inserted")
			tid = data._id;

		res.setHeader("Content-Type","text/xml");
		res.send("<data><action type='"+mode+"' sid='"+sid+"' tid='"+tid+"'/></data>");
	}

  //if db operation
	if (mode == "updated")
		db.event.updateById( sid, data, update_response);
	else if (mode == "inserted")
		db.event.insert(data, update_response);
	else if (mode == "deleted")
		db.event.removeById( sid, update_response);
	else
		res.send("Not supported operation");
});

app.listen(port);
console.log('Server is running on port 3000');
