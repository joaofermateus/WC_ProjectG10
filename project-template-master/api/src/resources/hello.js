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
}

exports.changepatient = function handler (request, reply) {
	reply(bl.changepatient(request.payload.patient));
}

exports.patients = function handler (request, reply) {
	reply(bl.patients());
}

exports.doctors = function handler (request, reply) {
	reply(bl.doctors());
}

exports.reports = function handler (request, reply) {
	reply(bl.reports());
}

exports.acts = function handler (request, reply) {
	reply(bl.acts());
}

exports.acts_rmb = function handler (request, reply) {
	reply(bl.acts_rmb());
}

exports.requests = function handler (request, reply) {
	reply(bl.requests());
}

exports.addmedicalact = function handler (request, reply) {
	reply(bl.addmedicalact(request.payload.actname, request.payload.currentpatient));
}

exports.removemedicalact = function handler (request, reply) {
	reply(bl.removemedicalact(request.payload.actindex, request.payload.currentpatient));
}