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

	$scope.currentUser = 'doc1';
	$scope.rememberMe = false;
	$scope.rememberUser = 'pass';

	$scope.currentPatient = {"patID":0,"name":"Tomás Silva","policy_number":1000,"policy_type":0};
	$scope.test = $scope.currentPatient.hasOwnProperty('acts');

	$scope.username = '';
	$scope.password = '';

	$scope.act = [];

	$scope.login = function (username, password) {
   		
		$http.post('http://localhost:9000/login', {
			user: $scope.currentUser,
			pass: $scope.password
		}).then(
		function (response) {
			$scope.loggedIn = false;
			if (response.data[0]) {
				$scope.loggedIn = true;
				$scope.currentDoctor = response.data[1];
			}
		},
		function (err) {
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

	$scope.removeMedicalAct = function(index) {

		$http.post('http://localhost:9000/removemedicalact', {
			actindex: index,
			currentpatient: $scope.currentPatient
		}).then(
		function(response) {
			$scope.currentPatient.acts.splice(response.data, 1);
		}, function(err) {
			console.log(err)
		});
	}
	
	$scope.filterRequests = function(filter) {
		console.log(20);
		
		return $scope.requests.filter(function(entry){
			return entry.status === filter;
		}).length;
	}	
});