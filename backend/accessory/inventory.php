<?php
include_once "../headers.php";
include_once "../dbsetting_n_connect.php";

$arr = new stdClass();

function clearSlot($id){
  $_q = "UPDATE `object_slots` SET `rgo_id` = NULL WHERE `id`= $id";
  echo $_q;
  global $mysql;
  $mysql->query($_q);
}

function clearSlotByItemID($id){
  $_q = "UPDATE `object_slots` SET `rgo_id` = NULL WHERE `rgo_id`= $id";
  //echo $_q;
  global $mysql;
  $mysql->query($_q);
}

function removeSlot($id){
  $_q = "DELETE FROM `object_slots` WHERE `id`= $id";
  //echo $_q;
  global $mysql;
  $mysql->query($_q);
}


function removeItem($id){
  $_q = "DELETE FROM `real_game_objects` WHERE `id`= $id";
  //echo $_q;
  global $mysql;
  $mysql->query($_q);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // The request is using the POST method
    $arr = json_decode(file_get_contents('php://input'), true);

    if(isset($arr['mode']) && $arr['mode'] == 'create_new_rgo'){
      $arr['object_id'] = isset($arr['object_id']) ? $arr['object_id'] : NULL;
      $arr['creator_name'] = isset($arr['creator_name']) ? $arr['creator_name'] : NULL;
      $arr['slot'] = isset($arr['slot']) ? $arr['slot'] : NULL;

      if( $arr['object_id'] && $arr['creator_name'] && $arr['slot']) {
        //создаем новый RGO
        $query = "INSERT INTO `real_game_objects` (`object_id`, `creator_name`) VALUES ( $arr[object_id], \"$arr[creator_name]\" )";
        //Берем последний id созданного
        $query2 = "SELECT LAST_INSERT_ID() FROM `real_game_objects` ";

        $mysql->query($query);
        $res = $mysql->query($query2);
        $row = $res->fetch_row();
        $rgo = $row[0]; // id нового созданного RGO
        if($rgo){
          //связываем слот с созданным RGO
          $query_upd_slot = "UPDATE `object_slots` SET `rgo_id` = $rgo WHERE `id` = $arr[slot]";
          $mysql->query($query_upd_slot);
        }
      }

      echo json_encode( $arr );
    }

}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

  if(isset($_GET['mode']) && $_GET['mode'] == 'all_slots'){
    $query = "SELECT `object_slots`.* ,
    `game_objects`.`id` as `go_id`
    FROM `object_slots`
    LEFT JOIN `real_game_objects` ON `object_slots`.`rgo_id` = `real_game_objects`.`id`
    LEFT JOIN `game_objects` ON `real_game_objects`.`object_id` = `game_objects`.`id`
    ORDER BY `id` DESC
    ";
  }

  if(isset($_GET['mode']) && isset($_GET['item_id']) && $_GET['mode'] == 'utilization_item'){
    $id = $_GET['item_id'];
    //Удаление RGO
    removeItem($id);
    clearSlotByItemID($id);
  }

  if(isset($_GET['mode']) && isset($_GET['slot_id']) && $_GET['mode'] == 'clear_slot'){
    $id = $_GET['slot_id'];
    //Освобождаем слот
    clearSlot($id);
  }

  if(isset($_GET['mode']) && isset($_GET['slot_id']) && $_GET['mode'] == 'remove_slot'){
    $id = $_GET['slot_id'];
    //Удаляем слот
    removeSlot($id);
  }

  // выбрать те эелементы на которые нет линков
  // SELECT * FROM real_game_objects WHERE id not in (SELECT rgo_id from object_slots where rgo_id is not null)

  //SELECT object_slots.*, game_objects.id as go_id FROM `object_slots` LEFT JOIN `real_game_objects` ON object_slots.rgo_id = real_game_objects.id LEFT JOIN `game_objects` ON real_game_objects.object_id = game_objects.id
  if(isset($_GET['mode']) && $_GET['mode'] == 'slots_by_user'){
    $owner  = isset($_GET['owner']) ? '`owner`="'.$_GET['owner'].'"' : NULL;
    $where = ( $owner ) ? 'WHERE '.$owner : '';
    $query = "SELECT `object_slots`.* ,
    `game_objects`.`id` as `go_id`
    FROM `object_slots`
    LEFT JOIN `real_game_objects` ON `object_slots`.`rgo_id` = `real_game_objects`.`id`
    LEFT JOIN `game_objects` ON `real_game_objects`.`object_id` = `game_objects`.`id`
    $where
    ORDER BY `id` DESC";
  }
  if(!$query) die(json_encode([]));
  $res = $mysql->query($query);

  $row = $res->fetch_assoc();
  $json = array();

  while( $row ){
      array_push($json, $row);
      $row = $res->fetch_assoc();
  }

  echo json_encode($json);
}
