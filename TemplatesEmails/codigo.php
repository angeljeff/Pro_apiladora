<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Codigo</title>
    <style>
        
.conteneder{
    width: 100%;
    max-width: 750px;
    min-width:500px;
    border: 2px solid rgb(210, 210, 211);
    margin: 5px auto;
    background-color: #fff;
    box-sizing: border-box;
    padding: 10px 10px 20px 10px;
    border-radius: 2px;
}

.encabezado{
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 3px;
    border-bottom: 3px solid #00bf63;
    
}

.imagen{
    width: 20%;
    height: auto;
    /* background-color: #ffd; */
    margin: auto 5px;
    text-align: start;
    display: inline-block;
}

.imagen img{
    width: 50%;
    height:auto;
    margin: 3px 0 0 3px;
}

.nombreApi{
    display: inline-block;
    padding: 0 15px 0 0;
    width:70%;
    margin:0;

}
.nombreApi h1{
    
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-weight: bold;
    text-align: right;
    margin: 0;
    margin-bottom: 10px;
}

.contenedor-texto{
    width: 100%;
    background-color: #fff;
    border-radius: 3px;
    margin: 5px 0 0 0;
    padding: 3px 0;
}

.contenedor-texto p {
    padding: 0px 6px;
    font-size: 23px;
    margin: 0;
    text-align: justify;

}

.titulo-codigo{
    width: 100%;
    background-color: #00bf63;
    border-radius: 3px;
    margin: 4px auto 0;

}
.titulo-codigo h2{
    margin: 0;
    text-align: center;
    padding: 3px 0;
    font-weight: 900;
    color: #fff;
}

.conten-coigo{
    width: 40%;
    height: 75px;
    min-height: 50px;
    max-height: 75px;
    margin: 30px auto 0;
    border: 2px solid #00bf63;
}

.conten-coigo h3{
    text-align: center;
    font-size: 30px;

}

    </style>
</head>
<body>
    <div class="conteneder">
        <div class="encabezado">
            <div class="imagen">
                <img src="../Gp/assets/img/icono.png" alt="Don Freddy">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="90.000000pt" height="40.000000pt" viewBox="0 0 600.000000 500.000000" preserveAspectRatio="xMidYMid meet">
            <metadata>
            Don Freddy
            </metadata>
            <g transform="translate(0.000000,500.000000) scale(0.086331,-0.113122)" fill="#000000" stroke="none">
            <path d="M10 2210 l0 -2210 3470 0 3470 0 0 2210 0 2210 -3470 0 -3470 0 0 -2210z m5718 1714 l22 -15 0 -403 c0 -299 -3 -405 -12 -414 -20 -20 -62 -13 -104 17 -78 57 -72 56 -670 56 -529 0 -553 -1 -573 -19 -20 -19 -21 -27 -21 -318 0 -285 1 -299 20 -318 19 -19 33 -20 213 -20 215 0 266 9 332 59 42 32 83 39 103 19 9 -9 12 -116 12 -418 l0 -407 -26 -13 c-23 -13 -30 -12 -62 7 -124 74 -118 73 -344 73 -195 0 -209 -1 -228 -20 -20 -20 -20 -33 -20 -565 l0 -544 25 -53 c14 -29 35 -68 46 -86 20 -30 20 -34 5 -57 l-16 -25 -403 0 c-300 0 -406 3 -415 12 -20 20 -14 56 18 100 63 87 60 2 60 1578 0 1576 3 1491 -60 1578 -36 50 -38 85 -8 106 20 14 128 16 960 16 849 0 942 2 980 17 24 9 50 22 58 29 16 13 71 44 80 44 3 0 16 -7 28 -16z m-3890 -85 c265 -28 495 -156 667 -370 210 -260 337 -590 390 -1009 18 -136 20 -460 5 -592 -80 -684 -369 -1168 -800 -1341 -164 -66 -181 -67 -941 -67 -519 0 -688 3 -697 12 -20 20 -13 51 23 103 69 96 65 -3 65 1582 0 1382 -1 1435 -19 1483 -10 27 -33 68 -50 92 -40 55 -41 96 -1 111 28 10 1257 7 1358 -4z m3992 -3109 l0 -200 -210 0 -210 0 0 200 0 200 210 0 210 0 0 -200z"/>
            <path d="M1347 3156 c-22 -8 -50 -25 -64 -38 -55 -50 -53 -16 -53 -984 0 -982 -3 -940 58 -981 24 -16 52 -18 277 -18 l250 0 51 27 c74 39 153 130 211 245 92 178 136 348 153 588 31 440 -77 872 -266 1063 -100 100 -120 106 -369 109 -162 2 -219 0 -248 -11z"/>
            </g>
            </svg> -->
            </div>
            <div class="nombreApi">
                <h1>PILADORA DON FREDDY</h1>
            </div>
        </div>
        <div class="cuerpo">
            <div class="contenedor-texto">
                <p><?= $texto ?></p>
            </div>
            <div class="titulo-codigo">
                <?php if($iscontra){ ?>
                    <h2> CONTRASEÑA </h2>
                <?php } else{ ?>
                    <h2> CÓDIGO </h2>
                <?php } ?>
                
            </div>
            <div class="conten-coigo">
                <h3><?= $codigo ?></h3>

            </div>
        </div>
    </div>
    
</body>
</html>