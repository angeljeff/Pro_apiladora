<?php

include("../models/ModMaquinaria.php");


$opcion=$_POST['opcion'];

switch($opcion){

    case "obtenerMaquinarias":
        $maquinaria= new Maquinaria();
        $respuesta= $maquinaria->getMaquinarias();
        for ($i=0; $i < count($respuesta); $i++) {
            $btnEdit = '';
            $respuesta[$i]['estado']= ($respuesta[$i]['estado_maq']== 0)? "Inactivo" : "Activo" ;
            $btnEdit = '<button  class="btn btn-info  btn-sm" onClick="Editarinfo(this,'.$respuesta[$i]['id'].')" title="Editar Maquinaria"><i style="font-size:12px;" class="fas fa-pencil-alt"></i></button>';
            $respuesta[$i]['options'] = '<div class="text-center">'.$btnEdit.'</div>';
        }
        echo json_encode($respuesta,JSON_UNESCAPED_UNICODE);
 
    break;

    case "obtengoUnaMaquinaria":
        $maquinaria= new Maquinaria();
        $id= $_POST['idMaquinaria'];
        $respuesta = $maquinaria->getUnaMaquinaria($id);
        $data= array("data"=> $respuesta);
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
 
    break;

    

    case "consultarCodigo":
        $maquinaria= new Maquinaria();
        $codigo =$_POST['codigo']; 
        $valida= $maquinaria->consultar_codigo($codigo);
        if($valida){
            $respuesta= array("respon" =>"si");
        }
        else{$respuesta= array("respon" =>"no");}
        echo json_encode($respuesta,JSON_UNESCAPED_UNICODE);
         
    break;

    

    case "actualizarMaquinaria":
        $maquinaria= new Maquinaria();
        $maquinaria->idMaquinaria=$_POST['idmaquina'];
        $maquinaria->codigo = strtoupper($_POST['codigo']); 
        $maquinaria->maquina = $_POST['txtMaquina'];
        $maquinaria->descripcionM = $_POST['txtDescripcion'];
        $maquinaria->estadoM = $_POST['txtEstado'];
        $valida= $maquinaria->actualizar_Maquinaria($maquinaria);
        if($valida){
            $respuesta= array("respon" =>"si");
        }
        else{$respuesta= array("respon" =>"no");}
        echo json_encode($respuesta,JSON_UNESCAPED_UNICODE);
         
    break;


    case "guardarMaquinaria":
        $maquinaria= new Maquinaria();
        $maquinaria->codigo = strtoupper($_POST['txtCodigo']); 
        $maquinaria->maquina = $_POST['txtMaquina'];
        $maquinaria->descripcionM = $_POST['txtDescripcion'];
        $maquinaria->estadoM = $_POST['txtEstado'];

        $valida= $maquinaria->guardarMaquinaria($maquinaria);
        if($valida){
            $respuesta= array("respon" =>"si");
        }
        else{$respuesta= array("respon" =>"no");}
        echo json_encode($respuesta,JSON_UNESCAPED_UNICODE);
         
    break;


    


};

?>


