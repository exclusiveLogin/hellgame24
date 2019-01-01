<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: content-type");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Request-Method: POST, GET, OPTION");

include_once "../dbsetting_n_connect.php";

$arr = new stdClass();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // The request is using the POST method
    $arr = json_decode(file_get_contents('php://input'), true);

    $arr['title'] = isset($arr['title']) ? $arr['title'] : '';
    $arr['text_field'] = isset($arr['text_field']) ? $arr['text_field'] : '';
    $arr['author'] = isset($arr['author']) ? $arr['author'] : '';

    $query = "INSERT INTO `blog` (`title`, `text_field`, `author`) VALUES (\"$arr[title]\", \"$arr[text_field]\", \"$arr[author]\")";

    $res = $mysql->query($query);

    echo json_encode( $arr );
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // The request is using the GET method
    $arr = array();

    $arr['limit'] = 

    $limit = isset($_GET['limit']) ? 'LIMIT='.$_GET['limit'] : '';
    $author  = isset($_GET['author']) ? '`author`="'.$_GET['author'].'"' : NULL;
    //$arr['group'] = isset($_GET['group']) ? $_GET['group'] : NULL;

    $where = ($author) ? 'WHERE '.$author : '';
    
    $query = "SELECT * FROM `blog` $where ORDER BY `id` DESC";

    $res = $mysql->query($query);
    //echo $query;

    $row = $res->fetch_assoc();
    $json = array();

    while( $row ){
        array_push($json, $row);
        $row = $res->fetch_assoc();
    } 



    echo json_encode($json);
}
