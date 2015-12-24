exports = module.exports
var doctors = require('./doctors') 
var reports = require('./reports')
var acts = require('./acts')
var acts_rmb = require('./acts-rmb')
var patients = require('./patients')
var requests = require('./requests')

exports.sayHello = function (name) {
  return 'Hello ' + (name || 'World')
}
exports.test = function (name) {
	return 'Goodbye'
}
exports.patients = function () {
	return patients;
}
exports.doctors = function () {
	return doctors;
}
exports.reports = function () {
	return reports;
}
exports.acts = function () {
	return acts;
}
exports.acts_rmb = function () {
	return acts_rmb;
}
exports.requests = function () {
	return requests;
}

exports.login = function (username, password) {
	for (var i = 0; i < doctors.length; i++) {
		if (doctors[i].user === username && doctors[i].pass === password) {
			return [true, doctors[i]];
		}
	}
	return [false,''];
}

exports.changepatient = function (patient) {

	var returnedPatient = [];
	var patientActs = [];
	
	for (var i = 0; i < patients.length; i++) {
		if (patients[i].patID === patient.patID) {
			returnedPatient = patients[i];
		}
	}

	for (var i = 0; i < reports.length; i++) {
		if (patient.patID === reports[i].patID) {
			patientActs.push(reports[i]);
		}
	}
	
	for (var i = 0; i < patientActs.length; i++) {
		for (var j = 0; j < doctors.length; j++) {
			if (doctors[j].docID === patientActs[i].docID) {
				patientActs[i].docName = doctors[j].name;
			}
		}
		for (var k = 0; k < acts.length; k++) {
			if (acts[k].actID === patientActs[i].actID) {
				patientActs[i].actName = acts[k].name;
				patientActs[i].cost = acts[k].cost;
			}
		}
	}
	//isto é necessário para actualizar o patient.
	return [returnedPatient, patientActs]
}

exports.addmedicalact = function (actname, currentpatient) {

	var actEntry = '';
	var actID = '';

	for (var i = 0; i < acts.length; i++) {
		if(acts[i].name === actname) {
			actEntry = acts[i];
			actID = acts[i].actID;
		}
	}

	for (var i = 0; i < acts_rmb.length; i++) {
		if(actID === acts_rmb[i].actID && currentpatient.policy_type === acts_rmb[i].policy_type) {
			actEntry.rmb = acts_rmb[i].reimb_percentage;
		}
	}
	// actualiza ficheiro local json dos patients,
	for (var i = 0; i < patients.length; i++) {
		if (patients[i].patID === currentpatient.patID) {
			if(!patients[i].hasOwnProperty('acts')) {
				patients[i].acts = [];
			}
			patients[i].acts.push(actEntry);
		}
	}
	//só ´e preciso return ao act Entry.
	return [actEntry, patients];
}

exports.removemedicalact = function (actindex, currentpatient) {

	for (var i = 0; i < patients.length; i++) {
		if (patients[i].patID === currentpatient.patID) {
			patients[i].acts.splice(actindex,1);
		}
	}

	return actindex;
}