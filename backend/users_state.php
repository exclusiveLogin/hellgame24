<?php
header("Access-Control-Allow-Origin:*");
include_once "dbsetting.php";
$mysql= new mysqli($dbhost,$logindb,$passdb,$dbname);
if($mysql->connect_errno)die("error db:".$mysql->connect_error);
$mysql->query("SET time_zone = '+04:00'");
$mysql->query("SET NAMES 'UTF8';");

$query="SELECT `id_user`,`name`,`email`,`title`,`login`,`o_code`,`r_code`,`played`,`online`,`emotion`,`old_emotion`,
`status_code`,`status_msg`,`danger`,DATE_FORMAT(`upd`,'%e.%m.%y %H:%i') AS `upd`,`upd_status`,`code_msg`,`img_big`,`img_min` FROM `users`,`users_act` WHERE `users`.`id`=`users_act`.`id_user`";
$json = array();
$res = $mysql->query($query);
$row = $res->fetch_assoc();

while($row){
    array_push($json, $row);
    $row = $res->fetch_assoc();
}

echo json_encode($json);
$res->close();
$mysql->close();