<?php
$resultArr;
if($fileholder = fopen("spices.txt","r")){
	while(!feof($fileholder)){
		$str = fgets($fileholder);
		$str = rtrim($str);
		$arr = preg_split("/[\s\n\t]/",$str);
		//$arr = explode(" ",$str);
		if($arr[0] && substr($arr[0],-1)!="x"){
			for ($i = 1; $i < count($arr); $i++) {
				$resultArr[$arr[0]] .= $arr[$i]." ";
			}
		}elseif($arr[0]) {
			$tmp = substr($arr[0],0,-1);
			$tmpCount = 1;
		}elseif(!$arr[0] && $arr[1]){
			$tmpKey = $tmp.$tmpCount;
			for ($i = 0; $i < count($arr); $i++) {
				$resultArr[$tmpKey] .= $arr[$i]." ";
			}
			$tmpCount++;
		}
	}
	fclose($fileholder);
}
$jsonArr;
$i=0;
foreach ($resultArr as $key => $value) {
	$arr = explode(".",$key);
	if ($arr[1]) {
		$level = count(explode(".",trim($key)));
	}else{
		$level = 1;
	}
	if(count($key) == 2){
		$cate = [];
	}
	$cate[0] = substr($key,0,-2);
	$arr = array("id"=>$key,"name"=>$value,"Categorize"=>$cate,"level"=>$level);
	$jsonArr[$i] = $arr;
	$i++;
}
$jsonArr = json_encode($jsonArr);
echo $jsonArr;
?>
