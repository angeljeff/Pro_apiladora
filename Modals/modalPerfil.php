<!-- Modal -->
<div class="modal fade" id="modalPerfil" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-lg" >
    <div class="modal-content">
      <div class="modal-header headerRegister bg-info">
        <h5 class="modal-title text-dark" id="titleModal">Modificar Perfil</h5>
        <button type="button" class="cerrar-info" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <form id="formUser" name="formUser" class="form-horizontal">
              <input type="hidden" id="idUsuario" name="idUsuario" value="">
              <div class="row">
              <div class="col-md-6">
                  <label for="txtNombre">Nombres: </label>
                  <input type="text" class="form-control input-style" id="txtNombre" name="txtNombre" required="">
                </div>
                <div class=" col-md-6">
                  <label for="txtApellido">Apellidos: </label>
                  <input type="text" class="form-control input-style" id="txtApellido" name="txtApellido" required="">
                </div>
              </div>
              <div class="row pt-2">
                <div class="col-md-6">
                  <label for="txtIdentificacion" >Cédula: </label>
                  <input type="text" class="form-control input-style" id="txtIdentificacion" name="txtIdentificacion" maxlength="10" onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;" readonly>
                </div>
                <div class="col-md-6">
                  <label for="txtTelefono">Celular:</label>
                  <input type="text" class="form-control input-style" id="txtTelefono" name="txtTelefono" minlength="10" maxlength="10" onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;">
                </div>

              </div>

              <div class="row pt-2">
                <div class="col-md-6">
                  <label for="txtEmail">Correo electrónico: </label>
                  <input type="email" class="form-control input-style" id="txtEmail" name="txtEmail" required="">
                </div>
                <div class=" col-md-6">
                  <label for="txtPassword">Nueva Contraseña (opcional): </label>
                  <input type="password" class="form-control input-style" id="txtPassword" name="txtPassword" >
                </div>
              </div>
              <div class="row pt-2 justify-content-center d-none" id="container_codigo">
                <div class=" col-md-6">
                  <label for="txtcodigo">Ingresa el Código: </label>
                  <input type="text" class="form-control input-style" id="txtcodigo" name="txtcodigo"  maxlength="6" onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;">
                </div>
              </div>
              <hr>
              <div class="tile-footer right">
                <button id="btnActionForm" class="btn btn-info" type="submit"><i class="fa fa-fw fa-lg fa-check-circle"></i><span id="btnText">Guardar</span></button>&nbsp;&nbsp;&nbsp;
                <button class="btn btn-danger" type="button" data-bs-dismiss="modal"><i class="fa fa-fw fa-lg fa-times-circle"></i>Cerrar</button>
              </div>
            </form>
      </div>
    </div>
  </div>
</div>



