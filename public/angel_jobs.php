<?php

error_reporting(0);

$url = 'https://api.angel.co/1/jobs?access_token=';
$token = 'f6f53a1fff9962abd8e3d54a6b489b2ee3e5285f9c33d19d';
$angelUrl = $url . $token;
$json = file_get_contents($angelUrl);
echo $json;