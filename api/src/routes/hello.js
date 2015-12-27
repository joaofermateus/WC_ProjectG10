var server = require('./../index.js')
var resources = require('./../resources')

server.route({
  	method: 'GET',
  	path: '/hello',
  	handler: resources.hello.get
})

server.route({
	method: 'POST',
  	path: '/hello',
  	handler: resources.hello.post
})

server.route({
	method: 'POST',
	path: '/login',
	handler: resources.hello.login
})

server.route({
	method: 'POST',
	path: '/changepatient',
	handler: resources.hello.changepatient
})

server.route({
	method: 'GET',
	path: '/patients',
	handler: resources.hello.patients
})

server.route({
	method: 'GET',
	path: '/doctors',
	handler: resources.hello.doctors
})

server.route({
	method: 'GET',
	path: '/reports',
	handler: resources.hello.reports
})

server.route({
	method: 'GET',
	path: '/acts',
	handler: resources.hello.acts
})

server.route({
	method: 'GET',
	path: '/acts_rmb',
	handler: resources.hello.acts_rmb
})

server.route({
	method: 'GET',
	path: '/requests',
	handler: resources.hello.requests
})

server.route({
	method: 'POST',
	path: '/addmedicalact',
	handler: resources.hello.addmedicalact
})

server.route({
	method: 'POST',
	path: '/removemedicalact',
	handler: resources.hello.removemedicalact
})

server.route({
	method: 'POST',
	path: '/deletePatient',
	handler: resources.hello.deletePatient
})

server.route({
	method: 'POST',
	path: '/submitReport',
	handler: resources.hello.submitReport
})
