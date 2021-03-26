<?php

include_once './MySqlDB.php';

if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $db = new MySqlDB();
    $id = $_GET['ID'];

    $szuro = "ID = " . $id;

    $db->torol("varos", $szuro);
}