<!-- Modal -->
<div class="modal fade" id="modalActividad" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-md" >
    <div class="modal-content">
      <div class="modal-header headerRegister bg-success">
        <h5 class="modal-title text-dark" id="titleModal">Nueva Actividad</h5>
        <button type="button" class="cerrar-success" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <form id="formActividad" name="formActividad" class="form-horizontal">
              <input type="hidden" id="idActividad" name="idActividad" value="">
              <div class="row">
              <div class="col-md-12">
                  <label for="txtCodigo">Actividad: </label>
                  <input type="text" class="form-control input-style" id="txtActividad" name="txtActividad" required="" minlength="3" maxlength="100">
                </div>
              </div>
              <div class="row pt-2">
                <div class="col-md-12">
                  <label for="txtDescripcion" >Descripción: </label>
                  <textarea class="form-control input-style" name="txtDescripcion" id="txtDescripcion" cols="30" rows="4" required=""></textarea>
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






<!-- modificar modal Actividad  -->

<!-- Modal -->
<div class="modal fade" id="modalOrdenActividad" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-md" >
    <div class="modal-content">
      <div class="modal-header  bg-success">
        <h5 class="modal-title text-dark" id="titleModal">Modificar orden</h5>
        <button type="button" class="cerrar-success" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <form id="formOrdenActividad" name="formOrdenActividad" class="form-horizontal">
              <h5 class="mb-4">Modifica el orden que se realizarán las actividades. </h5>
              <div class="contenidoActividades">
                <p class="acti">Primera actividad assjj  dsjjjsdjj dsjjdied ddjsjeej ejje</p>
                <p class="acti">Primera actividad assjj  dsjjjsdjj dsjjdied ddjsjeej ejje</p>

                <p class="acti">Primera actividad assjj  dsjjjsdjj dsjjdied ddjsjeej ejje</p>

              </div>
              

              <hr>
              <div class="tile-footer right">
                <button id="btnAction" class="btn btn-success" type="submit"><i class="fa fa-fw fa-lg fa-check-circle"></i><span >Guardar</span></button>&nbsp;&nbsp;&nbsp;
                <button class="btn btn-danger" type="button" data-bs-dismiss="modal"><i class="fa fa-fw fa-lg fa-times-circle"></i>Cerrar</button>
              </div>
            </form>
      </div>
    </div>
  </div>
</div>











