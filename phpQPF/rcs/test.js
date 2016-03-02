var jsonData = [{
		"id":"1.1",
		"name":"Spices and Herbs",
		"Categorize":["1"],
		"level":2
	},
	{
		"id":"1.1.1",
		"name":"Onion Powder Onion (minced)",
		"Categorize":["1.1"],
		"level":3
	},
	{
		"id":"1.1.2",
		"name":"Onion powder toasted",
		"Categorize":["1.1"],
		"level":3
	},
	{
		"id":"1.1.3",
		"name":"Basil",
		"Categorize":["1.1"],
		"level":3
	},
	{
		"id":"1.1.4",
		"name":"Chives",
		"Categorize":["1.1"],
		"level":3
	},{"id":"3.2.2.4","name":"White pudding mix","Categorize":["3.2.2"],"level":4}];


var myApp = angular.module('app',[]);

myApp.controller('myCtrl',['$scope',function($scope){
	$scope.items = jsonData;
}]);