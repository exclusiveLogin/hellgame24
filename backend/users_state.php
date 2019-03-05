<?php
header("Access-Control-Allow-Origin:*");
include_once "dbsetting.php";
$mysql= new mysqli($dbhost,$logindb,$passdb,$dbname);
if($mysql->connect_errno)die("error db:".$mysql->connect_error);
$mysql->query("SET time_zone = '+04:00'");
$mysql->query("SET NAMES 'UTF8';");

$query="SELECT `id_user`,`name`,`email`,
        `title`,`login`,`played`,`online`,
        DATE_FORMAT(`upd`,'%e.%m.%y %H:%i') 
        AS `upd`,`img_big`,`img_min` 
        FROM `users`,`users_act` 
        WHERE `users`.`id`=`users_act`.`id_user`";



$json = array();
$res = $mysql->query($query);
$row = $res->fetch_assoc();

while($row){

    $trendQuery = "SELECT `id`, `value`, `datetime`, UNIX_TIMESTAMP(`datetime`)*1000 AS `utc`, `emo_title`, `emo_desc` FROM `$row[login]_emo` ORDER BY `id` DESC LIMIT 15;";
    $statusQuery = "SELECT * FROM `user_status` WHERE `login`=\"$row[login]\" ORDER BY `id` DESC LIMIT 1";

    $trend = array();
    $status = array();

    $t_result = $mysql->query( $trendQuery );
    $s_result = $mysql->query( $statusQuery );

    $t_row = $t_result->fetch_assoc();


    $s_row = $s_result ? $s_result->fetch_assoc() : false;

    if($s_result) array_push($status, $s_row);

    while( $t_row ){
      array_push($trend, $t_row);
      $t_row = $t_result->fetch_assoc();
    }

    $row['emo_trend'] = $trend;
    $row['status'] = $status;

    array_push($json, $row);
    $row = $res->fetch_assoc();
}

echo json_encode($json);
$res->close();
$mysql->close();
