<?php
$pass = $_GET["pass"];
$userIp = "";
$domainName = "gameshop.iapp.ir";

$target_dir_other_files = "../../$domainName/desk/maktabAlzahra-images";
$mainJson = json_decode(file_get_contents("$target_dir_other_files/json/main.ini"));
$isSuccess = false;
if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $userIp = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $userIp = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $userIp = $_SERVER['REMOTE_ADDR'];
}

foreach ($mainJson as $user) {
    if ($user->pass === $pass) {
        $isSuccess = true;
        if (!$user->ip || gettype($user->ip) === "string") {
            $user->ip = [];
        }
        if (!in_array($userIp, $user->ip)) {
            array_push($user->ip, $userIp);
        }
    }
}
if (!$isSuccess) {
    die("unSuccess");
} else {
    $file = fopen("$target_dir_other_files/json/main.ini", "w");
    fwrite($file, json_encode($mainJson));
    fclose($file);
}

function addNewPost($filePath, $property, $newPostData, $isPop = false, $property2 = false)
{
    $oldFile = file_get_contents($filePath);
    $oldFile = json_decode($oldFile);
    if ($isPop)
        array_pop($oldFile->$property);

    if ($property2)
        array_unshift($oldFile->$property->$property2, $newPostData);
    else
        array_unshift($oldFile->$property, $newPostData);
    $file = fopen($filePath, "w");
    fwrite($file, json_encode($oldFile));
    fclose($file);
}
function addNewPostForSearchResult($filePath, $newPostData)
{
    $oldFile = file_get_contents($filePath);
    $oldFile = json_decode($oldFile);
    array_unshift($oldFile, $newPostData);
    $file = fopen($filePath, "w");
    fwrite($file, json_encode($oldFile));
    fclose($file);
}
function checkGet($get)
{
    if (isset($_GET["$get"])) {
        $property = $_GET["$get"];
        if (
            !$property ||
            preg_match("/\</", $property) != 0 ||
            preg_match("/\>/", $property) != 0
        ) {
            print_r("$get <br/>");
            die('failed');
        }
    }

}
function addPostHandler($target_dir_other_files, $imgName, $domainName)
{
    $id = uniqid('id.', true);
    $hashTag = trim($_GET["hashTag"]);
    $date = time() * 1000;
    $title = trim($_GET["title"]);
    $pageLink = trim($_GET["pageLink"]);
    if ($_GET["type"] !== "homePageLastFetch" && $_GET["type"] !== "homePageSlider3" && $_GET["type"] !== "searchResult") {
        $object = array(
            "imgSrc" => "https://$domainName/site.php?fileSrc=images/$imgName",
            "hashTag" => $hashTag,
            "date" => $date,
            "underImgText" => $title,
            "pageLink" => $pageLink,
            'id' => $id
        );
        addNewPost("$target_dir_other_files/json/allRequestsData.ini", $_GET["type"], $object);
    } else if ($_GET["type"] === "homePageSlider3") {
        $object = array(
            "imgSrc" => "https://$domainName/site.php?fileSrc=images/$imgName",
            "hashTag" => $hashTag,
            "date" => $date,
            "underImgText" => $title,
            "pageLink" => $pageLink,
            'id' => $id
        );
        addNewPost("$target_dir_other_files/json/allRequestsData.ini", $_GET["type"], $object, true);
    } else if ($_GET["type"] === "homePageLastFetch") {
        checkGet("from");
        checkGet("desc");
        $object = array(
            "imgSrc" => "https://$domainName/site.php?fileSrc=images/$imgName",
            "from" => trim($_GET["from"]),
            "date" => $date,
            "title" => $title,
            "desc" => trim($_GET["desc"]),
            "pageLink" => $pageLink,
            'id' => $id
        );
        if ($_GET["homePageLastSectApiMode"] !== 'public')
            addNewPost("$target_dir_other_files/json/allRequestsData.ini", "homePageLastFetch", $object, false, "public");
        addNewPost("$target_dir_other_files/json/allRequestsData.ini", "homePageLastFetch", $object, false, $_GET["homePageLastSectApiMode"]);
    }
    $object = array(
        "imgSrc" => "https://$domainName/site.php?fileSrc=images/$imgName",
        "hashTag" => $hashTag,
        "date" => $date,
        "underImgText" => $title,
        "pageLink" => $pageLink,
        'id' => $id
    );
    addNewPostForSearchResult("$target_dir_other_files/json/searchResult.ini", $object);
}
if (isset($_GET['uploadPhoto'])) {

    $target_dir = '../../$domainName/desk/maktabAlzahra-images/images/';

    if (!file_exists($target_dir)) {
        mkdir($target_dir);
    }
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    $uploadOk = 1;
    $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);

    // Check if image file is a actual image or fake image
    if (isset($_POST["submit"])) {
        $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
        if ($check) {
            $uploadOk = 1;
        } else {
            $uploadOk = 0;
        }
    }
    // Check if file already exists
    $imgName = basename($_FILES["fileToUpload"]["name"]);

    if (file_exists($target_file)) {
        $uploadOk = 0;
    }
    if ($_FILES["fileToUpload"]["size"] > (30 * 1048576)) {
        $uploadOk = 0;
    }
    // Allow certain file formats
    if (
        $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif"
    ) {
        $uploadOk = 0;
    }
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 1) {
        move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file);
    }

    addPostHandler($target_dir_other_files, $imgName, $domainName);
    echo "success";

} else if (isset($_GET['deletePost'])) {
    $oldFile = json_decode(file_get_contents("$target_dir_other_files/json/allRequestsData.ini"));
    $searchRes = json_decode(file_get_contents("$target_dir_other_files/json/searchResult.ini"));
    $type = $_GET["type"];
    $selecteType = $_GET["selecteType"];
    $index = 0;
    $isSuccess = false;
    if ($type !== "homePageLastFetch") {
        foreach ($oldFile->$type as $post) {
            if ($post->id === $_GET["id"]) {
                array_splice($oldFile->$type, $index, 1);
                $isSuccess = true;
                echo "success";
            }
            $index++;
        }
    } else {
        foreach ($oldFile->homePageLastFetch->$selecteType as $post) {
            if ($post->id === $_GET["id"]) {
                array_splice($oldFile->homePageLastFetch->$selecteType, $index, 1);
                $isSuccess = true;
                echo "success";
            }
            $index++;
        }
    }
    $index = 0;
    if ($isSuccess) {
        foreach ($searchRes->$type as $post) {
            if ($post->id === $_GET["id"]) {
                array_splice($searchRes->$type, $index, 1);
                $isSuccess = true;
            }
            $index++;
        }
    }
    if (!$isSuccess)
        die("failed2314");

    $file = fopen("$target_dir_other_files/json/searchResult.ini", "w");
    fwrite($file, json_encode($searchRes));
    fclose($file);

    $file = fopen("$target_dir_other_files/json/allRequestsData.ini", "w");
    fwrite($file, json_encode($oldFile));
    fclose($file);
} else {
    echo "<center><h1>): اینجا چکار میکنی </h1></center>";
}