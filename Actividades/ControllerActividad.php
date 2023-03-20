<?php

include("../models/ModActividad.php");


$opcion=$_POST['opcion'];

switch($opcion){

    case "obtenerActividades":
        $actividad= new Actividad();
        $respuesta= $actividad->getActividades();
        // $actividades="";
        for ($i=0; $i < count($respuesta); $i++) {
            $btnEdit = '';
            // $respuesta[$i]['estado']= ($respuesta[$i]['estado_maq']== 0)? "Inactivo" : "Activo" ;
            $btnEdit = '<button  class="btn btn-info  btn-sm" onClick="Editarinfo(this,'.$respuesta[$i]['id_actividad'].')" title="Editar Actividad"><i style="font-size:12px;" class="fas fa-pencil-alt"></i></button>';
            $respuesta[$i]['options'] = '<div class="text-center">'.$btnEdit.'</div>';
            // $actividades.= '<p id="'.$respuesta[$i]['id_actividad'].'" class="acti">'.$respuesta[$i]['nom_actividad'].'</p>';
                
        }
        // $respuesta[$i]['actividades'] =$actividades;
        echo json_encode($respuesta,JSON_UNESCAPED_UNICODE);
 
    break;


    case "obtenerActividadesOrden":
        $actividad= new Actividad();

        $respuesta= $actividad->getActividades();
        $actividades="";
        for ($i=0; $i < count($respuesta); $i++) {
            $actividades.= '<p data-id="'.$respuesta[$i]['id_actividad'].'" class="acti">'.$respuesta[$i]['nom_actividad'].'</p>';
                
        }
        $respuesta['actividades'] =$actividades;
        echo $respuesta['actividades'];
 
    break;

    case "obtengoUnaActividad":
        $actividad= new Actividad();
        $id= $_POST['idActividad'];
        $respuesta = $actividad->getUnaActividad($id);
        $data= array("data"=> $respuesta);
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
 
    break;

    

    case "actualizarActividad":
        $actividad= new Actividad();
        $actividad->idactividad =$_POST['idActividad'];
        $actividad->nombreA =  $_POST['txtActividad'];
        $actividad->descActividad = $_POST['txtDescripcion'];
        $valida= $actividad->actualizar_Actividad($actividad);
        if($valida){
            $respuesta= array("respon" =>"si");
        }
        else{$respuesta= array("respon" =>"no");}
        echo json_encode($respuesta,JSON_UNESCAPED_UNICODE);
         
    break;


    case "guardarActividad":
        $actividad= new Actividad();
        $actividad->nombreA = $_POST['txtActividad']; 
        $actividad->descActividad = $_POST['txtDescripcion'];
        $valida= $actividad->guardarActividad($actividad);
        if($valida){
            $respuesta= array("respon" =>"si");
        }
        else{$respuesta= array("respon" =>"no");}
        echo json_encode($respuesta,JSON_UNESCAPED_UNICODE);
         
    break;

    case "ActualizarActividadesOrden":
        $actividad= new Actividad();
	    $arreglo=json_decode($_POST['arreglo'],true);
        $limite= count($arreglo);
        for($i=0; $i<$limite; $i++){
            $actividad->actuActividad($arreglo[$i]['id'],$arreglo[$i]['orden'] );


        }
        $respuesta= array("respon" =>"si");
        echo json_encode($respuesta,JSON_UNESCAPED_UNICODE);


         
    break;


    


};

?>


