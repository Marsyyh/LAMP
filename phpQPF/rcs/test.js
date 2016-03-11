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
	sharedService.handleClick1 = function(id){
		this.id = id;
		this.broadcastItem1();
	};
	//---------------------
	sharedService.broadcastItem1 = function(){
		$rootScope.$broadcast('handleBroadcast1');
	};
	sharedService.handleClick2 = function(id){
		this.id = id;
		this.broadcastItem2();
	};
	//---------------------
	sharedService.broadcastItem2 = function(){
		$rootScope.$broadcast('handleBroadcast2');
	};
	sharedService.handleClick3 = function(id){
		this.id = id;
		this.broadcastItem3();
	};
	//---------------------
	sharedService.broadcastItem3 = function(){
		$rootScope.$broadcast('handleBroadcast3');
	};
	sharedService.handleClick4 = function(id){
		this.id = id;
		this.broadcastItem4();
	};
	//---------------------
	sharedService.broadcastItem4 = function(){
		$rootScope.$broadcast('handleBroadcast4');
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
		sharingDataService.handleClick1(id);
	};
}])
.controller('column2', ['$scope','sharingDataService', function($scope,sharingDataService){
	$scope.$on('handleBroadcast1',function(){
		var id = sharingDataService.id;
		var callInData ={
			"action":"rest",
			"id":id
		};
		sharingDataService.getDataFromServer(callInData).then(function(response){
			var tmpObj = response;
			$scope.items = tmpObj;
		});
	});
	$scope.c2Click = function(id){
		sharingDataService.handleClick2(id);
	}
}])
.controller('column3', ['$scope','sharingDataService', function($scope,sharingDataService){
	$scope.$on('handleBroadcast2',function(){
		var id = sharingDataService.id;
		var callInData ={
			"action":"rest",
			"id":id
		};
		sharingDataService.getDataFromServer(callInData).then(function(response){
			var tmpObj = response;
			$scope.items = tmpObj;
		});
	});
	$scope.c3Click = function(id){
		sharingDataService.handleClick3(id);
	}
}])
.controller('column4', ['$scope','sharingDataService', function($scope,sharingDataService){
	$scope.$on('handleBroadcast3',function(){
		var id = sharingDataService.id;
		var callInData ={
			"action":"rest",
			"id":id
		};
		sharingDataService.getDataFromServer(callInData).then(function(response){
			var tmpObj = response;
			$scope.items = tmpObj;
		});
	});
	$scope.c4Click = function(id){
		sharingDataService.handleClick4(id);
	}
}])
.controller('column5', ['$scope','sharingDataService', function($scope,sharingDataService){
	$scope.$on('handleBroadcast4',function(){
		var id = sharingDataService.id;
		var callInData ={
			"action":"rest",
			"id":id
		};
		sharingDataService.getDataFromServer(callInData).then(function(response){
			var tmpObj = response;
			$scope.items = tmpObj;
		});
	});
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