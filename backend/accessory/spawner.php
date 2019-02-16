<?php
include_once "../headers.php";
include_once "../dbsetting_n_connect.php";

$arr = new stdClass();

function createRGO( $_object_id ){
  //создаем новый RGO
  $query = "INSERT INTO `real_game_objects` (`object_id`) VALUES ( $_object_id )";
  //Берем последний id созданного
  $query2 = "SELECT LAST_INSERT_ID() FROM `real_game_objects` ";

  global $mysql;
  $mysql->query($query);
  $res = $mysql->query($query2);
  $row = $res->fetch_row();
  $rgo = $row[0]; // id нового созданного RGO

  echo "rgo created: $rgo from object type: $_object_id > ";
  return $rgo;
}

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

  echo "link Slot $idSlot and RGO $idRGO > ";
  //удаляем все линки на RGO  из  слотов
  $query = "UPDATE `object_slots` SET `rgo_id` = NULL WHERE `rgo_id`= $idRGO";
  //выставляем правильный линк с нужного слота
  $query2 = "UPDATE `object_slots` SET `rgo_id` = $idRGO WHERE `id`= $idSlot";

  global $mysql;
  $mysql->query( $query );
  $mysql->query( $query2 );

}

function linkSlotOnSpawn( $idSpawn, $idSlot ){

  //удаляем все линки на RGO  из  слотов
  $query = "UPDATE `object_spawn` SET `armed_slot_id` = NULL WHERE `armed_slot_id`= $idSlot";
  //выставляем правильный линк с нужного слота
  $query2 = "UPDATE `object_spawn` SET `armed_slot_id` = $idSlot WHERE `id`= $idSpawn";
  //обновление last emit;
  $query3 = "UPDATE `object_spawn` SET `last_emit` = NOW() WHERE `id`= $idSpawn";

  global $mysql;
  $mysql->query( $query );
  $mysql->query( $query2 );
  $mysql->query( $query3 );
}

function getFreeSpawn(){
  $query = "SELECT * FROM `object_spawn` WHERE `armed_slot_id` IS NULL LIMIT 1";

  global $mysql;
  $res = $mysql->query( $query );
  $row = $res->fetch_assoc();

  echo "free spawn selected: $row[id] > ";
  return $row;
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {

  if(isset($_GET['mode']) && $_GET['mode'] === 'single'){

    // Выбор спауна
    $spawn = getFreeSpawn();

    // проверка наличия
    if( $spawn && $spawn['object_id']){
      // создание RGO
      $rgoID = createRGO( $spawn['object_id'] );

      // создание слота
      $slotID = createNewSlot();
      linkSlotOnRGO( $slotID, $rgoID );

      // связывание spawn с новым слотом
      linkSlotOnSpawn( $spawn['id'], $slotID );

      echo "spawn selected $spawn[id] create object type: $spawn[object_id] new slot: $slotID new RGO: $rgoID";
    } else {
      echo "no empty spawn";
    }


  }

}
