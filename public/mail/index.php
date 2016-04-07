<?php
require_once 'PHPMailerAutoload.php';

$results_messages = array();

$mail = new PHPMailer(true);
$mail->CharSet = 'utf-8';
ini_set('default_charset', 'UTF-8');

class phpmailerAppException extends phpmailerException {}

try {
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$message = "Full Name: " . $_POST["name"] . "\r\n";
$message .= "Email: " . $_POST["email"] . "\r\n";
$message .= "Message: " . $_POST["text"] . "\r\n";

$mail->isSMTP();
$mail->SMTPDebug  = 0;
$mail->Host       = "smtp.office365.com";
$mail->Port       = "587";
$mail->SMTPSecure = "tls";
$mail->SMTPAuth   = true;
$mail->Username   = "register@mindmaps.io";
$mail->Password   = "Hornsey.8";
$mail->addReplyTo("register@mindmaps.io", "Mindmaps");
$mail->setFrom("register@mindmaps.io", "Mindmaps");
$mail->addAddress("register@mindmaps.io", "Mindmaps");
$mail->Subject  = "Mindmaps Registration";
$body = $message;
$mail->WordWrap = 78;
$mail->msgHTML($body);

try {
    $mail->send();
    $results_messages[] = "Message has been sent using SMTP";
} catch (phpmailerException $e) {
    throw new phpmailerAppException('Unable to send to: ' . $to. ': '.$e->getMessage());
}

} catch (phpmailerAppException $e) {
    $results_messages[] = $e->errorMessage();
}