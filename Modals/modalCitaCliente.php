<!-- Modal -->
<div class="modal fade" id="modalCitaCliente" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-md" >
    <div class="modal-content">
      <div class="modal-header headerRegister bg-success">
        <h5 class="modal-title text-dark" id="titleModal">Escoge tu horario</h5>
        <div class="cont-botones">
            <button class="numeracion" onclick="orden('uno')">1</button>
            <button class="numeracion " onclick="orden('dos')">2</button>
            <button class="numeracion" onclick="orden('tres')">3</button>
            <!-- <button class="numeracion" disabled>4</button> -->
        </div>
        <!-- <button type="button" class="cerrar-success" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> -->
      </div>
      <div class="modal-body">
            <!-- <form id="formMaquinaria" name="formMaquinaria" class="form-horizontal">
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
            </form> -->
            <div class="ContenedorCitas">
                <!-- <div class="citas__disponibles">
                    <p class="citas__disponibles__texto agendado">8:00 - 9:30   Ocupado</p>
                    <button class="citas__disponibles__boton">agendar</button>
                </div>
                <div class="citas__disponibles">
                    <p class="citas__disponibles__texto pendiente">9:30 - 11:00   Pendiente</p>
                    <button class="citas__disponibles__boton" onclick="agendar()">agendar</button>
                </div>
                <div class="citas__disponibles">
                    <p class="citas__disponibles__texto disponible">11:00 - 12:30   Disponible</p>
                    <button class="citas__disponibles__boton">agendar</button>
                </div>
                <div class="citas__disponibles">
                    <p class="citas__disponibles__texto disponible">13:00 - 14:30   Disponible</p>
                    <button class="citas__disponibles__boton">agendar</button>
                </div>
                <div class="citas__disponibles">
                    <p class="citas__disponibles__texto pendiente">14:30 - 16:00   Pendiente</p>
                    <button class="citas__disponibles__boton">agendar</button>
                </div> -->
            </div>


            <div class="contenedorForm d-none">
                <form id="formCita" name="formCita" class="form-horizontal">
                <div class="contenedor-primer">
                <div class="row pt-2">
                <div class="col-md-6">
                  <label for="txtTipo">Tipo Grano: </label>
                  <select name="txtTipo" class="form-control select-select"  id="txtTipo">
                  <option value="--" disabled selected> -- Seleccione --</option>
                    <option value="1">Grano corto</option>
                    <option value="2">Grano largo</option>

                </select>
                </div>
                <div class="col-md-6">
                  <label for="txtCantidad">Cantidad de sacas: </label>
                  <input type="number" class="form-control input-style center" id="txtCantidad" name="txtCantidad" required="" min="1" max="1000">
              </div>
              </div>
              <div class="row mt-3">
              <div class="col-md-6">
                <label for="txtPeso">Peso aproximado de cada saca: </label>
                    <select name="txtPeso" class="form-control select-select"  id="txtPeso">
                      <!-- <option value="--" disabled selected> -- Seleccione --</option>
                      <option value="100">100</option>
                      <option value="200">200</option> -->
                  </select>
              </div>
                <div class=" col-md-6">
                  <label for="txtValorPagar">Aproximado a pagar: </label>
                  <input type="text" class="form-control  sinfocus" id="txtValorPagar" name="txtValorPagar" readonly>
                </div>
              </div>
              </div>

              <div class="con-bt">
              <button id="continue" class="btn btn-sm btn-info" type="submit">Continuar ---</button>
              </div>

                </form>

            </div>

            <div class="resumen d-none">
                <h5 style="text-align:center;">RESUMEN DE TU CITA</h5>
                <!-- <div class="container-resumen"> -->
                <div class="resumencon">
                    <p>Fecha:   </p>&nbsp;&nbsp;&nbsp;
                    <p class="p">2023 - 12-23</p>
                </div>
                <div class="resumencon">
                    <p>Horario:   </p>&nbsp;&nbsp;&nbsp;
                    <p class="p">12:30 - 14:30</p>
                </div>
                <!-- </div> -->

                <div class="resumencon">
                    <p>Tipo de grano del arroz:   </p>&nbsp;&nbsp;&nbsp;
                    <p class="p">Grano corto</p>
                </div>
                <div class="resumencon">
                    <p>Cantidad de sacas:   </p>&nbsp;&nbsp;&nbsp;
                    <p class="p">25</p>
                </div>
                <div class="resumencon">
                    <p>Peso c/Saca:   </p>&nbsp;&nbsp;&nbsp;
                    <p class="p">25</p>
                </div>
                <div class="resumencon">
                    <p>Aproximado a pagar:   </p>&nbsp;&nbsp;&nbsp;
                    <p class="p"> $12.45</p>
                </div>

                <div class="con-b">
              <button id="" class="btn btn-sm btn-info" type="submit">Aceptar</button>
              </div>

            </div>

            
      </div>
    </div>
  </div>
</div>



