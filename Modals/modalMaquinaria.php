<!-- Modal -->
<div class="modal fade" id="modalMaquinaria" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-md" >
    <div class="modal-content">
      <div class="modal-header headerRegister bg-success">
        <h5 class="modal-title text-dark" id="titleModal">Nueva Maquinaria</h5>
        <button type="button" class="cerrar-success" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <form id="formMaquinaria" name="formMaquinaria" class="form-horizontal">
              <input type="hidden" id="idMaquinaria" name="idMaquinaria" value="">
              <div class="row">
              <div class="col-md-6">
                  <label for="txtCodigo">Código: </label>
                  <input type="text" class="form-control input-style" id="txtCodigo" name="txtCodigo" required="" minlength="3" maxlength="8">
                </div>
                <div class=" col-md-6">
                  <label for="txtMaquina">Máquina: </label>
                  <input type="text" class="form-control input-style" id="txtMaquina" name="txtMaquina" required="">
                </div>
              </div>
              <div class="row pt-2">
                <div class="col-md-12">
                  <label for="txtDescripcion" >Descripción: </label>
                  <textarea class="form-control input-style" name="txtDescripcion" id="txtDescripcion" cols="30" rows="4" required=""></textarea>
                </div>
              </div>

              <div class="row pt-2">
                <div class="col-md-6">
                  <label for="txtEstado">Estado: </label>
                  <select name="txtEstado" class="form-control select-select"  id="txtEstado">
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>

                </select>
                </div>
              </div>
              <hr>
              <div class="tile-footer right">
                <button id="btnActionForm" class="btn btn-success" type="submit"><i class="fa fa-fw fa-lg fa-check-circle"></i><span id="btnText">Guardar</span></button>&nbsp;&nbsp;&nbsp;
                <button class="btn btn-danger" type="button" data-bs-dismiss="modal"><i class="fa fa-fw fa-lg fa-times-circle"></i>Cerrar</button>
              </div>
            </form>
      </div>
    </div>
  </div>
</div>



