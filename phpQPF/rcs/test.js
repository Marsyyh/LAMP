var myApp = angular.module('app',[]);


//------------------Creating a sharing service
myApp.factory('sharingDataService',['$http','$rootScope',function($http,$rootScope){
	var sharedService = {};
	//------getting data from server //  In service and can be shared this with all controllers
	sharedService.id = '';
	sharedService.getDataFromServer = function(callInData){
		var request = $http({
			method:'POST',
			data:callInData,
			url:'rcs/spices.php',
			headers:{
				'Content-Type':'application/json;charset=utf-8'
			}
		}).then(function(response){
			return response.data;
		},function(response){
			return response.data || "Request failed";
			console.log("Error: " + response.status);
		});
		return request;
	};
	//---------------------
	sharedService.handleClick = function(id){
		this.id = id;
		this.broadcastItem();
	};
	//---------------------
	sharedService.broadcastItem = function(){
		$rootScope.$broadcast('handleBroadcast');
	};
	return sharedService;
}]).
controller('column1', ['$scope','sharingDataService', function($scope,sharingDataService){
	var dataHolder = [];
	var callInData = {
		"action":"first"
	};
	//------------using getData function from sharingDataService
	sharingDataService.getDataFromServer(callInData).then(function(response){
		dataHolder = response;
		$scope.items = dataHolder;
	});
	//------------creating the click function
	$scope.c1Click = function(id){
		sharingDataService.handleClick(id);
	};
}])
.controller('column2', ['$scope','sharingDataService', function($scope,sharingDataService){
	$scope.$on('handleBroadcast',function(){
		var id = sharingDataService.id;
		var callInData ={
			"action":"rest",
			"id":id
		};
		sharingDataService.getDataFromServer(callInData).then(function(response){
			$scope.items = response;
		});
	});
}])
.controller('column3', ['$scope','$http', function($scope,$http){
	
}])
.controller('column4', ['$scope','$http', function($scope,$http){
	
}])
.controller('column5', ['$scope','$http', function($scope,$http){
	
}])


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