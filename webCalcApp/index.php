<?php
	require_once("view/header.php");
?>
	<div ng-controller="myCalController" class="row">
		<div class="col-md-3">
			<p>Calculator</p>
			<input type="text" ng-model="myScreen"/>
			<table>
				<tr>
					<td><button ng-click="clickNumber('1')">1</button></td>
					<td><button ng-click="clickNumber('2')">2</button></td>
					<td><button ng-click="clickNumber('3')">3</button></td>
					<td><button ng-click="clickOperator('+')">+</button></td>
				</tr>
					<td><button ng-click="clickNumber('4')">4</button></td>
					<td><button ng-click="clickNumber('5')">5</button></td>
					<td><button ng-click="clickNumber('6')">6</button></td>
					<td><button ng-click="clickOperator('-')">-</button></td>
				<tr>
					<td><button ng-click="clickNumber('7')">7</button></td>
					<td><button ng-click="clickNumber('8')">8</button></td>
					<td><button ng-click="clickNumber('9')">9</button></td>
					<td><button ng-click="clickOperator('*')">&times</button></td>
				</tr>
				<tr>
					<td><button ng-click="clickNumber('0')">0</button></td>
					<td><button ng-click="clickNumber('.')">.</button></td>
					<td><button ng-click="clickEqul()">=</button></td>
					<td><button ng-click="clickOperator('/')">/</button></td>
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