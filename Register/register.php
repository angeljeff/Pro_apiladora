<?php session_start();
error_reporting(0);
require_once("../constantes.php");
if($_SESSION ['usuario']['rol']!= null || $_SESSION ['usuario']['rol']!=""){
    if($_SESSION ['usuario']['rol']==RolAdmin){?>
    <script>
      window.location.href = "<?php echo URL?>/Dashboard/dashboard.php";  
    </script>
    <?php
    }elseif($_SESSION ['usuario']['rol']==RolCliente){ ?>
        <script>
        window.location.href = "<?php echo URL?>/Dashboard/dashboard.php";  
      </script>
    <?php
    }
    die();
} ?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- hojas de estilo -->
    <link rel="stylesheet" href="style_register.css">

    <!-- importacion iconos fontawesome -->
    <script src="https://kit.fontawesome.com/2e35153c9c.js" crossorigin="anonymous"></script>


    <!-- agegando sweel alert -->
   

    <!-- fuentes de letras google  -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@1,400;1,700&display=swap" rel="stylesheet">   
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300&display=swap" rel="stylesheet">
<title>Apiladora</title>
</head>
<body>
    <div class="primer_contenedor">
        <div class="titulo">
            <h2>Registro de usuario</h2>
        </div>
        <div class="alerta">
                <p id="parrafo"></p>
                <i class="fa-regular fa-circle-xmark" id="close"></i>
        </div>
        <div class="pri_contenido">
             <div class="pri_cont_mail">
                <form action="" method="POST">
                    <input type="email" name="input_mail" id="pri_email" class="input_mail" minlength="8" maxlength="50" placeholder="Escriba su correo electrónico" required>
                    <button type="submit" class="bton_ingresar">Registrarse</button>
                </form>
            </div>
            <div class="second_cont_codigo">
                <form action="" class="form_1">
                    <input type="email" class="input_correo" placeholder="Escriba su correo electrónico" minlength="8" maxlength="50" required>
                    <button type="submit" id="recargar" title="Volver a enviar el código"><i id="i" class="fa-solid fa-arrow-rotate-right hover"></i></button>
                 </form>
                 <form action="" class="form_2">
                    <div class="form_2_content">
                        <input type="text" pattern="[0-9]{6}" class="input_code" minlength="6" maxlength="6" placeholder="Código" onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;">
                        <button type="submit" class="btn_comprobar comprobar">Comprobar</button>
                    </div>
                    <div class="apoyo"></div>
                 </form>
            </div>
            <div class="sec_contenedor_imagen">
                
                <div class="con_image">
                    <img src="../images/arroz.jpg" alt="arroz">
                </div>
                
            </div>
        </div>
    </div>

    <!-- segundo contenedor -->
    <div class="segundo_contenedor">
        <div class="titulo">
            <h2>Complete su registro</h2>
        </div>
        <div class="contedor_formulario">
            <form action="">
                <div class="cont">
                    <div class="cont_1">
                        <label for="">Nombres*</label>
                        <input type="text" class="inputnombres  input" Placeholder="Ingrese sus nombres" minlength="5" maxlength="50" required>
                    </div>
                    <div class="cont_1">
                        <label for="">Apellidos*</label>
                        <input type="text" class="inputapellidos input" Placeholder="Ingrese sus apellidos"  minlength="5" maxlength="50" required>
                    </div>
                </div>
                <div class="cont dos">
                    <div class="cont_1">
                        <label for="">Cédula*</label>
                        <input type="text" pattern="[0-9]{10}" class="inputcedula input" Placeholder="Ingrese su # Cédula"  minlength="10" maxlength="10" required onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;">
                    </div>
                    <div class="cont_1">
                        <label for="">Celular*</label>
                        <input type="text" pattern="[0-9]{10}" class="inputcelular input" Placeholder="Ingrese su # celular"  minlength="10" maxlength="10" required onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;">
                    </div>
                </div>
                <div class="cont dos">
                    <div class="cont_1">
                        <label id="contra">Contraseña*  
                            <i id="eye_1" class=" eye fa-solid fa-eye"></i>
                            <i id="eye_2" class=" mos eye fa-sharp fa-solid fa-eye-slash"></i>
                        </label> 
                            
                        <input type="password" class="inputcontrasenia input" Placeholder="Ingrese su contraseña"  minlength="8" maxlength="50" required>
                    </div>
                    <div class="cont_1 seg " 
                    title="Asegúrate que tu contraseña contenga mínimo 8 caracteres, en una combinación de letras minúsculas,
                                                    mayúsculas, números y caracteres especiales.">
                        <div class="seguridad">
                        <label for="" id="texto_seguridad">Seguridad</label>
                        <div class="barras">
                            <div class="barra barra_1"></div>
                            <div class="barra barra_2"></div>
                            <div class="barra barra_3"></div>
                            <div class="barra barra_4"></div>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="cont">
                    <div class="cont_1">
                        <button type="submit" class="bton_registrar">Registrarse</button>
                    </div>


                </div>
            </form>

        </div>
    </div>




    <!-- importacion jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>

    <!-- sweel alerts  -->
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Archivos javascript locales  -->
    <script src="../validar_cedula.js"></script>
    <script src="../sweel_alertas.js"></script>
    <script src="../funciones_generales.js"></script>
    <script src="js_register.js"></script>   
</body>
</html>