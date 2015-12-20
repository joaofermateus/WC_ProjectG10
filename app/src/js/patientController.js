app.controller('patientController', function($scope, $http) {
	$http.get("https://raw.githubusercontent.com/sise-cweb/data-gen/master/patients.json")
	.then(function (response) {$scope.patients = response.data;});
  
	$http.get("https://raw.githubusercontent.com/sise-cweb/data-gen/master/requests.json")
	.then(function (response) {$scope.requests = response.data;});
	
	$http.get("https://raw.githubusercontent.com/sise-cweb/data-gen/master/acts.json")
	.then(function (response) {$scope.acts = response.data;});
	
	$scope.loggedIn = false;
	
	$scope.currentUser = '';
	$scope.rememberMe = false;
	$scope.rememberUser = '';
	
	$scope.doctorName = "House";
	$scope.currentPatient = {"patID":0,"name":"Tomás Silva","policy_number":1000,"policy_type":0};
	
	$scope.changePatient = function(patient) {
		$scope.currentPatient = patient;
	}
	$scope.searchVar = "";
	
	
})