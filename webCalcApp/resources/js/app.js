var myApp = angular.module('myCal',[]);

myApp.controller('myCalController', ['$scope','$http','$location', function($scope,$http,$location){
	$scope.myScreen = '';
	$scope.clickUpdate = function(number) {
		$scope.myScreen += number;
	};
	$scope.clickClear = function(){
		$scope.myScreen = '';
	};
	$scope.clickEqul = function(){
		var callInData = {
			"action":"string",
			"calString":$scope.myScreen
		};
		$http({
			method:'POST',
			data:callInData,
			url:'controller/cal.php'
		})
		.then(function successCallback(response){
			$scope.myScreen = response.data;
		});
	};
}]);
