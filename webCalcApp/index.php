<?php
	require_once("view/header.php");
?>
	<div ng-controller="myCalController" class="row">
		<div class="col-md-3">
			<p>Calculator</p>
			<input type="text" ng-model="myScreen"/>
			<table>
				<tr>
					<td><button ng-click="clickUpdate('1')">1</button></td>
					<td><button ng-click="clickUpdate('2')">2</button></td>
					<td><button ng-click="clickUpdate('3')">3</button></td>
					<td><button ng-click="clickUpdate('+')">+</button></td>
				</tr>
					<td><button ng-click="clickUpdate('4')">4</button></td>
					<td><button ng-click="clickUpdate('5')">5</button></td>
					<td><button ng-click="clickUpdate('6')">6</button></td>
					<td><button ng-click="clickUpdate('-')">-</button></td>
				<tr>
					<td><button ng-click="clickUpdate('7')">7</button></td>
					<td><button ng-click="clickUpdate('8')">8</button></td>
					<td><button ng-click="clickUpdate('9')">9</button></td>
					<td><button ng-click="clickUpdate('*')">&times</button></td>
				</tr>
				<tr>
					<td><button ng-click="clickUpdate('0')">0</button></td>
					<td><button ng-click="clickUpdate('.')">.</button></td>
					<td><button ng-click="clickEqul()">=</button></td>
					<td><button ng-click="clickUpdate('/')">/</button></td>
				</tr>
				<tr>
					<td><button ng-click="clickClear()">C</button></td>	
				</tr>
			</table>


		</div>
	</div>
<?php
	require_once("view/footer.php");
?>