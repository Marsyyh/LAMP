<?php
$calOperator = array();
$calNumber = array();
isHttp();
function isHttp(){
	global $calNumber, $calOperator;
	$postdata = file_get_contents('php://input');
	$request = json_decode($postdata);
	$action = $request->action;
	if($action && $action == 'string'){
		$calNumber = $request->calNumber;
		$calOperator = $request->calOperator;

		for($i=0;$i<count($calOperator);$i++){
			if($calOperator[$i]=='*'){
				$calNumber[$i] *= $calNumber[$i+1];
				unsetFuc($i--);
			}elseif($calOperator[$i]=='/'){
				$calNumber[$i] /= $calNumber[$i+1];
				unsetFuc($i--);
			}
		}
		for($i=0;$i<count($calOperator);$i++){
			if($calOperator[$i]=='+'){
				$calNumber[$i] += $calNumber[$i+1];
				unsetFuc($i--);
			}elseif($calOperator[$i]=='-'){
				$calNumber[$i] -= $calNumber[$i+1];
				unsetFuc($i--);
			}
		}
	}
	echo $calNumber[0];
}

function unsetFuc($i){
	global $calNumber, $calOperator;
	unset($calNumber[$i+1]);
	$calNumber = array_values($calNumber);
	unset($calOperator[$i]);
	$calOperator = array_values($calOperator);	
}

?>