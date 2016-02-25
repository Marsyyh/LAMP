<?php
$fh = fopen("file.json","r");
while(!feof($fh)){
	echo fgets($fh);
}
fclose($fh);
?>
