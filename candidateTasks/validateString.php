<?php
/*

Use PHP 5.3.

Task: 
Develop a function which validates string looking like this "[{}]"
Every opening bracket should have corresponding closing bracket of same type
"[{}]" is a correct string, "[{]}" is malformed one.


Usage: <your host>/validateString.php?i={input string}

Example: <your host>/validateString.php?i={[{{}

*/

function validateString($in) {
	$bracketStack = [];
    for($i=0;$i<strlen($in);$i++){
    	if(($in[$i]=='{') || ($in[$i]=='[') || ($in[$i]=='(')){
    		array_push($bracketStack,$in[$i]);
    	}elseif($in[$i]=='}' || $in[$i]==']' || $in[$i]==')'){
    		if($bracketStack==[]){
    			return false;
    		}
    		$check = array_pop($bracketStack);
    			switch($check){
    				case "{":
    					if($in[$i]!='}'){
    						return false;
    					}
    					break;
    				case "[":
    					if($in[$i]!=']'){
    						return false;
    					}
    					break;
    				case "(":
    					if($in[$i]!=')'){
    						return false;
    					}
    					break;
    			}
    	}
    }
    if($bracketStack!=[]){
    	return false;
    }else{
    	return true;
    }
}
//$inputString = $_GET['i'];
$inputString = '()()(';
echo "'".$inputString."' is ";
echo validateString($inputString)?"correct":"incorrect";
