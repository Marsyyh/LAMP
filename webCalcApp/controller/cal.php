<?php
isHttp();

function isHttp(){
	$postdata = file_get_contents('php://input');
	$request = json_decode($postdata);
	$action = $request->action;
	if($action && $action == 'string'){
		$calNumber = $request->calNumber;
		$calOperator = $request->calOperator;
		//eval('$calString='.$calString.';');
		for($i=0;$i<count($calOperator);$i++){
			if($calOperator[$i]=='*'){
				$calNumber[$i] *= $calNumber[$i+1];
				unset($calNumber[$i+1]);
				$calNumber = array_values($calNumber);
				unset($calOperator[$i]);
				$calOperator = array_values($calOperator);
			}elseif($calOperator[$i]=='/'){
				$calNumber[$i] /= $calNumber[$i+1];
				unset($calNumber[$i+1]);
				$calNumber = array_values($calNumber);
				unset($calOperator[$i]);
				$calOperator = array_values($calOperator);
			}
		}
		for($i=0;$i<count($calOperator);$i++){
			if($calOperator[$i]=='+'){
				$calNumber[$i] += $calNumber[$i+1];
				unset($calNumber[$i+1]);
				$calNumber = array_values($calNumber);
				unset($calOperator[$i]);
				$calOperator = array_values($calOperator);
			}elseif($calOperator[$i]=='-'){
				$calNumber[$i] -= $calNumber[$i+1];
				unset($calNumber[$i+1]);
				$calNumber = array_values($calNumber);
				unset($calOperator[$i]);
				$calOperator = array_values($calOperator);
			}
		}
		echo $calNumber[0];
	}
}

?>