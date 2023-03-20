$(document).ready(function(){


var myModal = new bootstrap.Modal(document.getElementById('modalPerfil'));
const URL = new Funciones();
var sweetAler = new SwAlerts();
var datosPerfil="";
var codigoModificar="";

function obtener_usuario(){
    let cedula= document.getElementById('valorcedula').value;
    let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    let ajaxUrl = URL.url+'/Profile/ControllerPerfil.php'; 
    let datastr= `cedula=${cedula}&opcion=obtenerdatos`;
    request.open("POST",ajaxUrl,true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(datastr);
    request.onload = function(){
        console.log(request.responseText);
        objData = JSON.parse(request.responseText);
        datosPerfil=objData;
        let iduser= document.getElementById('idUsuuario');
        let nombres_completos = document.getElementById("nombres_completos");
        let cedulaRead= document.getElementById("cedulaRead");
        let celularRead = document.getElementById("celularRead");
        let correoRead = document.getElementById("correoRead");
        iduser.value=objData.data.id_usuario;
        nombres_completos.textContent=`${objData.data.nombres} ${objData.data.apellidos}`;
        cedulaRead.value= cedula;
        celularRead.value= objData.data.celular;
        correoRead.value= objData.data.correo_electronico;


 
    }
}

obtener_usuario();

if(document.getElementById('idModal')){
    document.getElementById('idModal').addEventListener('click', function(){
        document.getElementById('txtNombre').value= datosPerfil.data.nombres;
        document.getElementById('txtApellido').value= datosPerfil.data.apellidos;
        document.getElementById('txtEmail').value= datosPerfil.data.correo_electronico;
        document.getElementById('txtTelefono').value= datosPerfil.data.celular;
        document.getElementById('txtIdentificacion').value= datosPerfil.data.cedula;
        let contenedor= document.getElementById('container_codigo');
        (contenedor.classList.contains('d-flex'))? contenedor.classList.replace('d-flex', 'd-none'): "";
        myModal.show();
    })
}



const nueva =  new Promise((resolve,reject)=>{
    return resolve("hola mundo")


})


nueva.then(datos=> {console.log(datos)})


if(document.getElementById('formUser')){
    let formUser = document.querySelector("#formUser");
    formUser.addEventListener('submit', function(e){
        e.preventDefault();
        
        let nombres= document.getElementById('txtNombre');
        let apellidos= document.getElementById('txtApellido');
        let correo= document.getElementById('txtEmail');
        let celular= document.getElementById('txtTelefono');
        let codigo= document.getElementById('txtcodigo');
        if(nombres.value=="" || apellidos.value=="" || correo=="" || celular.value==""){
            sweetAler.error_normal("Debe llenar los campos "," Error..!");
            return false;

        }else{
            if(codigoModificar != "" && (document.getElementById('container_codigo').classList.contains('d-flex'))){
                if(document.getElementById('txtcodigo').value!= ""){
                    if(document.getElementById('txtcodigo').value.trim() == codigoModificar){
                        let request2 = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                        let ajaxUrl2 = URL.url+'/Profile/ControllerPerfil.php'; 
                        let form2= new FormData(formUser);
                        form2.append('opcion',"ModificarPerfil")
                        form2.append('cedula', datosPerfil.data.cedula )
                        request2.open("POST",ajaxUrl2,true);
                        // request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        request2.send(form2);
                        request2.onload = function(){
                            console.log(request2.responseText);
                            let info= JSON.parse(request2.responseText);
                            if(info.respon.trim()=="si"){
                                myModal.hide();
                                sweetAler.exito_normal("Se han modificados sus datos","Cambios realizados")
                                setTimeout(() => {
                                    window.location.reload();
                                  }, "2500")
                            }else{
                                sweetAler.error_normal(" Ha ocurrido un error intente más tarde ","Error..!")


                            }
        
                        }

                    }else{
                        sweetAler.error_normal(" El código ingresado no coincide ","Error..!")

                    }

                }else{
                    sweetAler.error_normal(" Debe ingresar el código enviado a su correo","Error..!")
                }

                

            }else{
                Swal.fire({
                    icon: 'question',
                    title: "Para actualizar sus datos se le enviará un código al correo electrónico registrado.",
                    showCancelButton: true,
                    confirmButtonText: 'Confirmar'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                        let ajaxUrl = URL.url+'/Profile/ControllerPerfil.php'; 
                        let form= new FormData();
                        form.append("correo", datosPerfil.data.correo_electronico)
                        form.append("opcion", "correoAContrasenia")
                        // let datastr= `cedula=${cedula}&opcion=modificardatos`;
                        request.open("POST",ajaxUrl,true);
                        // request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        request.send(form);
                        request.onload = function(){
                            console.log(request.responseText);
                            let info= JSON.parse(request.responseText);
                            if(info.respon.trim()=="si"){
                                let contenedor= document.getElementById('container_codigo');
                                (contenedor.classList.contains('d-none'))? contenedor.classList.replace('d-none', 'd-flex'): "";
                                codigoModificar=info.codigo;
                            }
    
    
                        }
    
                    }
                  })

            }
            // let prgunta= sweetAler.preguntar("Para actualizar sus datos se le enviará un código al correo electrónico registrado.")

            // if(sweetAler.preguntar("Para actualizar sus datos se le enviará un código al correo electrónico registrado.")){
            //     let contenedor= document.getElementById('container_codigo');
            //     (contenedor.classList.contains('d-none'))? contenedor.classList.replace('d-none', 'd-flex'): "";
            // }

        }

        // if(nombres.value=="" || apellidos.value=="" || correo=="" || celular.value==""){
        //     swal.error_t("hola mundo","siuu");
        //     return false;

        // }

    })

}






});