<?php




//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// agrego el archivo de conexion 
include("../conexion/conexion.php");


//Load Composer's autoloader
require '../phpMailer/Exception.php';
require '../phpMailer/PHPMailer.php';
require '../phpMailer/SMTP.php';





function set_email($correo, $titulo, $cuerpo){
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
    $mail->setFrom('agromarketplace00@gmail.com', 'Don Freddy');
    $mail->addAddress($correo);
        
    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = $titulo;
    $mail->Body    = $cuerpo;
    $mail->CharSet =  'UTF-8';
    $mail->send();
    return true;

    
} catch (Exception $e) {
    // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    return false;
    
   
}

}


//  CLASE CORREO 
class Correo {

    // envia un correo con el codigo para registrase 
    public function enviar_codigo_registro($correo, $codigo,$titulo="Codigo Verificación"){
        $texto="Gracias por registrarte a nuestra página web, continúa con tu registro, ";
        $texto.="este es tu código de verificación.";
        $iscontra=false;
        ob_start();
        require_once("../TemplatesEmails/codigo.php");
        $mensaje = ob_get_clean();
        // $mensaje="Este es el codigo que se le ah enviado".$codigo;
        return set_email($correo,$titulo, $mensaje);
        die();
    }

    public function enviar_new_contrasenia($codigo, $email,$titulo="Recuperacion Contraseña"){
        $texto="Lamentamos que olvidaras tu contraseña, esta es tu nueva contraseña temporal, ";
        $texto.="utilizala para ingresar al sistema y procura cambiarla por una que recuerdes.";
        $iscontra=true;
        ob_start();
        require_once("../TemplatesEmails/codigo.php");
        $mensaje = ob_get_clean();
        // $mensaje="Este es el codigo que se le ah enviado".$codigo;
        return set_email($email,$titulo, $mensaje);
        die();
    }

    public function enviar_actualizar_datos($codigo, $email,$titulo="Modificación datos"){
        $texto="Para seguir con el proceso de actualizaciónb de tus datos, este es el ";
        $texto.="código que debes ingresar.";
        $iscontra=false;
        ob_start();
        require_once("../TemplatesEmails/codigo.php");
        $mensaje = ob_get_clean();
        // $mensaje="Este es el codigo que se le ah enviado".$codigo;
        return set_email($email,$titulo, $mensaje);
        die();
    }

}

?>

