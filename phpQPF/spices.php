<!DOCTYPE html> 
<html>
<head>
	<meta charset="utf-8">
	<title>Quick Product Finder</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
	<link rel="stylesheet" href="css/spices.css" type="text/css">
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"></script>
</head>
<body ng-app="app">
	<div class="wrapper">
		<div class="row" style="border-width: 1px; border: solid;">
			<div class="col-md-2" ng-controller="column1">
				<div ng-repeat="item in items" ng-mouseup="c1Click(item.id);">{{item.name}}</div>
			</div>	
			<div class="col-md-2" ng-controller="column2">
				<div ng-repeat="item in items" ng-click="c2Click(item.id);">{{item.name}}</div>
			</div>
			<div class="col-md-2" ng-controller="column3">
				<div ng-repeat="item in items" ng-click="c3Click(item.id);">{{item.name}}</div>
			</div>
			<div class="col-md-2" ng-controller="column4">
				<div ng-repeat="item in items" ng-click="c4Click(item.id);">{{item.name}}</div>
			</div>
			<div class="col-md-2" ng-controller="column5">
				<div ng-repeat="item in items" ng-click="c5Click(item.id);">{{item.name}}</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-8 productConsole">
				Description:<br/>
			</div>
			<div class="col-md-2">
			</div>
		</div>
	</div>
	<script type="text/javascript" src="rcs/test.js"></script>

</body>
</html>
