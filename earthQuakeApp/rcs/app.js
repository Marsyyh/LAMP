var app = angular.module('earthQuake',[]);

app.controller('myEarthQuakeCtrl',function($scope, myEarthQuakeGeoApiService){
	var mapOptions = {
        zoom: 4,
        center: {lat: -34.397, lng: 150.644},
    };
    var markers = [];
 	var input = document.getElementById('input');
    var autoComplete = new google.maps.places.Autocomplete(input);
    var infoWindow = new google.maps.InfoWindow();
    $scope.earthQuakeCityInput = 'Input city name you want to search :)';
    $scope.earthQuakeMap = new google.maps.Map(document.getElementById('map'), mapOptions);
    autoComplete.bindTo('bounds',$scope.earthQuakeMap);

    autoComplete.addListener('place_changed',function(){
   
  		var place = autoComplete.getPlace();
  		if(!place.geometry){

  		}else{
    		$scope.earthQuakeMap.setCenter(place.geometry.location);
    		$scope.earthQuakeMap.setZoom(8);
    		clearMaker();
    		var mapBounds = {
    			'east':$scope.earthQuakeMap.getBounds().getNorthEast().lng(),
    			'west':$scope.earthQuakeMap.getBounds().getSouthWest().lng(),
    			'north':$scope.earthQuakeMap.getBounds().getNorthEast().lat(),
    			'south':$scope.earthQuakeMap.getBounds().getSouthWest().lat(),
    		};
    		myEarthQuakeGeoApiService.callGeoApi(mapBounds).then(function(response){
    			$scope.items = response.earthquakes;
    			for (var i = $scope.items.length - 1; i >= 0; i--) {
    				createMarker($scope.items[i]);
    			}
    		});

    		$scope.handleEnterPress = function($event){
    			if($event.which ==13){
    				$scope.earthQuakeCityInput = $scope.earthQuakeMap.getBounds();
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

		marker.content = '<div class="infoWindowContent">'+info.datetime+'</div>';
		google.maps.event.addListener(marker,'click',function(){
			infoWindow.setContent('<h2>'+marker.title+'</h2>'+marker.content);
			infoWindow.open($scope.earthQuakeMap,marker);
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
.controller('earthQuake',function($scope,myEarthQuakeGeoApiService){
	var mapBounds = {
    	'east':-62.5,
    	'west':-125.4,
    	'north':52.1,
    	'south':24.7,
    };
    myEarthQuakeGeoApiService.callGeoApi(mapBounds).then(function(response){
    	$scope.american = response.earthquakes;
    });
})
.factory('myEarthQuakeGeoApiService',function($http,$rootScope){
	var myEarthQuakeGeoApiService = {};
	myEarthQuakeGeoApiService.callGeoApi = function(mapBounds){
		console.log(mapBounds);
		var data = {
			'east':mapBounds.east,
			'west':mapBounds.west,
			'north':mapBounds.north,
			'south':mapBounds.south,
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