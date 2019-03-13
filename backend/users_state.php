<?php
header("Access-Control-Allow-Origin:*");
include_once "dbsetting.php";
$mysql= new mysqli($dbhost,$logindb,$passdb,$dbname);
if($mysql->connect_errno)die("error db:".$mysql->connect_error);
$mysql->query("SET time_zone = '+04:00'");
$mysql->query("SET NAMES 'UTF8';");

$query="SELECT `id_user`,`name`,`email`,
        `title`,`login`,`played`,`online`,
        UNIX_TIMESTAMP(`upd`) * 1000 as `upd` ,`img_big`,`img_min` 
        FROM `users`,`users_act` 
        WHERE `users`.`id`=`users_act`.`id_user`";



$json = array();
$res = $mysql->query($query);
$row = $res->fetch_assoc();

while($row){

    $statusQuery = "SELECT * FROM `user_status` WHERE `login`=\"$row[login]\" ORDER BY `id` DESC LIMIT 1";

    $status = array();

    $s_result = $mysql->query( $statusQuery );

    $s_row = $s_result ? $s_result->fetch_assoc() : false;

    if($s_result) array_push($status, $s_row);

    $row['status'] = $status;

    array_push($json, $row);
    $row = $res->fetch_assoc();
}

echo json_encode($json);
$res->close();
$mysql->close();
