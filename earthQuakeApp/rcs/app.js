var app = angular.module('earthQuake',[]);

app.controller('myEarthQuakeCtrl',function($scope, myEarthQuakeGeoApiService){
	var mapOptions = {
        zoom: 4,
        center: {lat: -34.397, lng: 150.644},
    };
    var markers = [];
 	var input = document.getElementById('input');
    var autoComplete = new google.maps.places.Autocomplete(input);
    $scope.earthQuakeMap = new google.maps.Map(document.getElementById('map'), mapOptions);
    autoComplete.bindTo('bounds',$scope.earthQuakeMap);

    autoComplete.addListener('place_changed',function(){
   
  		var place = autoComplete.getPlace();
  		if(!place.geometry){

  		}else{
    		$scope.earthQuakeMap.setCenter(place.geometry.location);
    		$scope.earthQuakeMap.setZoom(5);
    		clearMaker();
    		var latLng = {
    			'lat':place.geometry.location.lat(),
    			'lng':place.geometry.location.lng()
    		};
    		myEarthQuakeGeoApiService.callGeoApi(latLng.lat,latLng.lng).then(function(response){
    			$scope.items = response.earthquakes;
    			for (var i = $scope.items.length - 1; i >= 0; i--) {
    				createMarker($scope.items[i]);
    			}
    		});

    		$scope.handleEnterPress = function($event){
    			if($event.which ==13){
    				$scope.earthQuakeCityInput = latLng.lat;
    			}
    		};
 	    }
	});
	var createMarker = function(info){
		var marker = new google.maps.Marker({
			map:$scope.earthQuakeMap,
			position: {'lat':info.lat,'lng':info.lng},
			title: info.magnitude.toString()
		});
		markers.push(marker);
	};

	var setMapOnAll = function(map){
		for (var i=0; i< markers.length;i++){
			markers[i].setMap(map);
		}
	};

	var clearMaker = function(){
		setMapOnAll(null);
		markers = [];
	};
})
.factory('myEarthQuakeGeoApiService',function($http,$rootScope){
	var myEarthQuakeGeoApiService = {};
	myEarthQuakeGeoApiService.callGeoApi = function(lat,lng){
		var data = {
			'east':lng + 10,
			'west':lng - 10,
			'north':lat + 10,
			'south':lat - 10,
			'username':'y86528977'
		};
		var url = 'http://api.geonames.org/earthquakesJSON?east='+data.east+'&west='+data.west+'&north='+data.north+'&south='+data.south+'&username=y86528977';
		var request = $http({
			method:'GET',
			url:url
		}).then(function(response){
			return response.data;
		},function(response){
			console.log('Error :' + response.status);
			return response.data || "Request failed";
		});
		return request;
	};
	
	return myEarthQuakeGeoApiService;
});