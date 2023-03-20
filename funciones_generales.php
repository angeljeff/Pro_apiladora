
<?php

class Funciones_generales {
    public function __construct(){
    }

    // funcion crear codigo de 6 digitos
    public function crear_codigo() {
        $aleatorio=rand(0, 999999);
        if(strlen($aleatorio)<6){
            $ceros=6-(strlen($aleatorio));
            return $codigo=(str_repeat("0", $ceros).$aleatorio);
        }else{
            $codigo=$aleatorio;
            return $codigo;
        } 
    }

    function passGenerator($length = 10)
    {
        $pass = "";
        $longitudPass=$length;
        $cadena = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890/*+-";
        $longitudCadena=strlen($cadena);

        for($i=1; $i<=$longitudPass; $i++)
        {
            $pos = rand(0,$longitudCadena-1);
            $pass .= substr($cadena,$pos,1);
        }
        return $pass;
    }

}

 
