<?php
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
$jsonArr;
$i=0;
echo "[";
$numItem = count($resultArr);
foreach ($resultArr as $key => $value) {
	$arr = explode(".",$key);
	if ($arr[1]) {
		$level = count($arr);
	}else{
		$level = 1;
		$key = substr($key,0,-1);
	}
	$cate = "";
	if(count($arr) >= 2 && $arr[1]!=""){
		$cate = "";
		for ($j = 0; $j < count($arr)-1; $j++) {
			$cate .= $arr[$j].".";
		}
		$cate = substr($cate,0,-1);
	}
	echo "{\n\"id\":\"".$key."\",\n\"name\":\"".$value."\",\n\"Categorize\":[\"".$cate."\"],\n\"level\":".$level."\n}";
	//$arr = array("id"=>$key,"name"=>$value,"Categorize"=>$cate,"level"=>$level);
	//$jsonArr[$i] = $arr;
	$i++;
	if ($i != $numItem) {
		echo ",";
	}
}
//$jsonArr = json_encode($jsonArr);
echo "]";
?>
