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
	}];
	
var jsonData2 =	[{
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


//Creating a sharing service
myApp.factory('sharingDataService',['$http','$rootScope',function($http,$rootScope){
	var sharedService = {};
	sharedService.tmpData = "";
	sharedService.getDataFromServer = function(){
		$http({
			method:'POST',
			url:'rcs/spices.json',
		}).then(function(response){
			this.tmpData = response.data;
			console.log("response status: " + response.status);
		},function(response){
			this.tmpData = response.data || "Request failed";
			console.log("Error: " + response.status);
		});
		this.broadcastItem();
	};
	 sharedService.broadcastItem = function(){
		$rootScope.$broadcast('handleBroadcast');
	 };
	return sharedService;
}]).
controller('column1', ['$scope','sharingDataService', function($scope,sharingDataService){
	var dataHolder = [];
	sharingDataService.getDataFromServer();
	$scope.$on('handleBroadcast',function () {
		dataHolder = sharingDataService.tmpData;
		$scope.items = dataHolder;
	})
}])
.controller('column2', ['$scope','$http', function($scope,$http){
	$http({
			method:'POST',
			url:'rcs/spices.json'
		}).then(function(response){
			$scope.items = response.data;
			console.log("response status: " + response.status);
		},function(response){
			$scope.items = response.data || "Request failed";
			console.log("Error: " + response.status);
		});
}]);


// myApp.directive('myCustomerDir1',function($compile) {
// 	return{
// 		replace: true,
// 		link: function(scope,ele,attrs){

// 		},
// 		template:'<div ng-repeat="item in items" ng-click="addNextView({{item.id}},{{item.level}})">{{item.name}}</div>'
// 	};
// }); 

// myApp.controller('myCtrl',['$scope',function($scope){
// 	//initial the data
// 	$scope.items = jsonData;
// }]);

// function addNextView(id,level) {
// 	var myCustomerDir = "myCustomerDir"+(level+1);
// 	myApp.directive(myCustomerDir,function(){
// 		return{
// 			template:'<div ng-repeat="item in items" ng-click="addNextView({{item.id}},{{item.level}})">{{item.name}}</div>'
// 		};
// 	});
// 	// body...	
//	}