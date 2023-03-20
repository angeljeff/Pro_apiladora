<?php 
$namepage="Calendario";
require_once('../material/pages/header_admin.php');
require_once("../Modals/modalCitaCliente.php")
?>



    <!-- End Navbar -->
    <div class="container-fluid py-4 personal">
        <input type="text" id="namePage" value="<?= $namepage?>" hidden>
        <div id='calendar'></div>

    </div>



<?php 
require_once('../material/pages/footer_admin.php');
?>
 