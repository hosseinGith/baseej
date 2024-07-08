<?php
$ip = $_SERVER['REMOTE_ADDR'];
$oldIp = file_get_contents("./ip.json");
if (!$oldIp) {
    $oldIp = [];
} else {
    $oldIp = json_decode($oldIp);
}

print_r(array_search($ip, $oldIp));
if (array_search($ip, $oldIp) !== 0) {
    array_push($oldIp, $ip);
    $file = fopen("./ip.json", "w");
    fwrite($file, json_encode($oldIp));
    fclose($file);
}
