app.controller('patientController', function($scope, $http) {
	$http.get("https://raw.githubusercontent.com/sise-cweb/data-gen/master/patients.json")
	.then(function (response) {$scope.patients = response.data;});

	$http.get("https://raw.githubusercontent.com/sise-cweb/data-gen/master/requests.json")
	.then(function (response) {$scope.requests = response.data;});

	$http.get("https://raw.githubusercontent.com/sise-cweb/data-gen/master/acts.json")
	.then(function (response) {$scope.acts = response.data;});

	$http.get("https://raw.githubusercontent.com/sise-cweb/data-gen/master/reports.json")
	.then(function (response) {$scope.reports = response.data;});

	$http.get("https://raw.githubusercontent.com/sise-cweb/data-gen/master/doctors.json")
	.then(function (response) {$scope.doctors = response.data;});

	$scope.currentActName = 0;

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
		$scope.acts.forEach(function(entry) {
			if (entry.name == actName) {
				if($scope.currentPatient.hasOwnProperty('acts')){
					$scope.currentPatient.acts.push(entry);
					$scope.currentPatient.acts.count+=1
					$scope.test = true;
				} else {
					$scope.prescribedActs.push(entry);
					$scope.currentPatient.acts = $scope.prescribedActs;
					$scope.currentPatient.acts.count = 0;
				}
			}
		});
	}

	$scope.removeMedicalAct = function(index) {
		$scope.currentPatient.acts.splice(index, 1);
	}

		$scope.searchVar = "";

	})
