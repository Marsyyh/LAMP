var myApp = angular.module('myCal',[]);

myApp.controller('myCalController', ['$scope', function($scope){
	$scope.myScreen = '';

	$scope.click1 = function(){
		$scope.myScreen = $scope.myScreen + '1';
	};

	$scope.click2 = function(){
		$scope.myScreen = $scope.myScreen + '2';
	};

	$scope.click3 = function(){
		$scope.myScreen = $scope.myScreen + '3';
	};

	$scope.click4 = function(){
		$scope.myScreen = $scope.myScreen + '4';
	};

	$scope.click5 = function(){
		$scope.myScreen = $scope.myScreen + '5';
	};

	$scope.click6 = function(){
		$scope.myScreen = $scope.myScreen + '6';
	};

	$scope.click7 = function(){
		$scope.myScreen = $scope.myScreen + '7';
	};

	$scope.click8 = function(){
		$scope.myScreen = $scope.myScreen + '8';
	};

	$scope.click9 = function(){
		$scope.myScreen = $scope.myScreen + '9';
	};

	$scope.clickPlus = function(){
		$scope.myScreen = $scope.myScreen + '+';
	};

	$scope.clickMinus = function(){
		$scope.myScreen = $scope.myScreen + '-';
	};

	$scope.clickMulti = function(){
		$scope.myScreen = $scope.myScreen + '×';
	};

	$scope.clickDiv = function(){
		$scope.myScreen = $scope.myScreen + '/';
	};

	$scope.clickClear = function(){
		$scope.myScreen = '';
	};

	$scope.clickEqul = function(){

	};
}]);
