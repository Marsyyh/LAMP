<?php
isHttp();

function isHttp(){
	$postdata = file_get_contents('php://input');
	$request = json_decode($postdata);
	$action = $request->action;
	if($action && $action == 'string'){
		$calString = $request->calString;
		eval('$calString='.$calString.';');
		echo $calString;
	}
}

?>