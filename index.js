//Email server RESTFY
const restify = require('restify');
const server = restify.createServer({
	name: 'node_mailer'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
restify.CORS.ALLOW_HEADERS.push('content-type');
server.pre(restify.CORS({'origins': ['*']}));
	require('../routes/mail.route')(server);

server.listen(1234, function() {
	console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;
