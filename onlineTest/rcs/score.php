<!DOCTYPE html>
<html>
	<body>
		<div>Welcome to the score page</div>
<?php
$file = "anwser.json";
$fholder = file($file);
$strHolder = "";
foreach($fholder as $key => $value){
	$strHolder .= $value;
}
$strArr = json_decode($strHolder,true);
var_dump($strArr);
$count = 0;
foreach($_POST as $key => $value){
	echo "<p>".$key." ".$value."</p>";
	$questionNumber = $key[0];
	$questionAnwser = $key[1];
}
?>
	</body>
</html>
