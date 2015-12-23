app.controller('patientController', function($scope, $http) {
	$http.get("https://raw.githubusercontent.com/sise-cweb/data-gen/master/patients.json")
	.then(function (response) {$scope.patients = response.data;});

	$http.get("https://raw.githubusercontent.com/sise-cweb/data-gen/master/requests.json")
	.then(function (response) {$scope.requests = response.data;});

	$http.get("https://raw.githubusercontent.com/sise-cweb/data-gen/master/acts.json")
	.then(function (response) {$scope.acts = response.data;});

	$http.get("https://raw.githubusercontent.com/sise-cweb/data-gen/master/acts-rmb.json")
	.then(function (response) {$scope.acts_rmb = response.data;});

	$http.get("https://raw.githubusercontent.com/sise-cweb/data-gen/master/reports.json")
	.then(function (response) {$scope.reports = response.data;});

	$http.get("https://raw.githubusercontent.com/sise-cweb/data-gen/master/doctors.json")
	.then(function (response) {$scope.doctors = response.data;});

	$scope.currentActName = '';

	$scope.patientActs = [];

	$scope.prescribedActs = [];

	$scope.loggedIn = false;

	$scope.login = function() {
		$scope.loggedIn = false;
		$scope.doctors.forEach(function(entry) {
			if (entry.user === $scope.currentUser && entry.pass===$scope.password) {
				$scope.loggedIn = true;
				$scope.currentDoctor = entry;
			}
		});
	}

	$scope.currentUser = 'doc1';
	$scope.rememberMe = false;
	$scope.rememberUser = 'pass';


	$scope.currentPatient = {"patID":0,"name":"Tomás Silva","policy_number":1000,"policy_type":0};
	$scope.test = $scope.currentPatient.hasOwnProperty('acts');

	$scope.changePatient = function(patient) {
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

	$scope.removeMedicalAct = function(index) {
		$scope.currentPatient.acts.splice(index, 1);
	}

	$scope.filterRequests = function(filter) {
		var temp = $scope.requests.filter(function(entry) {
			return entry.status==filter;
		});
		return temp.length;
	}

		$scope.searchVar = "";

	})
