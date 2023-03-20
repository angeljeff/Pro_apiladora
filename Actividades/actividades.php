<?php 
$namepage="Actividades";
require_once('../material/pages/header_admin.php');
require_once("../Modals/modalActividad.php")
?>



    <!-- End Navbar -->
    <button class="btn btn-primary buton" type="button" id="abrirModal"><i class="fas fa-plus-circle" aria-hidden="true"></i> Nuevo</button>
    <button style="background-color: #1A73E8 !important ;" class="btn buton" type="button" id="abrirModificacion"> Modificar orden</button>
    
    
    <div class="container-fluid py-4 personal">
      <input type="text" id="namePage" value="<?= $namepage?>" hidden>
      <div class="row">
            <div class="col-md-12">
                  <div class="table-responsive ">
                    <table class="table table-hover table-bordered" id="tableActividades">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Actividad</th>
                          <th>Descripción</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  
                </div>
             
            </div>
        </div>

    </div>



<?php 
require_once('../material/pages/footer_admin.php');
?>
 