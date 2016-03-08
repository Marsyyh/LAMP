<?php
// parse resultArr to key => values pairs
$resultArr = [];
if($fileholder = fopen("spices.txt","r")){
	while(!feof($fileholder)){
		$str = fgets($fileholder);
		$str = rtrim($str);
		$arr = preg_split("/[\s\n\t]/",$str);
		//$arr = explode(" ",$str);
		if($arr[0] && substr($arr[0],-1)!="x"){
			$tmpStr = "";
			for ($i = 1; $i < count($arr); $i++) {
				$tmpStr .= $arr[$i]." ";
			}
			if(!isset($resultArr[$arr[0]])){
				$resultArr[$arr[0]] = $tmpStr;
			}
			$tmpArr = array($arr[0] => $tmpStr);
		}elseif($arr[0]) {
			$tmp = substr($arr[0],0,-1);
			$tmpCount = 1;
		}elseif(!$arr[0]){
			$tmpKey = $tmp.$tmpCount;
			$tmpStr = "";
			for ($i = 0; $i < count($arr); $i++) {
				$tmpStr .= $arr[$i]." ";
			}
			if(!isset($resultArr[$tmpKey])){
				$resultArr[$tmpKey] = $tmpStr;
			}
			$tmpCount++;
		}
	}
	fclose($fileholder);
}
//------------ resultArr Done ---------------

//------------ parse resultArr to jsonArr with format -------------
$i=0;
foreach ($resultArr as $key => $value) {
	if($value == " "){
		continue;
	}
	$arr = explode(".",$key);
	if ($arr[1]) {
		$level = count($arr);
	}else{
		$level = 1;
		$key = substr($key,0,-1);
	}
	$cate = [];
	$cateT = "";
	if(count($arr) >= 2 && $arr[1]!= ""){
		for ($j = 0; $j < count($arr)-1; $j++) {
			$cateT .= $arr[$j].".";
		}
		$cateT = substr($cateT,0,-1);
		$cate[0] = $cateT;
	}
	$arr = array("id"=>$key,"name"=>$value,"Categorize"=>$cate,"level"=>$level);
	$jsonArr[$i] = $arr;
	$i++;
}
//--------------- jsonArr created ---------------
//print_r($jsonArr);

//-----function find the categorize = given id in jsonArr -------
function findArr($id,$arr){
	$tmpArr = [];
	$count = 0;
	foreach ($arr as $key => $value) {
		if(isset($value["Categorize"][0]) && $value["Categorize"][0] == $id){
			$tmpArr[$count++] = $arr[$key];
		}
	}
	return $tmpArr;
}
// $jArr = findArr("1.1",$jsonArr);
// $jArr = json_encode($jArr);
// print_r($jArr);
isHttp($jsonArr);

//-------------  $http request for AngularJS
function isHttp($data){
	$postData = file_get_contents('php://input');
	$request = json_decode($postData);
	$action = $request->action;
	if($action == 'first'){
		$tmpArr = [];
		$count = 0;
		foreach ($data as $key => $value) {
			if(!isset($value['Categorize'][0])){
				$tmpArr[$count++] = $data[$key];
			}
		}
		$callBackData = $tmpArr;
		$callBackData = json_encode($callBackData);
		echo $callBackData;
	}
}

//-------------  ajax request for jQuery -------------------
// function isAjax($test){
// 	if(
// 		isset($_SERVER['HTTP_X_REQUESTED_WITH'])
// 		&& $_SERVER['HTTP_X_REQUESTED_WITH'] == "XMLHttpRequest"
// 		){
// 		echo $test;
// 	}else{
// 		echo $test;
// 		print_r("isAjax not work");
// 	}
// }
?>
