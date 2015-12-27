/* globals bl */
var app = angular.module('app',[]);

app.controller('patientController', function($scope, $http) {

	$http.get('http://localhost:9000/patients')
	.then(function(response) {$scope.patients=response.data;})
	$http.get('http://localhost:9000/doctors')
	.then(function(response) {$scope.doctors=response.data;})
	$http.get('http://localhost:9000/reports')
	.then(function(response) {$scope.reports=response.data;})
	$http.get('http://localhost:9000/acts')
	.then(function(response) {$scope.acts=response.data;})
	$http.get('http://localhost:9000/acts_rmb')
	.then(function(response) {$scope.acts_rmb=response.data;})
	$http.get('http://localhost:9000/requests')
	.then(function(response) {$scope.requests=response.data;})

	$scope.currentActName = '';
	$scope.patientActs = [];
	$scope.prescribedActs = [];
	$scope.loggedIn = false;

	$scope.currentUser = '';
	$scope.rememberMe = false;
	$scope.rememberUser = '';
	$scope.loginError = false;

	$scope.currentPatient = {"patID":0,"name":"Tomás Silva","policy_number":1000,"policy_type":0};
	$scope.test = $scope.currentPatient.hasOwnProperty('acts');

	$scope.username = '';
	$scope.password = '';

	$scope.act = [];
	$scope.displayReports = [];

	$scope.descriptiveRequests = function() {
		$http.get('http://localhost:9000/reports')
		.then(function(response) {$scope.reports=response.data;})
		$http.get('http://localhost:9000/requests')
		.then(function(response) {$scope.requests=response.data;})
		console.log($scope.reports);
		$scope.displayReports = $scope.reports;

		$scope.displayReports.forEach(function(rep) {
			$scope.requests.forEach(function(req) {
				if (rep.repID === req.reqID) {
					rep.status = req.status;
					rep.reqID = req.repID
				}
			});
			$scope.acts.forEach(function(act) {
				if (act.actID === rep.actID) {
					rep.actName = act.name;
				}
			});
			$scope.patients.forEach(function(pat) {
				if (pat.patID === rep.patID) {
					rep.patName = pat.name;
				}
			});
		});
	}



	/*$scope.changePatient = function(patient) {
		$scope.currentPatient = patient;
		$scope.patientActs = [];
		$scope.prescribedActs = [];
		$scope.reports.forEach(function(entry) {
			if (patient.patID === entry.patID) {
				$scope.patientActs.push(entry);
			}
		});

		$scope.patientActs.forEach(function(act) {
			$scope.doctors.forEach(function(doctor) {
				if (doctor.docID === act.docID) {
					act.docName = doctor.name;
				}
			});
			$scope.acts.forEach(function(act1) {
				if (act1.actID === act.actID) {
					act.actName = act1.name;
					act.cost = act1.cost;
				}
			});
		});
	}*/

	$scope.login = function (username, password) {

		$http.post('http://localhost:9000/login', {
			user: $scope.currentUser,
			pass: $scope.password
		}).then(
		function (response) {
			$scope.loggedIn = false;
			$scope.loginError = false;
			if (response.data[0]) {
				$scope.loggedIn = true;
				$scope.currentDoctor = response.data[1];
			} else {
				$scope.loginError = true;
			}
		},
		function (err) {
			console.log(err)
		});
	}

	$scope.addMedicalAct = function(actName) {
		if(!$scope.currentPatient.hasOwnProperty('acts')){
			$scope.currentPatient.acts=[];
		}
		var actID = '';
		var actEntry = '';
		$scope.acts.forEach(function(act) {
		if (act.name == actName) {
				actEntry = act;
				actID = act.actID;
		}
		});
		$scope.acts_rmb.forEach(function(act_rmb) {
			if (actID == act_rmb.actID && $scope.currentPatient.policy_type == act_rmb.policy_type) {
				actEntry.rmb = act_rmb.reimb_percentage;
			}
		});

		$scope.currentPatient.acts.push(actEntry);
	}

	$scope.submitReport = function() {
		if(!$scope.currentPatient.hasOwnProperty('acts') || $scope.currentPatient.acts===[]){
			return;
		}
		$http.post('http://localhost:9000/submitReport', {
			date: "24/12/2008",
			docID: $scope.currentDoctor.docID,
			patID: $scope.currentPatient.patID,
			acts:  $scope.currentPatient.acts
		}).then(
		function (response) {
			console.log(response.data);
			$scope.descriptiveRequests();
			console.log();

		}, function (err) {
			console.log(err)
		});
		$scope.descriptiveRequests();
	}


	$scope.removeMedicalAct = function(index) {
		$scope.currentPatient.acts.splice(index, 1);
	}

	$scope.deletePatient = function() {
		$http.post('http://localhost:9000/deletePatient', {
			name: $scope.currentPatient.name,
			patID: $scope.currentPatient.patID
		}).then(
		function (response) {
			console.log(response.data);
			$http.get('http://localhost:9000/patients')
			.then(function(response) {$scope.patients=response.data;})
		}, function (err) {
			console.log(err)
		});
	}

	$scope.changePatient = function (pat) {

		$http.post('http://localhost:9000/changepatient', {
			patient: pat
		}).then(
		function (response) {
			console.log(response.data);
			$scope.currentPatient = response.data[0];
			$scope.patientActs = [];
			$scope.prescribedActs = [];
			$scope.patientActs = response.data[1];
		}, function (err) {
			console.log(err)
		});
	}

	/*
	$scope.addMedicalAct = function(act_name) {

		$http.post('http://localhost:9000/addmedicalact', {
			actname: act_name,
			currentpatient: $scope.currentPatient
		}).then(
		function (response) {
			console.log(response.data);
			if(!$scope.currentPatient.hasOwnProperty('acts')){
				$scope.currentPatient.acts=[];
			}
			$scope.currentPatient.acts.push(response.data[0]);
		}, function(err) {
			console.log(err)
		});
	}
	*/

	/*$scope.removeMedicalAct = function(index) {

		$http.post('http://localhost:9000/removemedicalact', {
			actindex: index,
			currentpatient: $scope.currentPatient
		}).then(
		function(response) {
			$scope.currentPatient.acts.splice(response.data, 1);
		}, function(err) {
			console.log(err)
		});
	}*/

	$scope.filterRequests = function(status, docID) {
		//console.log(20);

		return $scope.displayReports.filter(function(entry){
			return entry.status === status && entry.docID === docID;
		}).length;
	}
});
