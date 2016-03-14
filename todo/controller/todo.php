<?php

require_once(__DIR__ . "/../config/constants.php");
//require_once('../utils/utils.php');
//require_once('../utils/security_utils.php');
require_once(__DIR__ . "/../util/validators.php");
require_once(__DIR__ . "/../service/data_service.php");
require_once(__DIR__ . "/../controller/ensure_session.php");
if (!isset($_POST["action"])) {
    redirect(VIEWS . "/home.php");
}

$action = $_POST["action"];
if ($action == "Add") {
    if (isset($_POST["description"])) {
        $description = $_POST["description"];
        //validate task date
        $scheduledDate = $_POST["scheduledDate"];
        $valid = validateRequired($scheduledDate);
        if ($valid) {
            if (isset($_POST["scheduledDate"]) && strlen(trim($_POST["scheduledDate"])) > 0) {
                $scheduledDate = strtotime($scheduledDate);
            }
            //------------------End validationdate ---------
            new_todo($description,date('m-d-Y',$scheduledDate));
        } else {
            $_SESSION["error"] = "Task date input incorrectly";
        }
    }
    redirect(VIEWS . "/home.php");
} else if ($action == "Edit") {
    if (isset($_POST["taskId"])) {
        $taskId = $_POST["taskId"];
        $_SESSION["taskId"] = $taskId;
        redirect(VIEWS . "/update_task.php");
    } else {
        $_SESSION["error"] = "Select a task";
        redirect(VIEWS . "/home.php");
    }
} else if ($action == "Delete") {
    if (isset($_POST["taskId"])) {
        $taskId = $_POST["taskId"];
        deleteTask($taskId);
    } else {
        $_SESSION["error"] = "Select a task";
    }
    redirect(VIEWS . "/home.php");
} else if ($action == "Update") {
    if (isset($_POST["taskId"])) {
        $taskId = $_POST["taskId"];
        $description = $_POST["description"];
        $status = $_POST["status"];
        update_todo($description, $status, $taskId);
    } else {
        $_SESSION["error"] = "Select a task";
    }
    redirect(VIEWS . "/home.php");
}
?>