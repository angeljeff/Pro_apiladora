
var myModalCitaCliente = new bootstrap.Modal(document.getElementById('modalCitaCliente'));
var paginaactivas="";
let funciones = new Funciones();
let alertas= new SwAlerts();
var Pesos ="";
var InformacionFinal= new FormData();
InformacionFinal.append("cantidad"," ");
InformacionFinal.append("peso"," ");
InformacionFinal.append("fecha"," ");
InformacionFinal.append("tipograno"," ");
InformacionFinal.append("fechainicio"," ");
InformacionFinal.append("horario"," ");
InformacionFinal.append("fechafin"," ");
InformacionFinal.append("totalmostrar"," ");


// consulto los precios en la tabla precios y los asigno al select
// y al arreglo general para calcular luego el total a pagar 
let form= new FormData();
form.append("opcion","consultarPrecios");
fetch(" "+funciones.url+"Agendamiento/ControllerCitas.php", {
  method: "POST",
  body: form
})
.then((respon)=> respon.json())
.then((respon)=> {
  let select = document.getElementById('txtPeso');
  let option='<option value="--" disabled selected> -- Seleccione --</option>';
  Pesos=respon;
  for (const precio of respon) {
    option+=`<option value="${precio.peso_saca}">${precio.peso_saca}</option>`
  }
  select.innerHTML=option;

})



// son los tres botones del modal que visualiza cada seccion 
function orden(orden){
  switch (orden) {
    case "uno":
      paginaactivas = document.querySelectorAll('.numeracion');
      if(paginaactivas[1].classList.contains('azul')){
        paginaactivas[1].classList.remove('azul')
      }
      if(paginaactivas[2].classList.contains('azul')){
        paginaactivas[2].classList.remove('azul')
      }
      if( document.querySelector('.ContenedorCitas').classList.contains('d-none')){
        document.querySelector('.ContenedorCitas').classList.remove('d-none')
      }
      paginaactivas[0].classList.add("azul");
      document.querySelector('.contenedorForm').classList.add('d-none');
      document.querySelector('.resumen').classList.add('d-none');   
    document.querySelector('#titleModal').innerHTML ="Escoge el horario";


      break;

      case "dos":
        paginaactivas = document.querySelectorAll('.numeracion');
        if(paginaactivas[0].classList.contains('azul')){
          paginaactivas[0].classList.remove('azul')
        }
        if(paginaactivas[2].classList.contains('azul')){
          paginaactivas[2].classList.remove('azul')
        }
        if( document.querySelector('.contenedorForm').classList.contains('d-none')){
          document.querySelector('.contenedorForm').classList.remove('d-none')
        }
        paginaactivas[1].classList.add("azul");
        document.querySelector('.resumen').classList.add('d-none');
        document.querySelector('.ContenedorCitas').classList.add('d-none'); 
        document.querySelector('#titleModal').innerHTML ="Provee información";


        break;

        case "tres":
          if(!comprobarCamposllenos()){
            return false;
          }
          paginaactivas = document.querySelectorAll('.numeracion');
          if(paginaactivas[0].classList.contains('azul')){
            paginaactivas[0].classList.remove('azul')
          }
          if(paginaactivas[1].classList.contains('azul')){
            paginaactivas[1].classList.remove('azul')
          }
          if( document.querySelector('.resumen').classList.contains('d-none')){
            document.querySelector('.resumen').classList.remove('d-none')
          }
          paginaactivas[2].classList.add("azul");
          document.querySelector('.contenedorForm').classList.add('d-none');
          document.querySelector('.ContenedorCitas').classList.add('d-none'); 
          document.querySelector('#titleModal').innerHTML ="Resumen";


          break;
  

  }

}



// consulto si hay citas registradas en un determinado día
// creo la primera pantalla con los horarios disponibles
// abro el modal 

function modalCita(fecha){
  let inicio=['08:00', '09:30', '11:00' , '13:00', '14:30'];
  let fin=['09:30', '11:00', '12:30' , '14:30', '16:00']
  let data = new FormData();
  data.append('opcion', 'obtenerCitasFecha');
  data.append('fecha', fecha);
  fetch(" "+funciones.url+"Agendamiento/ControllerCitas.php", {
    method: "POST",
    body: data
  })
  .then((respon)=> respon.json())
  .then((respon)=> {
    let contenedor_citas= document.querySelector('.ContenedorCitas');
    let div="";
    if(respon.length==0){
      div=`<div class="citas__disponibles">
      <p class="citas__disponibles__texto disponible">08:00 - 09:30   Disponible</p>
      <button class="citas__disponibles__boton" onclick="agendar('${fecha}', '08:00','09:30')">agendar</button>
  </div>
  <div class="citas__disponibles">
      <p class="citas__disponibles__texto disponible">09:30 - 11:00  Disponible</p>
      <button class="citas__disponibles__boton" onclick="agendar('${fecha}', '09:30','11:00')">agendar</button>
  </div>
  <div class="citas__disponibles">
      <p class="citas__disponibles__texto disponible">11:00 - 12:30   Disponible</p>
      <button class="citas__disponibles__boton" onclick="agendar('${fecha}', '11:30' ,'12:30')">agendar</button>
  </div>
  <div class="citas__disponibles">
      <p class="citas__disponibles__texto disponible">13:00 - 14:30   Disponible</p>
      <button class="citas__disponibles__boton" onclick="agendar('${fecha}', '13:00' ,'14:30')">agendar</button>
  </div>
  <div class="citas__disponibles">
      <p class="citas__disponibles__texto disponible">14:30 - 16:00   Disponible</p>
      <button class="citas__disponibles__boton" onclick="agendar('${fecha}', '14:30' ,'16:00')">agendar</button>
  </div>`;

  contenedor_citas.innerHTML= div;

    }else{
      let conjuntoDiv="";
      for (let i = 0; i < inicio.length; i++) {
        let div='';
        for (let j = 0; j < respon.length; j++) {
          let split = respon[j].hora_inicio.split(" ");
          let h_inicio= split[1].substring(0,5);
          if(inicio[i]== h_inicio){
            let texto= (respon[j].status_cita == 3)? "Pendiente" : "Ocupado" ;
            div=`<div class="citas__disponibles">
            <p class="citas__disponibles__texto ${texto.toLowerCase()}">${inicio[i]} - ${fin[i]}   ${texto}</p>
            <button class="citas__disponibles__boton" disabled>agendar</button>
            </div>`;
            // div=`<div class="citas__disponibles">
            // <p class="citas__disponibles__texto ${texto.toLowerCase()}">${inicio[i]} - ${fin[i]}   ${texto}</p>
            // <button class="citas__disponibles__boton" onclick="agendar('${fecha}', '${inicio[i]}','${fin[i]}')">agendar</button>
            // </div>`;
          break;  
          }
                    
        }
        if(div==''){
          div=`<div class="citas__disponibles">
          <p class="citas__disponibles__texto disponible">${inicio[i]} - ${fin[i]}   Disponible</p>
          <button class="citas__disponibles__boton" onclick="agendar('${fecha}', '${inicio[i]}','${fin[i]}')">agendar</button>
      </div>`;
        }
        conjuntoDiv+=div;


       }
       contenedor_citas.innerHTML= conjuntoDiv;
    }
  })
  paginaactivas = document.querySelectorAll('.numeracion');
  formulario = document.querySelector('#formCita');
  paginaactivas[0].classList.add("azul");
  if(paginaactivas[1].classList.contains('azul')){
    paginaactivas[1].classList.remove('azul')
  }
  if(paginaactivas[2].classList.contains('azul')){
    paginaactivas[2].classList.remove('azul')
  }
  if(document.querySelector('.ContenedorCitas').classList.contains('d-none')){
    document.querySelector('.ContenedorCitas').classList.remove('d-none')
  }
  if(!document.querySelector('.contenedorForm').classList.contains('d-none')){
    document.querySelector('.contenedorForm').classList.add('d-none')
  }
  if(!document.querySelector('.resumen').classList.contains('d-none')){
    document.querySelector('.resumen').classList.add('d-none')
  }
  document.querySelector('#titleModal').innerHTML ="Escoge el horario";
  paginaactivas[1].setAttribute('disabled', true);
  paginaactivas[2].setAttribute('disabled',true);
  formulario.reset();
  contenidop= document.querySelectorAll('.p');
  for(let i=0; i< contenidop.length ; i++){
     contenidop[i].textContent="";
  }
  myModalCitaCliente.show();

}



// inicio el calendario y lo muestro 

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      locale: 'es',
      initialView: 'dayGridMonth',
      validRange: function(nowDate) {
        const fecha= new Date();
        const fecha2= new Date();
        const fec = new Date(fecha.setMonth(fecha.getMonth()+1))
        const inicio = new Date(fecha2.setDate(fecha2.getDate()+ 1))
        // console.log(inicio)
        return {
          start: inicio,
          end: fec
           
        }},
        eventClick(info) {
          let dat= moment(info.el.fcSeg.eventRange.range.end).format('YYYY-MM-DD'); 
          modalCita(dat)
        },
        dateClick(info)  {
          modalCita(info.dateStr)
         },
      headerToolbar:{
        start: 'prev,next today', // will normally be on the left. if RTL, will be on the right
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
      hiddenDays: [ 0, 6 ] ,
      events: [
				{
					title: 'All Day Event',
					start: "2023-03-20T20:50:20",
          end:"2023-03-20T22:50:20",
					backgroundColor: '#ED1317',
          allDay: false
				},
			],
    });
    calendar.render();
  });



function agendar(fecha,horario_inicio, horario_fin ){
  InformacionFinal.horario= horario_inicio +" - "+horario_fin;
  InformacionFinal.fecha=fecha;
  paginaactivas = document.querySelectorAll('.numeracion');
  paginaactivas[0].classList.remove("azul");
  paginaactivas[1].classList.add("azul");
  paginaactivas[1].removeAttribute('disabled');
  document.querySelector('#titleModal').innerHTML ="Provee información";
  paginaactivas[2].setAttribute('disabled',true)
  document.querySelector('.ContenedorCitas').classList.add('d-none');
  document.querySelector('.contenedorForm').classList.remove('d-none');

}


// formulario para la cita 
if(document.getElementById('continue')){
  document.getElementById('continue').addEventListener('click',(e)=>{
    e.preventDefault();
    let tipoGrano= document.getElementById('txtTipo');
    let cantidadSacas= document.getElementById('txtCantidad');
    let pesoSaca= document.getElementById('txtPeso');
    let valorPagar= document.getElementById('txtValorPagar');
    if((cantidadSacas.value =="" || cantidadSacas.value ==0) || pesoSaca.value =="--" || tipoGrano.value =="--" ){
      alertas.error_normal("Todos los campos son requeridos.","Atención")
      return false;
    }
    asignarValores();
    // InformacionFinal.cantidad="hola mundo";
    // InformacionFinal.cantidad="cambio";
    // console.log(InformacionFinal.cantidad);
    paginaactivas = document.querySelectorAll('.numeracion');
    paginaactivas[1].classList.remove("azul");
    paginaactivas[2].classList.add("azul");
    paginaactivas[2].removeAttribute('disabled')
    document.querySelector('.contenedorForm').classList.add('d-none');
    document.querySelector('.resumen').classList.remove('d-none');
    document.querySelector('#titleModal').innerHTML ="Resumen";



  })
}



  // funcion para calcular el valor a pagar aproximado a pagar 

  function valorApagar(){
    let tipoGrano= document.getElementById('txtTipo');
    let cantidadSacas= document.getElementById('txtCantidad');
    let pesoSaca= document.getElementById('txtPeso');
    let valorPagar= document.getElementById('txtValorPagar');
    if(funciones.testEntero(cantidadSacas.value)){
      if((cantidadSacas.value !="" || cantidadSacas.value !=0) && pesoSaca.value !="--" && tipoGrano.value !="--" ){
        for (const precio of Pesos) {
          if (precio.peso_saca== pesoSaca.value) {
            if(tipoGrano.value==1){
              valorPagar.value= "$ "+ (parseInt(cantidadSacas.value) * parseFloat(precio.precio_gcorto)).toString();
              InformacionFinal.tipograno="Grano Corto";
              InformacionFinal.totalmostrar="$ "+ (parseInt(cantidadSacas.value) * parseFloat(precio.precio_gcorto)).toString();
            }else if(tipoGrano.value==2) {
              valorPagar.value= "$ "+ (parseInt(cantidadSacas.value) * parseFloat(precio.precio_glargo)).toString();
              InformacionFinal.tipograno="Grano Largo";
              InformacionFinal.totalmostrar="$ "+ (parseInt(cantidadSacas.value) * parseFloat(precio.precio_glargo)).toString();

            }
            InformacionFinal.peso=pesoSaca.value;
            InformacionFinal.cantidad= cantidadSacas.value;
          }
        }
      }else{
        valorPagar.value="";
      }
    }else{
      valorPagar.value="";
    }

  }





  // asgina los valor al resumen final

  function asignarValores(){
    let contenido= document.querySelectorAll('.p');
    contenido[0].textContent= InformacionFinal.fecha;
    contenido[1].textContent= InformacionFinal.horario;
    contenido[2].textContent= InformacionFinal.tipograno;
    contenido[3].textContent= InformacionFinal.cantidad;
    contenido[4].textContent= InformacionFinal.peso;
    contenido[5].textContent= InformacionFinal.totalmostrar;

  }

  // comprobar que esten todos los valores

  function comprobarCamposllenos(){
    let tipoGrano= document.getElementById('txtTipo');
    let cantidadSacas= document.getElementById('txtCantidad');
    let pesoSaca= document.getElementById('txtPeso');
    let valorPagar= document.getElementById('txtValorPagar');
    if(funciones.testEntero(cantidadSacas.value)){
      if((cantidadSacas.value !="" && cantidadSacas.value !=0) && pesoSaca.value !="--" && tipoGrano.value !="--" ){
        return true;
      }else{
        return false;
      }

    }else{
      return false;
    }
  }




// añado eventos para actualizar el valor aproximado a pagar 

  document.getElementById('txtCantidad').addEventListener('keyup', (e)=>{
    // tecla=e.key;
    // if(tecla==1 || tecla==2 || tecla==3 || tecla==4 || tecla==5 
    //   || tecla==6 || tecla==0 || tecla==7 || tecla==8 || tecla==9){
    //     valorApagar();
    //   }
    valorApagar();
  } );
  document.getElementById('txtPeso').addEventListener('change', valorApagar);
  document.getElementById('txtTipo').addEventListener('change', valorApagar)

