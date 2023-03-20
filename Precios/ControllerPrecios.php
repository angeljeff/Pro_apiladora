<?php

include("../models/ModPrecios.php");


$opcion=$_POST['opcion'];

switch($opcion){

    case "obtenerPrecios":
        $precios= new Precios();
        $respuesta= $precios->getPrecios();
        for ($i=0; $i < count($respuesta); $i++) {
            $btnEdit = '';
            $respuesta[$i]['precio_gcorto']= "$ ".$respuesta[$i]['precio_gcorto'];
            $respuesta[$i]['precio_glargo']= "$ ".$respuesta[$i]['precio_glargo'];
            // $respuesta[$i]['estado']= ($respuesta[$i]['estado_maq']== 0)? "Inactivo" : "Activo" ;
            $btnEdit = '<button  class="btn btn-info  btn-sm" onClick="Editarinfo(this,'.$respuesta[$i]['id_precio'].')" title="Editar Precio"><i style="font-size:12px;" class="fas fa-pencil-alt"></i></button>';
            $respuesta[$i]['options'] = '<div class="text-center">'.$btnEdit.'</div>';
        }
        echo json_encode($respuesta,JSON_UNESCAPED_UNICODE);
 
    break;

    case "obtengoUnPrecio":
        $precio= new Precios();
        $id= $_POST['idPrecio'];
        $respuesta = $precio->getUnPrecio($id);
        $data= array("data"=> $respuesta);
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
 
    break;

    

    case "consultarPeso":
        $precio= new Precios();
        $peso =$_POST['peso']; 
        $valida= $precio->consultar_peso($peso);
        if($valida){
            $respuesta= array("respon" =>"si");
        }
        else{$respuesta= array("respon" =>"no");}
        echo json_encode($respuesta,JSON_UNESCAPED_UNICODE);
         
    break;

    

    case "actualizarPrecio":
        $precio= new Precios();
        $precio->idprecio=$_POST['idprecio'];
        $precio->pgc = $_POST['intpreciogc'];
        $precio->pgl = $_POST['intpreciogl'];
        $valida= $precio->actualizar_Precio($precio);
        if($valida){
            $respuesta= array("respon" =>"si");
        }
        else{$respuesta= array("respon" =>"no");}
        echo json_encode($respuesta,JSON_UNESCAPED_UNICODE);
         
    break;


    case "guardarPrecios":
        $precio= new Precios();
        $precio->peso = $_POST['intpeso']; 
        $precio->pgc = $_POST['intpreciogc'];
        $precio->pgl = $_POST['intpreciogl'];
        $valida= $precio->guardarPrecio($precio);
        if($valida){
            $respuesta= array("respon" =>"si");
        }
        else{$respuesta= array("respon" =>"no");}
        echo json_encode($respuesta,JSON_UNESCAPED_UNICODE);
         
    break;


    


};

?>


