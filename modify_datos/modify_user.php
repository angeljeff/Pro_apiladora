<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- hojas de estilo -->
    <link rel="stylesheet" href="style_modify.css">

    <!-- importacion iconos fontawesome -->
    <script src="https://kit.fontawesome.com/2e35153c9c.js" crossorigin="anonymous"></script>


    <!-- fuentes de letras google  -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@1,400;1,700&display=swap" rel="stylesheet">   
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300&display=swap" rel="stylesheet">
<title>Apiladora</title>
</head>
<body>

    <!-- segundo contenedor -->
    <div class="segundo_contenedor">
        <div class="cont_titulo">
            <div class="titulo">
                <h2>Mis datos</h2>
            </div>
            <div class="edit">
                <i class="fa-solid fa-pen-to-square"></i>
            </div>
        </div>

        <div class="contedor_formulario">
            <form action="">
                <div class="cont">
                    <div class="cont_1">
                        <label for="">Nombres*</label>
                        <input type="text" class="inputnombres  input" Placeholder="Ingrese sus nombres">
                    </div>
                    <div class="cont_1">
                        <label for="">Apellidos*</label>
                        <input type="text" class="inputapellidos input" Placeholder="Ingrese sus apellidos">
                    </div>
                </div>
                <div class="cont dos">
                    <div class="cont_1">
                        <label for="">Cédula*</label>
                        <input type="text" class="inputcedula input" Placeholder="Ingrese su # Cédula">
                    </div>
                    <div class="cont_1">
                        <label for="">Celular*</label>
                        <input type="text" class="inputcelular input" Placeholder="Ingrese su # celular">
                    </div>
                </div>
                <div class="cont dos">
                    <div class="cont_1">
                        <label for="">Contraseña*</label>
                        <input type="password" class="inputcontrasenia input" Placeholder="Ingrese su contraseña">
                    </div>
                    <div class="cont_1 seg ">
                        <div class="seguridad">
                        <label for="">Seguridad</label>
                        <div class="barras">
                            <div class="barra"></div>
                            <div class="barra"></div>
                            <div class="barra"></div>
                            <div class="barra"></div>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="cont dos">
                    <div class="cont_1">
                        <label for="">Correo electónico*</label>
                        <input type="text" class="inputcedula input" Placeholder="Ingrese nuevo correo electrónico">
                    </div>
                    <div class="cont_1">
                        <label for="">Código*</label>
                        <input type="text" class="inputcelular input" Placeholder="Código">
                    </div>
                </div>
                <div class="cont">
                    <div class="cont_1">
                        <button type="submit" class="bton_registrar">Modificar</button>
                    </div>


                </div>
            </form>

        </div>
    </div>




    <!-- importacion jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>

    <!-- Archivos javascript locales  -->
    <script src="js_register.js"></script>   
</body>
</html>