<?php 
$namepage="Maquinaria";
require_once('../material/pages/header_admin.php');
require_once("../Modals/modalMaquinaria.php")
?>



    <!-- End Navbar -->
    <button class="btn btn-primary buton" type="button" id="abrirModal"><i class="fas fa-plus-circle" aria-hidden="true"></i> Nuevo</button>
    <div class="container-fluid py-4 personal">
      <input type="text" id="namePage" value="<?= $namepage?>" hidden>
      <div class="row">
            <div class="col-md-12">
                  <div class="table-responsive ">
                    <table class="table table-hover table-bordered" id="tableMaquinaria">
                      <thead>
                        <tr>
                          <th>Código</th>
                          <th>Maquinaria</th>
                          <th>Descripción</th>
                          <th>Estado</th>
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
 