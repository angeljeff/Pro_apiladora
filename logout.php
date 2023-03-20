<?php session_start();
	session_unset();
	session_destroy();
    require_once("constantes.php") ?>

<script>
    document.location.href="<?php echo URL ?>/Principal/inicio.php";
</script>

