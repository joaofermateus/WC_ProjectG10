(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.bl = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[{"actID":0,"policy_type":0,"reimb_percentage":1},{"actID":0,"policy_type":1,"reimb_percentage":0.8},{"actID":0,"policy_type":2,"reimb_percentage":0.5},{"actID":0,"policy_type":3,"reimb_percentage":0.2},{"actID":1,"policy_type":0,"reimb_percentage":1},{"actID":1,"policy_type":1,"reimb_percentage":0.8},{"actID":1,"policy_type":2,"reimb_percentage":0.5},{"actID":1,"policy_type":3,"reimb_percentage":0.2},{"actID":2,"policy_type":0,"reimb_percentage":1},{"actID":2,"policy_type":1,"reimb_percentage":0.8},{"actID":2,"policy_type":2,"reimb_percentage":0.5},{"actID":2,"policy_type":3,"reimb_percentage":0.2},{"actID":3,"policy_type":0,"reimb_percentage":1},{"actID":3,"policy_type":1,"reimb_percentage":0.8},{"actID":3,"policy_type":2,"reimb_percentage":0.5},{"actID":3,"policy_type":3,"reimb_percentage":0.2},{"actID":4,"policy_type":0,"reimb_percentage":1},{"actID":4,"policy_type":1,"reimb_percentage":0.8},{"actID":4,"policy_type":2,"reimb_percentage":0.5},{"actID":4,"policy_type":3,"reimb_percentage":0.2},{"actID":5,"policy_type":0,"reimb_percentage":1},{"actID":5,"policy_type":1,"reimb_percentage":0.8},{"actID":5,"policy_type":2,"reimb_percentage":0.5},{"actID":5,"policy_type":3,"reimb_percentage":0.2},{"actID":6,"policy_type":0,"reimb_percentage":1},{"actID":6,"policy_type":1,"reimb_percentage":0.8},{"actID":6,"policy_type":2,"reimb_percentage":0.5},{"actID":6,"policy_type":3,"reimb_percentage":0.2}]
},{}],2:[function(require,module,exports){
module.exports=[{"actID":0,"name":"consulta","cost":50},{"actID":1,"name":"raio-X","cost":100},{"actID":2,"name":"tomografia","cost":150},{"actID":3,"name":"exame","cost":75},{"actID":4,"name":"cirurgia","cost":5000},{"actID":5,"name":"transfusão","cost":1000},{"actID":6,"name":"ecograma","cost":200}]
},{}],3:[function(require,module,exports){
module.exports=[{"docID":0,"name":"Leonor Pereira","speciality":"Clínica Geral","user":"doc0","pass":"pass"},
{"docID":1,"name":"João Santos","speciality":"Ortopedia","user":"doc1","pass":"pass"},
{"docID":2,"name":"Guilherme Silva","speciality":"Neurocirurgia","user":"doc2","pass":"pass"},
{"docID":3,"name":"Francisco Martins","speciality":"Pediatria","user":"doc3","pass":"pass"},
{"docID":4,"name":"Leonor Ferreira","speciality":"Ortopedia","user":"doc4","pass":"pass"},
{"docID":5,"name":"Matilde Santos","speciality":"Cardiologia","user":"doc5","pass":"pass"},
{"docID":6,"name":"Mariana Silva","speciality":"Psiquiatria","user":"doc6","pass":"pass"},
{"docID":7,"name":"Tomás Martins","speciality":"Pediatria","user":"doc7","pass":"pass"},
{"docID":8,"name":"Matilde Ferreira","speciality":"Clínica Geral","user":"doc8","pass":"pass"},
{"docID":9,"name":"Leonor Santos","speciality":"Neurocirurgia","user":"doc9","pass":"pass"}]


},{}],4:[function(require,module,exports){
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
},{"./acts":2,"./acts-rmb":1,"./doctors":3,"./patients":5,"./reports":6,"./requests":7}],5:[function(require,module,exports){
module.exports=[{"patID":0,"name":"Tomás Silva","policy_number":1000,"policy_type":0},{"patID":1,"name":"Tomás Santos","policy_number":1001,"policy_type":2},{"patID":2,"name":"Francisco Santos","policy_number":1002,"policy_type":1},{"patID":3,"name":"Mariana Pereira","policy_number":1003,"policy_type":2},{"patID":4,"name":"Leonor Oliveira","policy_number":1004,"policy_type":0},{"patID":5,"name":"Santiago Ferreira","policy_number":1005,"policy_type":1},{"patID":6,"name":"Rodrigo Silva","policy_number":1006,"policy_type":1},{"patID":7,"name":"João Martins","policy_number":1007,"policy_type":2},{"patID":8,"name":"Carolina Ferreira","policy_number":1008,"policy_type":0},{"patID":9,"name":"Beatriz Santos","policy_number":1009,"policy_type":2},{"patID":10,"name":"Leonor Costa","policy_number":1010,"policy_type":2},{"patID":11,"name":"Maria Ferreira","policy_number":1011,"policy_type":0},{"patID":12,"name":"Leonor Pereira","policy_number":1012,"policy_type":0},{"patID":13,"name":"Leonor Costa","policy_number":1013,"policy_type":0},{"patID":14,"name":"Tomás Ferreira","policy_number":1014,"policy_type":1},{"patID":15,"name":"João Martins","policy_number":1015,"policy_type":2},{"patID":16,"name":"Rodrigo Costa","policy_number":1016,"policy_type":3},{"patID":17,"name":"Matilde Silva","policy_number":1017,"policy_type":0},{"patID":18,"name":"Beatriz Pereira","policy_number":1018,"policy_type":0},{"patID":19,"name":"Guilherme Oliveira","policy_number":1019,"policy_type":2}]
},{}],6:[function(require,module,exports){
module.exports=[{"repID":0,"date":"1/1/2012","docID":7,"patID":0,"actID":3,"actual_reimb_perc":1},{"repID":1,"date":"4/8/2012","docID":7,"patID":0,"actID":6,"actual_reimb_perc":1},{"repID":2,"date":"10/11/2014","docID":7,"patID":0,"actID":4,"actual_reimb_perc":1},{"repID":3,"date":"18/2/2010","docID":2,"patID":0,"actID":4,"actual_reimb_perc":1},{"repID":4,"date":"19/9/2001","docID":9,"patID":0,"actID":0,"actual_reimb_perc":1},{"repID":0,"date":"4/8/2004","docID":0,"patID":1,"actID":4,"actual_reimb_perc":0.5},{"repID":1,"date":"16/9/2014","docID":4,"patID":1,"actID":2,"actual_reimb_perc":0.5},{"repID":2,"date":"24/12/2004","docID":7,"patID":1,"actID":2,"actual_reimb_perc":0.5},{"repID":3,"date":"14/10/2008","docID":8,"patID":1,"actID":1,"actual_reimb_perc":0.5},{"repID":4,"date":"12/8/2002","docID":0,"patID":1,"actID":3,"actual_reimb_perc":0.5},{"repID":0,"date":"15/5/2007","docID":2,"patID":2,"actID":5,"actual_reimb_perc":0.8},{"repID":1,"date":"21/6/2007","docID":9,"patID":2,"actID":4,"actual_reimb_perc":0.8},{"repID":2,"date":"1/1/2010","docID":1,"patID":2,"actID":1,"actual_reimb_perc":0.8},{"repID":3,"date":"25/8/2013","docID":5,"patID":2,"actID":4,"actual_reimb_perc":0.8},{"repID":4,"date":"23/12/2013","docID":3,"patID":2,"actID":0,"actual_reimb_perc":0.8},{"repID":0,"date":"9/8/2008","docID":7,"patID":3,"actID":3,"actual_reimb_perc":0.5},{"repID":1,"date":"9/7/2011","docID":7,"patID":3,"actID":6,"actual_reimb_perc":0.5},{"repID":2,"date":"10/12/2003","docID":3,"patID":3,"actID":5,"actual_reimb_perc":0.5},{"repID":3,"date":"20/12/2001","docID":3,"patID":3,"actID":2,"actual_reimb_perc":0.5},{"repID":4,"date":"15/5/2009","docID":9,"patID":3,"actID":6,"actual_reimb_perc":0.5},{"repID":0,"date":"22/3/2013","docID":5,"patID":4,"actID":2,"actual_reimb_perc":1},{"repID":1,"date":"27/2/2011","docID":5,"patID":4,"actID":4,"actual_reimb_perc":1},{"repID":2,"date":"15/3/2005","docID":7,"patID":4,"actID":3,"actual_reimb_perc":1},{"repID":3,"date":"26/6/2003","docID":6,"patID":4,"actID":0,"actual_reimb_perc":1},{"repID":4,"date":"13/5/2014","docID":4,"patID":4,"actID":3,"actual_reimb_perc":1},{"repID":0,"date":"27/10/2013","docID":9,"patID":5,"actID":2,"actual_reimb_perc":0.8},{"repID":1,"date":"19/10/2010","docID":2,"patID":5,"actID":5,"actual_reimb_perc":0.8},{"repID":2,"date":"25/5/2003","docID":1,"patID":5,"actID":4,"actual_reimb_perc":0.8},{"repID":3,"date":"6/6/2003","docID":8,"patID":5,"actID":2,"actual_reimb_perc":0.8},{"repID":4,"date":"25/3/2014","docID":8,"patID":5,"actID":3,"actual_reimb_perc":0.8},{"repID":0,"date":"16/4/2012","docID":9,"patID":6,"actID":3,"actual_reimb_perc":0.8},{"repID":1,"date":"5/3/2004","docID":2,"patID":6,"actID":4,"actual_reimb_perc":0.8},{"repID":2,"date":"28/11/2001","docID":2,"patID":6,"actID":4,"actual_reimb_perc":0.8},{"repID":3,"date":"15/7/2008","docID":1,"patID":6,"actID":0,"actual_reimb_perc":0.8},{"repID":4,"date":"1/11/2003","docID":2,"patID":6,"actID":5,"actual_reimb_perc":0.8},{"repID":0,"date":"29/1/2003","docID":7,"patID":7,"actID":5,"actual_reimb_perc":0.5},{"repID":1,"date":"13/12/2001","docID":4,"patID":7,"actID":3,"actual_reimb_perc":0.5},{"repID":2,"date":"1/11/2009","docID":8,"patID":7,"actID":2,"actual_reimb_perc":0.5},{"repID":3,"date":"12/5/2013","docID":1,"patID":7,"actID":2,"actual_reimb_perc":0.5},{"repID":4,"date":"2/8/2010","docID":8,"patID":7,"actID":6,"actual_reimb_perc":0.5},{"repID":0,"date":"18/12/2011","docID":5,"patID":8,"actID":4,"actual_reimb_perc":1},{"repID":1,"date":"18/11/2008","docID":5,"patID":8,"actID":3,"actual_reimb_perc":1},{"repID":2,"date":"28/12/2003","docID":8,"patID":8,"actID":4,"actual_reimb_perc":1},{"repID":3,"date":"5/2/2011","docID":0,"patID":8,"actID":4,"actual_reimb_perc":1},{"repID":4,"date":"2/5/2007","docID":1,"patID":8,"actID":6,"actual_reimb_perc":1},{"repID":0,"date":"1/9/2002","docID":4,"patID":9,"actID":3,"actual_reimb_perc":0.5},{"repID":1,"date":"9/2/2013","docID":0,"patID":9,"actID":3,"actual_reimb_perc":0.5},{"repID":2,"date":"21/11/2009","docID":0,"patID":9,"actID":6,"actual_reimb_perc":0.5},{"repID":3,"date":"5/2/2014","docID":3,"patID":9,"actID":2,"actual_reimb_perc":0.5},{"repID":4,"date":"17/7/2014","docID":6,"patID":9,"actID":0,"actual_reimb_perc":0.5},{"repID":0,"date":"20/8/2005","docID":9,"patID":10,"actID":3,"actual_reimb_perc":0.5},{"repID":1,"date":"7/2/2002","docID":4,"patID":10,"actID":2,"actual_reimb_perc":0.5},{"repID":2,"date":"18/6/2002","docID":4,"patID":10,"actID":3,"actual_reimb_perc":0.5},{"repID":3,"date":"20/2/2011","docID":8,"patID":10,"actID":3,"actual_reimb_perc":0.5},{"repID":4,"date":"5/2/2006","docID":1,"patID":10,"actID":1,"actual_reimb_perc":0.5},{"repID":0,"date":"22/1/2013","docID":9,"patID":11,"actID":0,"actual_reimb_perc":1},{"repID":1,"date":"25/1/2001","docID":9,"patID":11,"actID":1,"actual_reimb_perc":1},{"repID":2,"date":"23/6/2013","docID":6,"patID":11,"actID":0,"actual_reimb_perc":1},{"repID":3,"date":"13/9/2005","docID":3,"patID":11,"actID":1,"actual_reimb_perc":1},{"repID":4,"date":"3/12/2008","docID":3,"patID":11,"actID":6,"actual_reimb_perc":1},{"repID":0,"date":"20/7/2015","docID":8,"patID":12,"actID":5,"actual_reimb_perc":1},{"repID":1,"date":"2/7/2015","docID":1,"patID":12,"actID":4,"actual_reimb_perc":1},{"repID":2,"date":"27/11/2004","docID":2,"patID":12,"actID":0,"actual_reimb_perc":1},{"repID":3,"date":"29/3/2002","docID":4,"patID":12,"actID":6,"actual_reimb_perc":1},{"repID":4,"date":"29/8/2005","docID":6,"patID":12,"actID":1,"actual_reimb_perc":1},{"repID":0,"date":"24/12/2004","docID":5,"patID":13,"actID":4,"actual_reimb_perc":1},{"repID":1,"date":"24/4/2009","docID":7,"patID":13,"actID":6,"actual_reimb_perc":1},{"repID":2,"date":"5/2/2013","docID":9,"patID":13,"actID":1,"actual_reimb_perc":1},{"repID":3,"date":"15/8/2012","docID":5,"patID":13,"actID":5,"actual_reimb_perc":1},{"repID":4,"date":"28/5/2015","docID":6,"patID":13,"actID":1,"actual_reimb_perc":1},{"repID":0,"date":"7/2/2010","docID":5,"patID":14,"actID":1,"actual_reimb_perc":0.8},{"repID":1,"date":"16/11/2013","docID":9,"patID":14,"actID":6,"actual_reimb_perc":0.8},{"repID":2,"date":"17/1/2006","docID":4,"patID":14,"actID":6,"actual_reimb_perc":0.8},{"repID":3,"date":"2/9/2011","docID":0,"patID":14,"actID":0,"actual_reimb_perc":0.8},{"repID":4,"date":"21/9/2003","docID":0,"patID":14,"actID":0,"actual_reimb_perc":0.8},{"repID":0,"date":"12/9/2001","docID":4,"patID":15,"actID":5,"actual_reimb_perc":0.5},{"repID":1,"date":"5/3/2008","docID":5,"patID":15,"actID":6,"actual_reimb_perc":0.5},{"repID":2,"date":"13/11/2015","docID":8,"patID":15,"actID":4,"actual_reimb_perc":0.5},{"repID":3,"date":"2/4/2002","docID":0,"patID":15,"actID":0,"actual_reimb_perc":0.5},{"repID":4,"date":"13/12/2002","docID":8,"patID":15,"actID":4,"actual_reimb_perc":0.5},{"repID":0,"date":"26/5/2010","docID":0,"patID":16,"actID":2,"actual_reimb_perc":0.2},{"repID":1,"date":"3/5/2013","docID":5,"patID":16,"actID":4,"actual_reimb_perc":0.2},{"repID":2,"date":"19/10/2003","docID":6,"patID":16,"actID":6,"actual_reimb_perc":0.2},{"repID":3,"date":"4/5/2006","docID":0,"patID":16,"actID":0,"actual_reimb_perc":0.2},{"repID":4,"date":"17/12/2009","docID":9,"patID":16,"actID":6,"actual_reimb_perc":0.2},{"repID":0,"date":"17/8/2012","docID":6,"patID":17,"actID":0,"actual_reimb_perc":1},{"repID":1,"date":"22/2/2003","docID":7,"patID":17,"actID":3,"actual_reimb_perc":1},{"repID":2,"date":"8/10/2013","docID":3,"patID":17,"actID":3,"actual_reimb_perc":1},{"repID":3,"date":"7/10/2008","docID":8,"patID":17,"actID":2,"actual_reimb_perc":1},{"repID":4,"date":"25/1/2003","docID":1,"patID":17,"actID":0,"actual_reimb_perc":1},{"repID":0,"date":"17/3/2005","docID":6,"patID":18,"actID":2,"actual_reimb_perc":1},{"repID":1,"date":"15/4/2002","docID":0,"patID":18,"actID":4,"actual_reimb_perc":1},{"repID":2,"date":"22/9/2010","docID":7,"patID":18,"actID":4,"actual_reimb_perc":1},{"repID":3,"date":"11/4/2001","docID":5,"patID":18,"actID":3,"actual_reimb_perc":1},{"repID":4,"date":"23/4/2003","docID":7,"patID":18,"actID":1,"actual_reimb_perc":1},{"repID":0,"date":"28/11/2004","docID":4,"patID":19,"actID":4,"actual_reimb_perc":0.5},{"repID":1,"date":"27/3/2004","docID":8,"patID":19,"actID":4,"actual_reimb_perc":0.5},{"repID":2,"date":"24/1/2004","docID":4,"patID":19,"actID":0,"actual_reimb_perc":0.5},{"repID":3,"date":"10/6/2012","docID":0,"patID":19,"actID":4,"actual_reimb_perc":0.5},{"repID":4,"date":"22/6/2012","docID":1,"patID":19,"actID":2,"actual_reimb_perc":0.5}]
},{}],7:[function(require,module,exports){
module.exports=[{"reqID":0,"repID":99,"status":"REJECTED"},{"reqID":1,"repID":98,"status":"REQUESTED"},{"reqID":2,"repID":97,"status":"REJECTED"},{"reqID":3,"repID":96,"status":"PENDING"},{"reqID":4,"repID":95,"status":"ACCEPTED"},{"reqID":5,"repID":94,"status":"REQUESTED"},{"reqID":6,"repID":93,"status":"PENDING"},{"reqID":7,"repID":92,"status":"PENDING"},{"reqID":8,"repID":91,"status":"PENDING"},{"reqID":9,"repID":90,"status":"PENDING"},{"reqID":10,"repID":89,"status":"REQUESTED"},{"reqID":11,"repID":88,"status":"REQUESTED"},{"reqID":12,"repID":87,"status":"REQUESTED"},{"reqID":13,"repID":86,"status":"REQUESTED"},{"reqID":14,"repID":85,"status":"REQUESTED"},{"reqID":15,"repID":84,"status":"ACCEPTED"},{"reqID":16,"repID":83,"status":"PENDING"},{"reqID":17,"repID":82,"status":"PENDING"},{"reqID":18,"repID":81,"status":"REJECTED"},{"reqID":19,"repID":80,"status":"REQUESTED"},{"reqID":20,"repID":79,"status":"ACCEPTED"},{"reqID":21,"repID":78,"status":"PENDING"},{"reqID":22,"repID":77,"status":"PENDING"},{"reqID":23,"repID":76,"status":"ACCEPTED"},{"reqID":24,"repID":75,"status":"REJECTED"},{"reqID":25,"repID":74,"status":"REQUESTED"},{"reqID":26,"repID":73,"status":"ACCEPTED"},{"reqID":27,"repID":72,"status":"REJECTED"},{"reqID":28,"repID":71,"status":"REQUESTED"},{"reqID":29,"repID":70,"status":"REQUESTED"},{"reqID":30,"repID":69,"status":"ACCEPTED"},{"reqID":31,"repID":68,"status":"REJECTED"},{"reqID":32,"repID":67,"status":"REQUESTED"},{"reqID":33,"repID":66,"status":"PENDING"},{"reqID":34,"repID":65,"status":"ACCEPTED"},{"reqID":35,"repID":64,"status":"PENDING"},{"reqID":36,"repID":63,"status":"REJECTED"},{"reqID":37,"repID":62,"status":"ACCEPTED"},{"reqID":38,"repID":61,"status":"PENDING"},{"reqID":39,"repID":60,"status":"REQUESTED"},{"reqID":40,"repID":59,"status":"REJECTED"},{"reqID":41,"repID":58,"status":"REJECTED"},{"reqID":42,"repID":57,"status":"REJECTED"},{"reqID":43,"repID":56,"status":"REQUESTED"},{"reqID":44,"repID":55,"status":"REJECTED"},{"reqID":45,"repID":54,"status":"REQUESTED"},{"reqID":46,"repID":53,"status":"ACCEPTED"},{"reqID":47,"repID":52,"status":"ACCEPTED"},{"reqID":48,"repID":51,"status":"ACCEPTED"},{"reqID":49,"repID":50,"status":"PENDING"},{"reqID":50,"repID":49,"status":"REJECTED"},{"reqID":51,"repID":48,"status":"REQUESTED"},{"reqID":52,"repID":47,"status":"REQUESTED"},{"reqID":53,"repID":46,"status":"ACCEPTED"},{"reqID":54,"repID":45,"status":"PENDING"},{"reqID":55,"repID":44,"status":"PENDING"},{"reqID":56,"repID":43,"status":"REJECTED"},{"reqID":57,"repID":42,"status":"ACCEPTED"},{"reqID":58,"repID":41,"status":"ACCEPTED"},{"reqID":59,"repID":40,"status":"ACCEPTED"},{"reqID":60,"repID":39,"status":"ACCEPTED"},{"reqID":61,"repID":38,"status":"REJECTED"},{"reqID":62,"repID":37,"status":"ACCEPTED"},{"reqID":63,"repID":36,"status":"REQUESTED"},{"reqID":64,"repID":35,"status":"REQUESTED"},{"reqID":65,"repID":34,"status":"REJECTED"},{"reqID":66,"repID":33,"status":"ACCEPTED"},{"reqID":67,"repID":32,"status":"PENDING"},{"reqID":68,"repID":31,"status":"REJECTED"},{"reqID":69,"repID":30,"status":"REQUESTED"},{"reqID":70,"repID":29,"status":"REQUESTED"},{"reqID":71,"repID":28,"status":"REJECTED"},{"reqID":72,"repID":27,"status":"REJECTED"},{"reqID":73,"repID":26,"status":"REQUESTED"},{"reqID":74,"repID":25,"status":"ACCEPTED"},{"reqID":75,"repID":24,"status":"PENDING"},{"reqID":76,"repID":23,"status":"ACCEPTED"},{"reqID":77,"repID":22,"status":"ACCEPTED"},{"reqID":78,"repID":21,"status":"PENDING"},{"reqID":79,"repID":20,"status":"REJECTED"},{"reqID":80,"repID":19,"status":"PENDING"},{"reqID":81,"repID":18,"status":"REQUESTED"},{"reqID":82,"repID":17,"status":"REJECTED"},{"reqID":83,"repID":16,"status":"PENDING"},{"reqID":84,"repID":15,"status":"REQUESTED"},{"reqID":85,"repID":14,"status":"REQUESTED"},{"reqID":86,"repID":13,"status":"REQUESTED"},{"reqID":87,"repID":12,"status":"ACCEPTED"},{"reqID":88,"repID":11,"status":"ACCEPTED"},{"reqID":89,"repID":10,"status":"PENDING"},{"reqID":90,"repID":9,"status":"ACCEPTED"},{"reqID":91,"repID":8,"status":"REQUESTED"},{"reqID":92,"repID":7,"status":"REQUESTED"},{"reqID":93,"repID":6,"status":"ACCEPTED"},{"reqID":94,"repID":5,"status":"REJECTED"},{"reqID":95,"repID":4,"status":"PENDING"},{"reqID":96,"repID":3,"status":"REQUESTED"},{"reqID":97,"repID":2,"status":"REQUESTED"},{"reqID":98,"repID":1,"status":"ACCEPTED"},{"reqID":99,"repID":0,"status":"REQUESTED"}]
},{}]},{},[4])(4)
});