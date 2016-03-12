<?php

function validate_registration_form($form) {
    $errors = [];
    
    $firstName = $form["firstName"];
    $lastName = $form["lastName"];
    $userName = $form["userName"];
    $password = $form["password"];        
    
    $firstNameValid = true; //Validate
    if(!$firstNameValid) {
        $errors["firstName"] = "First name is required";
    }
    
    $lastNameValid = true; //Validate
    if(!$lastNameValid) {
        $errors["lastName"] = "Last name is required";
    }
    
    $userNameValid = filter_var($form["userName"], FILTER_VALIDATE_EMAIL);
    if(!$userNameValid) {
        $errors["userName"] = "User name is required and should be a valid email address";
    }

    $passwordValid = true; //Validate
    if(!$passwordValid) {
        $errors["password"] = "Password is required and should have at least 4 characters";
    }
        
    return $errors;
}

?>
