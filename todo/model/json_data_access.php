<?php
require_once(__DIR__ . "/../config/constants.php");
require_once(__DIR__ . "/domain.php");
error_reporting(E_ALL);

$users_db_file = __DIR__ . "/../data/users.json";


$users_json_string = file_get_contents($users_db_file);
$usersDB = json_decode($users_json_string);

$todosDB = false;

function get_current_user_id(){
	if(session_id() == '' || !isset($_SESSION)) {
	    // session isn't started
	    session_start();
	}

	if(isset($_SESSION[CURRENT_USER])){
		$cusr = $_SESSION[CURRENT_USER];
		$split = explode("@",$cusr);
		return $split[0];
	}
	return false;
}

function save_user_object($user){

}

function get_user_array(){
	return array (
		//map,
		//map
	);
}

function get_user_object($userId){
	global $usersDB;
	$userCount = count($usersDB);
	
	if($userCount > 0) {
		$user = false;
		for($index=0;$index<$userCount;$index++){
			$usr = $usersDB[$index];			
			if($usr->email===$userId){
				//convert $usr to map
				$user = convert_usr_stdclass_to_map($usr);
				break;
			}
		}

		return $user;
	}

	return false;
}

function convert_usr_stdclass_to_map($usr){
	return array(
		user_FIRST_NAME=> $usr->firstName,
		user_LAST_NAME=> $usr->lastName,
		user_EMAIL=> $usr->email,
		user_PASSWORD=> $usr->password,
		user_SALT=> $usr->salt,
		user_TYPE=> $usr->type,
		user_ENABLED=> $usr->enabled
	);
}

function convert_todo_stdclass_to_map($tdo){
	return array(
		todo_ID=> $tdo->id,
		todo_DESCRIPTION=> $tdo->desc,
		todo_DATE=> $tdo->date,
		todo_STATUS=> $tdo->status
	);
}

function init_todos_db(){
	global $todosDB;
	if(!$todosDB){
		$currentUserId = get_current_user_id();
		if(!$currentUserId){
			trigger_error("Please login before trying to access your To Do list");
		}
		$todos_db_file = __DIR__ . "/../data/${currentUserId}.json";
		
		$todos_json_string = file_get_contents($todos_db_file);
		$tmpDB = json_decode($todos_json_string);

		$stdTodos = $tmpDB->todos;
		//print_r($stdTodos);

		$todoCount = count($stdTodos);
		//print_r($todoCount);

		if($todoCount > 0) {
			$todosDB = array(
				"nextId"=>$tmpDB->nextId				
			);

			$tmpTodos = array();
			for($index=0;$index<$todoCount;$index++){
				$tdo = $stdTodos[$index];
				$todoObj = convert_todo_stdclass_to_map($tdo);
				array_push($tmpTodos, $todoObj);
			}

			$todosDB["todos"] = $tmpTodos;
		}
	}
}



function save_todo_object($todo){
	global $todosDB;
	init_todos_db();
	$todosDB["nextId"]++;
	array_push($todosDB["todos"],$todo);
	$currentUserId = get_current_user_id();
	$todos_db_file = __DIR__ . "/../data/${currentUserId}.json";
	$fp = fopen($todos_db_file,'w');
	if(!$fp){
		echo "there is some error";
	}else{
		fwrite($fp, json_encode($todosDB));
		fclose($fp);
	//write JSON record
	}
}

function get_todo_object($id){
	init_todos_db();
}

function get_todo_array($user){	
	global $todosDB;
	init_todos_db();	
	return $todosDB["todos"] ? $todosDB["todos"] : array() ;
}

function generate_todo_id(){
	global $todosDB;
	init_todos_db();
	$nextID = $todosDB['nextId'];
	return $nextID;
	//
}

function get_todos_array($id){
	global $todosDB;
	init_todos_db();

}
?>