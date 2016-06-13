<?php

require_once 'PHPMailerAutoload.php';

$mail = new PHPMailer(true);

try {
    $mail->CharSet = 'utf-8';
    ini_set('default_charset', 'UTF-8');

    $post_data = file_get_contents("php://input");
    $decoded = json_decode($post_data, true);

    $message = "Full Name: " . $decoded["name"] . "\r\n";
    $message .= "Email: " . $decoded["email"] . "\r\n";
    $message .= "Message: " . $decoded["text"] . "\r\n";

    $mail->isSMTP();
    $mail->SMTPDebug  = 0;
    $mail->Host = "localhost";
    $mail->addReplyTo($decoded["email"], $decoded["name"]);
    $mail->setFrom("register@mindmaps.io", "Mindmaps");
    $mail->addAddress("register@mindmaps.io", "Mindmaps");
    $mail->Subject  = "[EAP] Mindmaps Registration";
    $mail->WordWrap = 78;
    $mail->msgHTML($message);
    $mail->isHTML(false);

    $mail->send();
    echo "Submitted.";
} catch (phpmailerException $e) {
    error_log($e->errorMessage(), 0);
    echo $e->errorMessage();
} catch (Exception $e) {
    error_log($e->getMessage(), 0);
    echo $e->errorMessage();
}
