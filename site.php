<?php
$target_dir_other_files = '../gameshop.iapp.ir/desk/maktabAlzahra-images';
function checkGet($get)
{
    if (isset($_GET["$get"])) {
        $property = $_GET["$get"];
        if (
            !$property ||
            preg_match("/\</", $property) != 0 ||
            preg_match("/\>/", $property) != 0
        ) {
            print_r("$get ");
            die('failed');
        }
    }

}
function addNewPost($filePath)
{
    $oldFile = file_get_contents($filePath);
    if (!$oldFile)
        $oldFile = 0;
    $oldFile += 1;
    $file = fopen($filePath, "w");
    fwrite($file, $oldFile);
    fclose($file);
}
if (isset($_GET["fileSrc"])) {
    $fileSrc = $_GET["fileSrc"];
    echo file_get_contents("$target_dir_other_files/$fileSrc");
} else if (isset($_GET["json"])) {
    $json = $_GET["json"];
    echo file_get_contents("$target_dir_other_files/json/$json.ini");
} else if (isset($_GET["seen"])) {
    $seen = $_GET["seen"];
    checkGet("seen");
    addNewPost("$target_dir_other_files/json/seens.ini");
}