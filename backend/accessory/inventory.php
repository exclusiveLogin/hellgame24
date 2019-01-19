<?php
include_once "../headers.php";
include_once "../dbsetting_n_connect.php";

$arr = new stdClass();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // The request is using the POST method
    //$arr = json_decode(file_get_contents('php://input'), true);

    //$arr['title'] = isset($arr['title']) ? $arr['title'] : '';
    //$arr['text_field'] = isset($arr['text_field']) ? $arr['text_field'] : '';
    //$arr['author'] = isset($arr['author']) ? $arr['author'] : '';

    //$query = "INSERT INTO `blog` (`title`, `text_field`, `author`) VALUES (\"$arr[title]\", \"$arr[text_field]\", \"$arr[author]\")";

    //$res = $mysql->query($query);

    //echo json_encode( $arr );
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

  if(isset($_GET['mode']) && $_GET['mode'] == 'all_slots'){
    $query = "SELECT * FROM `object_slots`";
  }

  if(isset($_GET['mode']) && $_GET['mode'] == 'slots_by_user'){
    $owner  = isset($_GET['owner']) ? '`owner`="'.$_GET['owner'].'"' : NULL;
    $where = ( $owner ) ? 'WHERE '.$owner : '';
    $query = "SELECT * FROM `object_slots` $where ORDER BY `id` DESC";
  }

  $res = $mysql->query($query);

  $row = $res->fetch_assoc();
  $json = array();

  while( $row ){
      array_push($json, $row);
      $row = $res->fetch_assoc();
  }

  echo json_encode($json);
}
