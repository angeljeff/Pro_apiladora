$(document).ready(function(){

// referenciando los elementos 
let ojo_1 = document.getElementById('eye_1');
let ojo_2 = document.getElementById('eye_2');

let contrasenia = document.querySelector('.input_password');
let correo = document.querySelector('.input_mail');
let boton_ingresar = document.querySelector('.btn_ingresar');

// DELARACION DE OBJETOS 
var sweetAler = new SwAlerts();


// click en el boton ingresar 

$('.btn_ingresar').click(function(){
    if((correo.value!=null && correo.value!="") && (contrasenia.value!=null && contrasenia.value!="")){
        console.log("correo"+correo.value);
        console.log("contraaa"+contrasenia.value);
        boton_ingresar.setAttribute("type","button");
        opcion="ingresar"
        dato_enviar= {"opcion":opcion,"correo":correo.value,"contrasenia":contrasenia.value};
        $.ajax({
            url : 'ControllerLogin.php',
            type : 'POST',
            data :dato_enviar,
            success : function(res) {
                let data= JSON.parse(res);
                if(data.correcto.trim()=="si"){
                    window.location.href= data.ruta;
                    // faltan cosas

                }else{
                    boton_ingresar.setAttribute("type","submit");
                    sweetAler.error_t("Usuario o contraseña incorrecto", "Sin acceso.!")

                }
            },                               
        });
    }
});




// recuperar contrasenia 

$('.recuperacion').click(function(){
    Swal.fire({
        title: 'Correo electrónico',
        input: 'email',
        background: 'linear-gradient(to right, #38ef7d, #11998e)',
        color:'#0000ff',
        confirmButtonColor:'#1420ff',
        inputLabel: 'Se enviará su nueva contraseña al correo electrónico registrado',
        showCancelButton: true,
        confirmButtonText: 'ok',
        showLoaderOnConfirm: true,
        inputAttributes: {
          autocapitalize: 'off',
          minlength: 5,
          maxlength: 50,
          
        }
        // preConfirm: () => {
        //   },
      }).then((result) => {
        if (result.isConfirmed) {
            opcion="comprobar_email"
            let correo=result.value;
            dato_enviar= {"opcion":opcion,"correo":result.value};
            $.ajax({
                url : 'ControllerLogin.php',
                type : 'POST',
                data :dato_enviar,
                success : function(res) {
                    console.log(res)
                    let data= JSON.parse(res);
                    let op="enviar_contrasenia";
                    if(data.respon.trim()=="si"){
                        let datos= {"opcion":op,"correo":correo};
                        $.ajax({
                            url : 'ControllerLogin.php',
                            type : 'POST',
                            data :datos,
                            success : function(respuesta) {
                                console.log(respuesta)
                                let data= JSON.parse(respuesta);
                                if(data.respon.trim()=="si"){
                                    sweetAler.exito_timer("Revisa tu correo, se ha enviado la nueva contraseña","Contraseña enviada");
                                    // // faltan cosas
                                }else{
    
                                    sweetAler.error_t("Ha ocurrido un error , intenta más tarde", "Error.!")
                
                                }
                            },                               
                        });

    
                    }else{
                        sweetAler.error_t("El correo electrónico ingresado no se encuentra registrado", "Error.!")
    
                    }
                },                               
            });

        }
      }) 

});






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


});
