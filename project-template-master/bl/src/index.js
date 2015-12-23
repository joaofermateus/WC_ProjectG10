exports = module.exports
var fs = require('fs')
var doctors = require('./doctors') //JSON.parse(fs.readFileSync('./doctors.json', 'utf8'))

exports.sayHello = function (name) {
  return 'Hello ' + (name || 'World')
}
exports.test = function (name) {
	return 'Goodbye'
}
exports.login = function (username, password) {
	//return username;
	for(var i = 0; i < doctors.length; i++) {
		if (doctors[i].user === username && doctors[i].pass === password) {
			return true;
		}
	}
	return false;
}