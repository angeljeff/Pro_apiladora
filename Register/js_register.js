
$(document).ready(function(){


// seleccion de las clases
let alerta= document.querySelector(".alerta");
let parrafo= document.getElementById("parrafo");
let primer_form= document.querySelector(".pri_cont_mail");
let segundo_form= document.querySelector(".second_cont_codigo");
let boton_ingresar = document.querySelector('.bton_ingresar');
let boton_comprobar = document.querySelector('.btn_comprobar');
let boton_recargar = document.getElementById('recargar');
let i = document.getElementById('i');
let input_correo = document.querySelector('.input_correo');
let segundo_cintenedor = document.querySelector('.segundo_contenedor');
let mos = document.querySelector('.mos');
let ojo_1 = document.getElementById('eye_1');
let ojo_2 = document.getElementById('eye_2');


// formulario de abajo 
let contrasenia = document.querySelector('.inputcontrasenia');
let cedula = document.querySelector('.inputcedula');
let nombres = document.querySelector('.inputnombres');
let apellidos = document.querySelector('.inputapellidos');
let celular = document.querySelector('.inputcelular');
let boton_registrar = document.querySelector('.bton_registrar');
var  arrq;


// referendiando a el div seguridad 
let div_seguridad = document.querySelector('.seguridad');
let  barra_1 = document.querySelector('.barra_1');
let  barra_2 = document.querySelector('.barra_2');
let  barra_3 = document.querySelector('.barra_3');
let  barra_4 = document.querySelector('.barra_4');
let texto_seguridad = document.getElementById('texto_seguridad');

var sweetAler = new SwAlerts();




function enviar_correo(data,valor){
    Swal.showLoading();
    $.ajax({
        // la URL para la petición
        url : 'ControllerRegister.php',
        // especifica si será una petición POST o GET
        type : 'POST',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data :data,
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success : function(arreglo) {
            Swal.close();
            if(arreglo.trim() =='ocupado'){
                sweetAler.error_t("Este correo ya se encuentra registrado","Incorrecto..!!");

            }else{
                console.log(arreglo);
                var _arreglo = JSON.parse(arreglo)
                

                if(valor=="1"){
                    boton_ingresar.setAttribute("type","submit");
                    alerta.classList.remove("esconder");
                    alerta.classList.add('mostrar');
                    parrafo.innerHTML=`Se ha enviado un código al correo <b id="_correo">${_arreglo[0][0]}</b>`;
                    primer_form.style.display= 'none';
                    segundo_form.style.display= 'flex';
                    input_correo.value=_arreglo[0][0];
                    
    
                }else{
                    boton_recargar.setAttribute("type","submit");
                    alerta.classList.remove("esconder");
                    alerta.classList.add('mostrar');
                    parrafo.innerHTML=`Se ha enviado un código al correo <b id="_correo">${_arreglo[0][0]}</b>`;
                }
                $ARR=_arreglo;

            }

        },    
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
    
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
        }
                    
    });

}


// Primer accion para registrar el correo
$('.bton_ingresar').click(function(){ 
    let correo= document.getElementById('pri_email').value;
    if(correo!=null && correo!=""){
        boton_ingresar.setAttribute("type","button");
        opcion="comprobar"
        dato_enviar= {"opcion":opcion,"correo":correo};
        valor="1";
        enviar_correo(dato_enviar,valor);
    }
});


// volver a enviar el codigo

$('#recargar').click(function(){
    let $email=input_correo.value;
    console.log($email);
    if($email!=null && $email!=""){
        boton_recargar.setAttribute("type","button");
        opcion="comprobar"
        dato_enviar= {"opcion":opcion,"correo":$email};
        enviar_correo(dato_enviar,2);
    }

});


// comprobar que el codigo es el correcto
$('.btn_comprobar').click(function(){
    boton_comprobar.setAttribute("type","button");
    let codigo = document.querySelector('.input_code');
    let val= codigo.value;
    if(val !=null && val !=""){
        let comp_email= $ARR[0][0];
        let comp_codigo= $ARR[0][1];
        console.log(comp_codigo);
        if(val==comp_codigo){
            boton_comprobar.disabled= true;
            boton_recargar.disabled= true;
            i.classList.remove("hover");
            i.style.color='#474fe7';
            input_correo.disabled= true;
            codigo.disabled= true;
            boton_comprobar.style.opacity= '0.5';
            boton_comprobar.classList.remove("comprobar");
            segundo_cintenedor.style.display='flex';
            input_correo.value= comp_email;
            setTimeout(() => {
                segundo_cintenedor.classList.add('crecer');
                alerta.classList.remove("mostrar");
                alerta.classList.add('esconder');
            }, 1000);

    
        }
        else{
            sweetAler.error_t("Código ingresado incorrecto","Incorrecto..!!");
    
            
        }
    }

});


// comprobar cedula en directo

$('.inputcedula').keyup(function(){
    valida = validar_cedula(cedula.value);
    if(valida){
        cedula.style.backgroundColor='#11998e';
        cedula.style.outline='2px solid #38ef7d';

    }else{
        cedula.style.backgroundColor='rgba(228,63,90,0.60)';
        cedula.style.outline='2px solid rgb(252, 2, 2)';       
    }
});



// vuelvo a la normalidad el focus de cedula 
cedula.onblur = function(){cedula.style.backgroundColor='#ccc';};




// mostrar texto en contrasenia 
$('.eye').click(function(){
    if((ojo_1.classList.contains('mos'))){
        ojo_1.classList.remove("mos");
        ojo_2.classList.add('mos');
        contrasenia.type = "password";
    }else{
        ojo_1.classList.add('mos');
        ojo_2.classList.remove("mos");
        contrasenia.type = "text";
    }
});


// validar todos los campos correctos para el registro

$('.bton_registrar').click(function(){
    if((nombres.value!=null && nombres.value!="") && (apellidos.value!=null && apellidos.value!="") 
    && (cedula.value!=null && cedula.value!="") && (celular.value!=null && celular.value!="")
    && (contrasenia.value!=null && contrasenia.value!="")){
        boton_registrar.setAttribute("type","button");
        if(valida){
            $.ajax({
                url : 'ControllerRegister.php',
                type : 'POST',
                data :{"opcion":"comprobar_cedula","cedula":cedula.value},
                success : function(res) {
                    if(res.trim()=="si"){
                        sweetAler.error_t("El número de cédula ingresado ya se encuentra registrada","Error..!!");      
                    }else{
                        datos= {"opcion":"registrar","nombres":nombres.value, "apellidos":apellidos.value,
                        "cedula":cedula.value, "celular":celular.value, "contrasenia":contrasenia.value,
                        "correo":$ARR[0][0],"codigo":$ARR[0][1]};
                        $.ajax({
                            url : 'ControllerRegister.php',
                            type : 'POST',
                            data :datos,
                            success : function(respuesta) {
                                console.log(respuesta);
                                if(respuesta.trim()=="si"){
                                    const hol= new Funciones();
                                    window.location.href = hol.url+"login/login.php";
                                }else{
                                    sweetAler.error_t("Algo salió mal en el registro","Error..!!"); 
                                }

                            },    
                            error : function(xhr, status) {

                            },
                        
                            complete : function(xhr, status) {
                            }                            
                        });

                    }
                },    
                error : function(xhr, status) {

                },
            
                complete : function(xhr, status) {

                }                            
            });
            
           
        }else{
            sweetAler.error_t("La cédula ingresada no es válida","Incorrecto..!!");
        }

    }else{
        boton_registrar.setAttribute("type","submit");
    }


});

// campo contrasenia cambiar valor en la seguridad
$('.inputcontrasenia').keyup(function(){

    if((contrasenia.value!=null && contrasenia.value!="")){
        validar_contra = new Funciones();
        let arreglo =validar_contra.validar_caracteres(contrasenia.value);
        if(arreglo[0]['valor']>=2){
            div_seguridad.style.border=`2px solid ${arreglo[0]['color']}`;
            texto_seguridad.innerText=`${arreglo[0]['texto']}`;
            texto_seguridad.style.color=`${arreglo[0]['color']}`;   
        }else{
            div_seguridad.style.border=`2px solid rgb(155, 152, 152)`;
            barra_1.style.backgroundColor=`#fff`;
            barra_2.style.backgroundColor=`#fff`;
            barra_3.style.backgroundColor=`#fff`;
            barra_4.style.backgroundColor=`#fff`;
            texto_seguridad.innerText=`Seguridad`;
            texto_seguridad.style.color=`#000`;
        }

        switch(arreglo[0]['valor']){
            case 2:
                barra_1.style.backgroundColor=`${arreglo[0]['color']}`;
                barra_2.style.backgroundColor=`#fff`;
                barra_3.style.backgroundColor=`#fff`;
                barra_4.style.backgroundColor=`#fff`;
            break;

            case 3:
                barra_1.style.backgroundColor=`${arreglo[0]['color']}`;
                barra_2.style.backgroundColor=`${arreglo[0]['color']}`;
                barra_3.style.backgroundColor=`#fff`;
                barra_4.style.backgroundColor=`#fff`;
            break;

            case 4:
                barra_1.style.backgroundColor=`${arreglo[0]['color']}`;
                barra_2.style.backgroundColor=`${arreglo[0]['color']}`;
                barra_3.style.backgroundColor=`${arreglo[0]['color']}`;
                barra_4.style.backgroundColor=`#fff`;
            break;

            case 5:
                barra_1.style.backgroundColor=`${arreglo[0]['color']}`;
                barra_2.style.backgroundColor=`${arreglo[0]['color']}`;
                barra_3.style.backgroundColor=`${arreglo[0]['color']}`;
                barra_4.style.backgroundColor=`${arreglo[0]['color']}`;
            break;

        };
       
    }else{
        div_seguridad.style.border=`2px solid rgb(155, 152, 152)`;
        barra_1.style.backgroundColor=`#fff`;
        barra_2.style.backgroundColor=`#fff`;
        barra_3.style.backgroundColor=`#fff`;
        barra_4.style.backgroundColor=`#fff`;
        texto_seguridad.innerText=`Seguridad`;
        texto_seguridad.style.color=`#000`;
    }

});




// Cerrar alerta mensaje de código enviado al correo 
    $('#close').click(function(){
        alerta.classList.remove("mostrar");
        alerta.classList.add('esconder');
    });



});






