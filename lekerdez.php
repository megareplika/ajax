<?php

require_once './MySqlDB.php';

$db = new MySqlDB();
$data = $_GET['mezo'];
$tablaNeve = "varos";
$where = "nev like '$data%' or nev like '%$data' or nev like '%$data%'";

$eredmeny = $db->lekerdez($tablaNeve, $where);

$tomb = array();

if ($eredmeny->num_rows > 0) {
    while ($row = $eredmeny->fetch_assoc()) {
        array_push($tomb, $row);
    }
    echo json_encode($tomb);
}