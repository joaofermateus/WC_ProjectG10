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

	$scope.patientActs = [];

	$scope.doctorRequests = [];

	$scope.loggedIn = false;

	$scope.currentUser = '';
	$scope.rememberMe = false;
	$scope.rememberUser = '';

	$scope.currentDoctor = { "docID": 1, "name": "João Santos", "speciality": "Ortopedia", "user": "doc1", "pass": "pass"};
	$scope.doctorName = "House";
	$scope.currentPatient = {"patID":0,"name":"Tomás Silva","policy_number":1000,"policy_type":0};

	$scope.changePatient = function(patient) {
		$scope.currentPatient = patient;
		$scope.patientActs = [];
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

	$scope.changeDoctor = function() {
		$scope.doctors.forEach(function(doctor) {
			if ($scope.currentUser === doctor.user) {
				$scope.currentDoctor = doctor;
			}
		});
	}

		$scope.searchVar = "";

	})
