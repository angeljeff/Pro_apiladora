<?php
class Maquinaria{

    public $idMaquinaria;
    public $codigo;
    public $maquina;
    public $descripcionM;
    public $estadoM;

    public function __construct(){
        $this->idMaquinaria="";
        $this->codigo="";
        $this->maquina="";
        $this->descripcionM="";
        $this->estadoM="";
    }
    

    public function getMaquinarias(){
        require_once("../conexion/conexion.php");
        $consulta = "SELECT *
         FROM maquinarias ";
        $consultarmaquinarias = $conexion->prepare($consulta);
        $consultarmaquinarias->execute();
        return $consultarmaquinarias->fetchall(PDO::FETCH_ASSOC);
        die(); 
    }

    public function getUnaMaquinaria($id){
        require_once("../conexion/conexion.php");
        $this->idMaquinaria = $id;
        $consulta = "SELECT *
         FROM maquinarias where `id` = '$this->idMaquinaria' ";
        $consultarmaquinarias = $conexion->prepare($consulta);
        $consultarmaquinarias->execute();
        return $consultarmaquinarias->fetch(PDO::FETCH_ASSOC);
        die(); 
    }


    public function consultar_codigo( $codigo){
        $this->codigo=$codigo;
        require_once("../conexion/conexion.php");
        $consulta = "SELECT *
         FROM maquinarias where `codigo_maq` = '$this->codigo' ";
        $consultarmaquinarias = $conexion->prepare($consulta);
        $consultarmaquinarias->execute();
        $count= $consultarmaquinarias->rowCount();
        if($count > 0){
            return true;
        }else{
            return false;
        }
        die(); 
    }

    public function guardarMaquinaria( $maquinaria){
        $this->codigo= $maquinaria->codigo;
        $this->maquina= $maquinaria->maquina;
        $this->descripcionM=  $maquinaria->descripcionM;
        $this->estadoM= $maquinaria->estadoM;
        require_once("../conexion/conexion.php");
        $consulta = "INSERT INTO maquinarias (codigo_maq, maquina, descripcion_ma, estado_maq)
        values (:cod, :maq, :descr, :est)";
        $insertar= $conexion->prepare($consulta);
         $insertar->bindParam(':cod',$this->codigo);
        $insertar->bindParam(':maq',$this->maquina);
        $insertar->bindParam(':descr',$this->descripcionM);
        $insertar->bindParam(':est',$this->estadoM);
        if($insertar->execute()){
            return true;
        }else{
            return false ;
        }  

        die(); 
    }


    public function actualizar_Maquinaria( $maquinaria){
        $this->codigo= $maquinaria->codigo;
        $this->maquina= $maquinaria->maquina;
        $this->descripcionM=  $maquinaria->descripcionM;
        $this->estadoM= $maquinaria->estadoM;
        $this->idMaquinaria= $maquinaria->idMaquinaria;
        require_once("../conexion/conexion.php");
        $consulta = "UPDATE  maquinarias SET  `maquina`= :maq , 
        `descripcion_ma`= :descr , `estado_maq` =:est
        where `id`= '$this->idMaquinaria' and `codigo_maq`='$this->codigo' ";
        $actualizar= $conexion->prepare($consulta);
        $actualizar->bindParam(':maq',$this->maquina);
        $actualizar->bindParam(':descr',$this->descripcionM);
        $actualizar->bindParam(':est',$this->estadoM);
        if($actualizar->execute()){
            return true;
        }else{
            return false ;
        }  

        die(); 
    }





};



?>