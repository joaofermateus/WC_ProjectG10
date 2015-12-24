var bl = require('../../../bl/src')

exports = module.exports

exports.get = function handler (request, reply) {
  reply(bl.sayHello())
}

exports.post = function handler (request, reply) {
  reply(bl.sayHello(request.payload.name))
}

exports.login = function handler (request, reply) {
	reply(bl.login(request.payload.user, request.payload.pass));
	/*
	
	var u = request.payload.user;
	var p = request.payload.pass;
	
	var success = bl.login(u, p);
	reply({success: success});
	**/
}
