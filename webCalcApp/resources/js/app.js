var myApp = angular.module('myCal',[]);

myApp.controller('myCalController', ['$scope','$http','$location', function($scope,$http,$location){
	$scope.myScreen = '';
	var numberHolder = [];
	var operatorHolder = [];
	$scope.clickNumber = function(number) {
		$scope.myScreen += number;
	};
	$scope.clickOperator = function(oper){
		var tmp = $scope.myScreen.split(/[\+\-\*\/]+/);
		numberHolder.push(tmp[tmp.length-1]);
		operatorHolder.push(oper);
		$scope.myScreen += oper;
		//console.log(numberHolder);
		//console.log(operatorHolder);
	};
	$scope.clickClear = function(){
		$scope.myScreen = '';
		numberHolder = [];
		operatorHolder = [];
	};
	$scope.clickEqul = function(){
		var tmp = $scope.myScreen.split(/[\+\-\*\/]+/);
		numberHolder.push(tmp[tmp.length-1]);
		var callInData = {
			"action":"string",
			"calNumber":numberHolder,
			"calOperator":operatorHolder
		};
		$http({
			method:'POST',
			data:callInData,
			url:'controller/cal.php'
		})
		.then(function successCallback(response){
			$scope.myScreen = response.data;
		});
		numberHolder = [];
		operatorHolder = [];
	};
}]);
