/* globals bl */
var app = angular.module('app',[]);

app.controller('patientController', function($scope, $http) {

	$scope.username = "";
	$scope.password = "";
	$scope.test = "nada";



	$scope.login = function (username, password) {
    		console.log('aaaaa')
		$scope.test = "nada1";
		
		$http.post('http://localhost:9000/login', {
		user: $scope.username,
		pass: $scope.password
		}).then(
			function (response) {
				console.log(response)
				console.log(response.data);
				//$scope.test = JSON.stringify(response.success);
			},
			function (err) {
				console.log(err)
			});
		
		/*
		$http.post('http://localhost:9000/hello', {
			name: "ola"
		}).then(function(response) {
			console.log(response)
			console.log(response.data)
		}, function(err) {
			console.log(err)
		});
**/
	}
});