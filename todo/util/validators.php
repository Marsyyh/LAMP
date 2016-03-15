<?php

function validate($value, $noChars) {
    $valid = isset($value);
    if ($valid) {
        $valid = hasRequiredLength($value, $noChars);
    }

    return $valid;
}

function hasRequiredLength($value, $noChars) {
    $valid = false;
    $trimmedValue = trim($value);
    if (strlen($trimmedValue) >= $noChars) {
        $valid = true;
    }
    return $valid;
}

function validateRequired($scheduledDate){
    // validate the date with space comma .....
    // $validateDateArr = preg_split("/[\s-:;\/.,]+/", $scheduledDate);
    // if(count($validateDateArr)!=3){
    //     return false;
    // }else{
    //     $month = $validateDateArr[0];
    //     $day = $validateDateArr[1];
    //     $year = $validateDateArr[2];
    //     if(checkdate($month,$day,$year)){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }
    if(strtotime($scheduledDate)<=strtotime('now')){
        return false;
    }elseif(strtotime($scheduledDate)>strtotime('+7 day')){
        return false;
    }else{
        return true;
    }
}
?>