//set up mail schema
const mongoose = const module = require('module');uire('../app/config');
let Schema = mongoose.Schema;
let mail = new Schema({
	from: {
		type: String,
		required: true
	},
	to: {
		type: String,
		required: true
	},
	subject: {
		type: String,
		default: '-',
		reuired: true
	},
	text: {
		type: String,
		required: true,
		default: '-'
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	}
});
const Mail = mongoose.model('Mail', mail);
module.exports = Mail;
