// Email controller
const Mail = require('../models/mail.model');
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
	service: 'Gmail', // Your SMTP
	auth: {
    user: 'scooterinosem@gmail.com', // Your email id
    pass: 'Reza1@#$%' // Your password
  }
});
module.exports = {
	'getAll': function(req, res) {
		Mail.find(req.query)
		.then(function(mails) {
			if (mails == null) {
				res.status(400);
				res.json('null');
			}
			res.json(mails);
		})
		.catch(function(errMails) {
		res.status(400);
		res.json(errMails);
		});
	},
	'getOne': function(req, res) {
		Mail.findOne({
			_id: req.params.id
		})
		.then(function(found) {
			if (found == null) {
				res.status(404);
				res.json('not found!');
			}
			res.json(found);
		})
		.catch(function(errFound) {
			res.status(400);
			res.json(errFound);
		});
	},
	'send': function(req, res) {
		if (typeof req.body.to != 'string') {
			res.status(400);
			res.json('sending an email is require the destination address!');
		}
		let mailOptions = {
			to: req.body.to,
			subject: req.body.subject,
			text: req.body.text
		};
		transporter.sendMail(mailOptions)
		.then(function(sent) {
			console.log('sent!');
			req.body.from = 'your email id or address here', // Your email id
			Mail.create(req.body)
			.then(function(created) {
				console.log('created!');
				res.json(created);
			})
			.catch(function(errCreated) {
				console.log(errCreated);
				res.status(400);
				res.json(errCreated);
			});
		})
		.catch(function(errSent) {
			console.log(errSent);
			res.status(400);
			res.json(errSent);
		});
	}
}
