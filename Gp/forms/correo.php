<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
$correo= $_POST['correo'];
$asunto= $_POST['asunto'];
$nombres= $_POST['nombres'];
$cuerpo= $_POST['cuerpo'];
// ob_start();
// require_once("../../TemplatesEmails/codigo.php");
// $CC = ob_get_clean();


//Load Composer's autoloader
require '../../phpMailer/Exception.php';
require '../../phpMailer/PHPMailer.php';
require '../../phpMailer/SMTP.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = 0;                      //Enable verbose debug output  SMTP::DEBUG_SERVER;
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'agromarketplace00@gmail.com';                     //SMTP username
    $mail->Password   = 'qgogyfgvzysnobig';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('agromarketplace00@gmail.com', 'SoporteCorreo');
    $mail->addAddress($correo);     //Add a recipient



    //Content
    $mail->isHTML(true);
    $mail->CharSet =  'UTF-8';   //Set email format to HTML
    $mail->Subject = $asunto;
    // $mail->msgHTML($dd);
    $mail->Body= "<strong>NOMBRES: </strong> ".$nombres."<br>"."<strong>MENSAJE: </strong> ".$cuerpo;
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo "ok";
    
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    
   
}

?>