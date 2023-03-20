/**
* PHP Email Form Validation - v3.5
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/

$(document).ready(function(){


 // posición centro del mapa 
 var map = L.map('map').setView([-2.250408, -79.881556],16);


  // DIBUJO EL MAPA
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'maps',
  minZoom: 8,
  maxZoom: 18
  }).addTo(map);

  marker =L.marker([-2.250408, -79.881556]).addTo(map);
  marker.bindPopup("<b>Don Freddy!</b>.").openPopup();





    let boton = document.querySelector('.enviar');


    $('.enviar').click(function(){
        let nombres = document.getElementById('name');
        let asunto = document.getElementById('subject');
        let correo = document.getElementById('email');
        let mensaje = document.getElementById('message');
        let error = document.querySelector('.error-message');
        let exito = document.querySelector('.sent-message');
        console.log(nombres.value,"nombres");

        if((nombres.value!=null && nombres.value!="") && (asunto.value!=null && asunto.value!="")
        && (correo.value!=null && correo.value!="") && (mensaje.value !=null && mensaje.value !="")){
            boton.setAttribute("type","button");
            datos= {"nombres":nombres.value,"correo":correo.value,"cuerpo":mensaje.value,"asunto":asunto.value};
            // datos= {"nombres":"nombres.value","correo":"angeljeff00@gmail.com","cuerpo":"mensaje.value","asunto":"asunto.value"};
            
            $.ajax({
                url : '../Gp/forms/correo.php',
                type : 'POST',
                data :datos,
                success : function(res) {

                    console.log(res);
                    if(res.trim()=="ok"){

                        exito.classList.add('d-block');
                        correo.value="";
                        mensaje.value="";
                        asunto.value="";
                        nombres.value="";
                      } else {
                        let _errorm='Form submission failed and no error message returned from: '
                        error.innerHTML = _errorm+res;
                        error.classList.add('d-block');

                      }
                      boton.setAttribute("type","submit");
                

                },                               
            });
        }
    });




});