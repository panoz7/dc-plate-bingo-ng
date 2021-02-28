<?php

include ("login-plate.php");


if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // Get all paltes

    $query = "SELECT * FROM plates ORDER BY plate";
    $result = $mysqli->query($query) OR DIE($mysqli->error);

    $data = [];

    while ($plateRow = $result->fetch_assoc()) {

        $data[] = $plateRow['plate'];

    }

    header('Content-type: application/json');
    echo json_encode($data);

}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if ($_GET['plate']) {
        $plate = strtoupper($_GET['plate']);
        $query = "INSERT IGNORE INTO plates SET plate = '".$plate."'";
        $result = $mysqli->query($query) OR DIE($mysqli->error);

        header('Content-type: application/json');
        echo json_encode(['success' => $result]);

    }

}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    if ($_GET['plate']) {

        $plate = strtoupper($_GET['plate']);

        $query = "DELETE FROM plates WHERE plate = '".$plate."'";
        $result = $mysqli->query($query) OR DIE($mysqli->error);

        header('Content-type: application/json');
        echo json_encode(['success' => $result]);
    }
}



?>

