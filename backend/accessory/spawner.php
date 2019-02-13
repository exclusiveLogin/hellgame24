<?php
include_once "../headers.php";
include_once "../dbsetting_n_connect.php";

$arr = new stdClass();

function createNewSlot(){
  $query = "INSERT INTO `object_slots` (`owner_type`) VALUES ( \"map\" )";
  //Берем последний id созданного
  $query2 = "SELECT LAST_INSERT_ID() FROM `object_slots` ";

  global $mysql;
  $mysql->query($query);
  $res = $mysql->query($query2);

  $row = $res->fetch_row();
  $newslotId = $row[0]; // id нового созданного слота

  return $newslotId;
}

function linkSlotOnRGO( $idSlot, $idRGO ){

  //удаляем все линки на RGO  из  слотов
  $query = "UPDATE `object_slots` SET `rgo_id` = NULL WHERE `rgo_id`= $idRGO";
  //выставляем правильный линк с нужного слота
  $query2 = "UPDATE `object_slots` SET `rgo_id` = $idRGO WHERE `id`= $idSlot";

  global $mysql;
  $mysql->query( $query );
  $mysql->query( $query2 );

}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {

  if(isset($_GET['mode']) && isset($_GET['spawn_id']) && $_GET['mode'] == 'single'){
    $id = $_GET['spawn_id'];

    // Выбор спауна

    // проверка наличия

    // создание RGO

    // создание слота

    // оборачивание RGO в слот

    // связывание spawn с новым слотом
  }

}
