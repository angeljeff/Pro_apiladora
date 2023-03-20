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

    <!-- importacion iconos fontawesome -->
    <script src="https://kit.fontawesome.com/2e35153c9c.js" crossorigin="anonymous"></script>

    <!-- hojas de estilo  -->
    <link rel="stylesheet" href="style_login.css">

    <!-- fuentes de letras  -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@1,400;1,700&display=swap" rel="stylesheet">   
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300&display=swap" rel="stylesheet">
<title>Apiladora</title>
</head>
<body>
    <div class="contenedor_principal">
        <div class="contenedor_login">
            <div class="contenedor_imagen">
                <h2>Don Freddy</h2>
                <p>Calidad en el pilado de tu arroz</p>
            </div>
            <div class="contenedor_ingreso">
                <div class="line"></div>
                <!--<i class="fa-regular fa-circle-xmark" id="close"></i>-->
                <h2>Inicio de Sesión</h2>
                <div class="contenedor_formulario">
                    <form action="" method="POST">
                    <div class="cont_inpt">
                            <input type="email" class="input_mail" placeholder="Escriba su correo electrónico" minlength="8" maxlength="50" required>
                            <i class="user fa-solid fa-user"></i>
                        </div>
                        <div class="cont_inpt">
                            <input type="password" class="input_password" placeholder="Escriba su contraseña" minlength="8" maxlength="50" required>
                            <i id="eye_1" class=" eye user fa-solid fa-eye"></i>
                            <i id="eye_2" class=" mos eye fa-sharp fa-solid fa-eye-slash"></i>
                        </div>
                        <button type="submit" class="btn_ingresar">Ingresar</button>
                    </form>
                </div>
                <a href="#" class="recuperacion"> ¿ Olvidó su contraseña ?</a>
                    <button class="create_cuenta"><a href='../register/register.php'> CREAR CUENTA </a></button>
                <div class="line"></div>
            </div>

        </div>
    </div>



    <!-- importacion jQuery  -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script> 
    
    <!-- sweel alerts  -->
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    
    <!-- archivos locales  -->
    <script src="../sweel_alertas.js"></script>
    <script src="js_login.js"></script>

</body>
</html>