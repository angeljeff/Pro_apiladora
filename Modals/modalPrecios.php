<!-- Modal -->
<div class="modal fade" id="modalPrecios" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-sm" >
    <div class="modal-content">
      <div class="modal-header headerRegister bg-success">
        <h5 class="modal-title text-dark" id="titleModal">Nuevo Precio</h5>
        <button type="button" class="cerrar-success" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <form id="formPrecios" name="formPrecios" class="form-horizontal">
              <input type="hidden" id="idPrecio" name="idPrecio" value="">
              <div class="row pt-2">
                  <div class="col-md-12">
                    <label for="intpeso" >Peso de la saca en libras: </label>
                  <input type="number" class="form-control input-style" id="intpeso" name="intpeso" required="" min="10" step="10">
                    
                  </div>
              </div>
              <div class="row pt-3">
              <!-- <div class="col-md-12">
                  <label for="intpreciogl">Precio grano largo: </label>
                  <input type="number" class="form-control input-style" id="intpreciogl" name="intpreciogl" required="" min="1" step="0.50">
                </div> -->
                <div class=" col-md-12">
                  <label for="intpreciogc">Precio grano corto: </label>
                  <input type="number" class="form-control input-style" id="intpreciogc" name="intpreciogc" required="" min="1" step="0.50">

                </div>
              </div>
              <div class="row pt-3">
              <div class="col-md-12">
                  <label for="intpreciogl">Precio grano largo: </label>
                  <input type="number" class="form-control input-style" id="intpreciogl" name="intpreciogl" required="" min="1" step="0.50">
                </div>
                <!-- <div class=" col-md-12">
                  <label for="intpreciogc">Precio grano corto: </label>
                  <input type="number" class="form-control input-style" id="intpreciogc" name="intpreciogc" required="" min="1" step="0.50">

                </div> -->
              </div>


              <!-- <div class="row pt-2">
                <div class="col-md-6">
                  <label for="txtEstado">Estado: </label>
                  <select name="txtEstado" class="form-control select-select"  id="txtEstado">
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>

                </select>
                </div>
              </div> -->
              <hr>
              <div class="tile-footer right">
                <button id="btnActionForm" class="btn btn-sm btn-success" type="submit"><span id="btnText">Guardar</span></button>&nbsp;&nbsp;&nbsp;
                <button class="btn btn-sm btn-danger" type="button" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </form>
      </div>
    </div>
  </div>
</div>



