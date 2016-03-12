<?php

require_once(__DIR__ . "/../config/constants.php");
//require_once('../utils/utils.php');
//require_once('../utils/security_utils.php');
//require_once('../da/data_access.php');
require_once(__DIR__ . "/../util/validators.php");
require_once(__DIR__ . "/../service/data_service.php");

session_start();

if (!isset($_POST["action"])) {
    redirect(VIEWS . "/home.php");
}

$action = $_POST["action"];
if ($action == "Add") {
    if (isset($_POST["description"])) {
        $description = $_POST["description"];
        //validate task description
        //$valid = validateRequired($description);
        $valid = true;
        if ($valid) {
            $scheduledDate = time();
            if (isset($_POST["scheduledDate"]) && strlen(trim($_POST["scheduledDate"])) > 0) {
                $scheduledDate = strtotime($_POST["scheduledDate"]);
            }
            new_todo($description,$scheduledDate);
            //newTask($task, $userId);
        } else {
            $_SESSION["error"] = "Task description is required and can have upto 120 characters";
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
        updateTask($description, $status, $taskId);
    } else {
        $_SESSION["error"] = "Select a task";
    }
    redirect(VIEWS . "/home.php");
}
?>