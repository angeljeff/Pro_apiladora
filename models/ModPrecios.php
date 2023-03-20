<?php
class Precios{

    public $idprecio;
    public $peso;
    public $pgc;
    public $pgl;
    public $estado_p;

    public function __construct(){
        $this->idprecio="";
        $this->pgc="";
        $this->peso="";
        $this->pgl="";
        $this->estado_p="";
    }
    

    public function getPrecios(){
        require_once("../conexion/conexion.php");
        $consulta = "SELECT *
         FROM precios order by peso_saca asc";
        $consultarprecios = $conexion->prepare($consulta);
        $consultarprecios->execute();
        return $consultarprecios->fetchall(PDO::FETCH_ASSOC);
        die(); 
    }

    public function getUnPrecio($id){
        require_once("../conexion/conexion.php");
        $this->idprecio = $id;
        $consulta = "SELECT *
         FROM precios where `id_precio` = '$this->idprecio' ";
        $consultarprecios = $conexion->prepare($consulta);
        $consultarprecios->execute();
        return $consultarprecios->fetch(PDO::FETCH_ASSOC);
        die(); 
    }


    public function consultar_peso( $peso){
        $this->peso=$peso;
        require_once("../conexion/conexion.php");
        $consulta = "SELECT *
         FROM precios where `peso_saca` = '$this->peso' ";
        $consultarpeso = $conexion->prepare($consulta);
        $consultarpeso->execute();
        $count= $consultarpeso->rowCount();
        if($count > 0){
            return true;
        }else{
            return false;
        }
        die(); 
    }

    public function guardarPrecio( $precio){
        $this->peso= $precio->peso;
        $this->pgc= $precio->pgc;
        $this->pgl=  $precio->pgl;
        require_once("../conexion/conexion.php");
        $consulta = "INSERT INTO precios (peso_saca, precio_gcorto, precio_glargo)
        values (:pes, :pregc, :pregl)";
        $insertar= $conexion->prepare($consulta);
         $insertar->bindParam(':pes',$this->peso);
        $insertar->bindParam(':pregc',$this->pgc);
        $insertar->bindParam(':pregl',$this->pgl);
        if($insertar->execute()){
            return true;
        }else{
            return false ;
        }  

        die(); 
    }


    public function actualizar_Precio( $precio){
        $this->idprecio= $precio->idprecio;
        $this->pgc= $precio->pgc;
        $this->pgl=  $precio->pgl;
        require_once("../conexion/conexion.php");
        $consulta = "UPDATE  precios SET  `precio_gcorto`= :pgc , 
        `precio_glargo`= :pgl
        where `id_precio`= '$this->idprecio' ";
        $actualizar= $conexion->prepare($consulta);
        $actualizar->bindParam(':pgc',$this->pgc);
        $actualizar->bindParam(':pgl',$this->pgl);
        if($actualizar->execute()){
            return true;
        }else{
            return false ;
        }  

        die(); 
    }





};



?>