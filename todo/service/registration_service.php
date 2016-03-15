<?php
$errors = [];
function validate_registration_form($form) {
    global $errors;
    
    $firstName = $form["firstName"];
    $lastName = $form["lastName"];
    $userName = $form["userName"];
    $password = $form["password"];        
    
    $firstNameValid = firstNameValidation($firstName); //Validate
    // if(!$firstNameValid) {
    //     $errors["firstName"] = "First name is required";
    // }
    
    $lastNameValid = lastNameValidation($lastName); //Validate
    // if(!$lastNameValid) {
    //     $errors["lastName"] = "Last name is required";
    // }
    
    $userNameValid = filter_var($form["userName"], FILTER_VALIDATE_EMAIL);
    if(!$userNameValid) {
        $errors["userName"] = "User name is required and should be a valid email address";
    }

    $passwordValid = passwordValidation($password); //Validate
    // if(!$passwordValid) {
    //     $errors["password"] = "Password is required and should have at least 4 characters";
    // }
    


    

    return $errors;
}
    
    function firstNameValidation($name){
        global $errors;
        $n_validation = false;
        if(strlen($name)<2){
            $errors["lastName"] = "Name needs larger than 2 characters";
        }elseif(strlen($name)>20){
            $errors["lastName"] = "Name needs less than 20 characters";
        }elseif(!preg_match("/^[a-zA-Z]+$/", $name)){
            $errors["lastName"] = "Name only accept alphabet characters";
        }else{
            $n_validation = true;
        }
        return $n_validation;
    }

    function lastNameValidation($name){
        global $errors;
        $n_validation = false;
        if(strlen($name)<2){
            $errors["firstName"] = "Name needs larger than 2 characters";
        }elseif(strlen($name)>20){
            $errors["firstName"] = "Name needs less than 20 characters";
        }elseif(!preg_match("/^[a-zA-Z]+$/", $name)){
            $errors["firstName"] = "Name only accept alphabet characters";
        }else{
            $n_validation = true;
        }
        return $n_validation;
    }

    function passwordValidation($password){
        global $errors;
    /*  6 char min
    *   15 char max    
    *   at least 1 alpha and 1 numeric
    *   special characters ($,_)
    */
        $p_validation = false;
        if(strlen($password)<6){
            $errors["password"] = "password is required and should have at least 6 characters";
        }elseif(strlen($password)>15){
            $errors["password"] = "password cannot exceed 15 characters";
        }elseif(!preg_match("/[0-9]+/",$password)){
            $errors["password"] = "password must contain numerical numbers";
        }elseif(!preg_match("/[a-zA-Z]+/",$password)){
            $errors["password"] = "password must contain alphabet characters";
        }elseif(!preg_match("/^[a-zA-Z,$0-9_]+$/",$password)){
            $errors["password"] = "password only support numerical alphabet , _ $ characters";
        }else{
            $p_valiadation = true;
        }
        return $p_valiadation;
    } 

?>
