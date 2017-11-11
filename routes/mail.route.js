
//Email route
const route = require('../controllers/mail.controller');
	module.exports = function(server) {
	server.get('/getAll', route.getAll);
	server.get('/detail/:id', route.getOne);
	server.post('/send', route.send);
}
