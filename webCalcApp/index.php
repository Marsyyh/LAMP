<?php
	require_once("view/header.php");
?>
	<div ng-controller="myCalController" class="row">
		<div class="col-md-3">
			<p>Calculator</p>
			<input type="text" ng-model="myScreen"/>
			<table>
				<tr>
					<td><button ng-click="click1()">1</button></td>
					<td><button ng-click="click2()">2</button></td>
					<td><button ng-click="click3()">3</button></td>
					<td><button ng-click="clickPlus()">+</button></td>
				</tr>
					<td><button ng-click="click4()">4</button></td>
					<td><button ng-click="click5()">5</button></td>
					<td><button ng-click="click6()">6</button></td>
					<td><button ng-click="clickMinus()">-</button></td>
				<tr>
					<td><button ng-click="click7()">7</button></td>
					<td><button ng-click="click8()">8</button></td>
					<td><button ng-click="click9()">9</button></td>
					<td><button ng-click="clickMulti()">&times</button></td>
				</tr>
				<tr>
					<td><button ng-click="click0()">0</button></td>
					<td><button ng-click="clickDot()">.</button></td>
					<td><button ng-click="clickEqul()">=</button></td>
					<td><button ng-click="clickDiv()">/</button></td>
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