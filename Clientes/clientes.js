
$(document).ready(function() {

var myModalCliente = new bootstrap.Modal(document.getElementById('modalCliente'));
let tableClientes; 
let rowTable = "";
let funciones = new Funciones();
let alertas= new SwAlerts();

tableClientes = $('#tableClientes').DataTable({
    // "language":{
    //     "lengthMenu": "Mostrar _MENU_ registros",
    //     "zeroRecords": "No se encontraron resultados",
    //     "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    //     "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    //     "infoFiltered": "(fitrado de un total de _MAX_ registros)",
    //     "sSearch": "Buscar:",
    //     "oPaginate": {
    //         "sFirst": "Primero",
    //         "sLast": "Último",
    //         "sNext": "Siguiente",
    //         "sPrevius": "Anterior"
    //     },
    //     "sProcessing":"Procesando...",

    // }
    "aProcessing":true,
    "aServerSide":true,
    "language": {

        "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json",
        "oPaginate": {
            "sPrevious": "<",
            "sNext": ">"
            
        }
    },
    "processing": true,
    
        "ajax":{
            "type": "POST",
            "url": " "+funciones.url+"Clientes/ControllerClientes.php",
            "data": {"opcion":"obtenerClientes"},
            "dataSrc": "",
            // success: function(result) {
            //     console.log(result)
            //     jsonResult = JSON.parse(result);
            //     console.log(jsonResult)
            // },
            // error: function (xhr, status, error) {
            //     console.log(error)
            // }

        },
        "columns":[
            {"data":"cedula"},
            {"data":"nombres_completos"},
            {"data":"correo_electronico"},
            {"data":"celular"}
        ],
    'dom': 'Bfrtlp',
            'buttons': [
            // {
            //     "extend": "copyHtml5",
            //     "text": "<i class='far fa-copy'></i> Copiar",
            //     "titleAttr":"Copiar",
            //     "className": "btn btn-secondary"
            // },
            {
                "extend": "excelHtml5",
                "text": "<i class='fas fa-file-excel'></i> Excel",
                "titleAttr":"Esportar a Excel",
                "className": "btn btn-success"
            },{
                "extend": "pdfHtml5",
                "text": "<i class='fas fa-file-pdf'></i> PDF",
                "titleAttr":"Esportar a PDF",
                "className": "btn btn-danger"
            },{
                "extend": "csvHtml5",
                "text": "<i class='fas fa-file-csv'></i> CSV",
                "titleAttr":"Esportar a CSV",
                "className": "btn btn-info"
            }
        ],
        "resonsieve":"true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order":[[0,"desc"]]


});

// abrirModal  ---------------
if(document.getElementById('abrirModal')){
    document.getElementById('abrirModal').addEventListener('click', function(){
        document.querySelector("#formCliente").reset();
        // document.getElementById('txtNombre').value= datosPerfil.data.nombres;
        // document.getElementById('txtApellido').value= datosPerfil.data.apellidos;
        // document.getElementById('txtEmail').value= datosPerfil.data.correo_electronico;
        // document.getElementById('txtTelefono').value= datosPerfil.data.celular;
        // document.getElementById('txtIdentificacion').value= datosPerfil.data.cedula;
        // let contenedor= document.getElementById('container_codigo');
        // (contenedor.classList.contains('d-flex'))? contenedor.classList.replace('d-flex', 'd-none'): "";
        myModalCliente.show();
    })
}


// ------------- consultar si cedula o correo no existen -------------
function verificar_correo_cedula(cedula, correo){
    // console.log(cedula)
    // console.log(correo)
    return new Promise((resolve, reject)=>{
        let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        let ajaxUrl = funciones.url+"Clientes/ControllerClientes.php"; 
        let formData = new FormData();
        formData.append("opcion","consultarCorreoContra")
        formData.append("correo",correo)
        formData.append("cedula",cedula)
        request.open("POST",ajaxUrl,true);
        request.send(formData);
        request.onreadystatechange = function(){
            if(request.readyState == 4 && request.status == 200){
                console.log(request.responseText);
                let objData = JSON.parse(request.responseText);
                resolve(objData);

            }

        }


    });

}








	if(document.querySelector("#formCliente")){
        let formCliente = document.querySelector("#formCliente");
        formCliente.onsubmit = function(e) {
            e.preventDefault();
            let strIdentificacion = document.querySelector('#txtIdentificacion').value;
            let strNombre = document.querySelector('#txtNombre').value;
            let strApellido = document.querySelector('#txtApellido').value;
            let strEmail = document.querySelector('#txtEmail').value;
            let intTelefono = document.querySelector('#txtTelefono').value;
            // let strPassword = document.querySelector('#txtPassword').value;

            if(strIdentificacion == '' || strApellido == '' || strNombre == '' || strEmail == '' || intTelefono == ''   )
            {
                alertas.error_normal("Todos los campos son obligatorios.","Atención")
                // swal("Atención", "Todos los campos son obligatorios." , "error");
                return false;
            }
            if(!validar_cedula(strIdentificacion)){
                alertas.error_normal("El número de cédula ingresado no es válido ","Atención")

                // swal("Atención", "Necesita ingresar una identificación válida." , "error");
                return false;
            }

            verificar_correo_cedula(strIdentificacion,strEmail)
            .then((respon)=>{
                // $arrResponse=array("correoycedula"=>"no","solocorreo"=>"no", "solocedula"=>"no" );
                if(respon.correoycedula=="si"){
                    alertas.error_normal("El número de cédula y el correo electrónico ya se encuentran registrados ","Atención")
                    return false;
                }else{
                    if(respon.solocedula=="si"){
                        alertas.error_normal("El número de cédula ya se encuentra registrado","Atención")
                        return false;
                    }else{
                        if(respon.solocorreo=="si"){
                            alertas.error_normal("El correo electrónico ya se encuentra registrado","Atención")
                            return false;
                        }else{
                            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                            let ajaxUrl = funciones.url+"Clientes/ControllerClientes.php"; 
                            let formData = new FormData(formCliente);
                            formData.append("opcion","registrarclienteAdmin")
                            request.open("POST",ajaxUrl,true);
                            request.send(formData);
                            request.onreadystatechange = function(){
                                if(request.readyState == 4 && request.status == 200){
                                    console.log(request.responseText);
                                    let objData = JSON.parse(request.responseText);
                                    if(objData.respon=="si"){
                                        myModalCliente.hide();
                                        alertas.exito_normal("Cliente registrado exitosamente", "Éxito");
                                        tableClientes.ajax.reload();

                                    }
                                   
                    
                                }
                    
                            }

                            
                        }
                        
                    }
                    
                }

            })

            // let elementsValid = document.getElementsByClassName("valid");
            // for (let i = 0; i < elementsValid.length; i++) { 
            //     if(elementsValid[i].classList.contains('is-invalid')) { 
            //         swal("Atención", "Por favor verifique los campos en rojo." , "error");
            //         return false;
            //     } 
            // } 
            // divLoading.style.display = "flex";
            // let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            // let ajaxUrl = base_url+'/Clientes/setCliente'; 
            // let formData = new FormData(formCliente);
            // request.open("POST",ajaxUrl,true);
            // request.send(formData);
            // request.onreadystatechange = function(){
            //     if(request.readyState == 4 && request.status == 200){
            //         console.log(request.responseText);
            //         let objData = JSON.parse(request.responseText);
            //         if(objData.status)
            //         {
            //             if(rowTable == ""){
            //                 tableClientes.api().ajax.reload();
            //             }else{
            //                rowTable.cells[1].textContent =  strIdentificacion;
            //                rowTable.cells[2].textContent =  strNombre;
            //                rowTable.cells[3].textContent =  strApellido;
            //                rowTable.cells[4].textContent =  strEmail;
            //                rowTable.cells[5].textContent =  intTelefono;
            //                rowTable = "";
            //             }
            //             $('#modalFormCliente').modal("hide");
            //             formCliente.reset();
            //             swal("Usuarios", objData.msg ,"success");
            //         }else{
            //             swal("Error", objData.msg , "error");
            //         }
            //     }
            //     divLoading.style.display = "none";
            //     return false;
            // }
        }
    }

// document.addEventListener('DOMContentLoaded', function(){

//     tableClientes = $('#tableClientes').dataTable( {
//         "aProcessing":true,
//         "aServerSide":true,
//         "language": {
//             "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
//         },
//         // "ajax":{
//         //     "url": " "+base_url+"/Clientes/getClientes",
//         //     "dataSrc":""
//         // },
//         "columns":[
//             // {"data":"idpersona"},
//             // {"data":"identificacion"},
//             // {"data":"nombres"},
//             // {"data":"apellidos"},
//             // {"data":"email_user"},
//             // {"data":"telefono"},
//             // {"data":"options"}
//         ],
//         'dom': 'lBfrtip',
//         'buttons': [
//             {
//                 "extend": "copyHtml5",
//                 "text": "<i class='far fa-copy'></i> Copiar",
//                 "titleAttr":"Copiar",
//                 "className": "btn btn-secondary"
//             },{
//                 "extend": "excelHtml5",
//                 "text": "<i class='fas fa-file-excel'></i> Excel",
//                 "titleAttr":"Esportar a Excel",
//                 "className": "btn btn-success"
//             },{
//                 "extend": "pdfHtml5",
//                 "text": "<i class='fas fa-file-pdf'></i> PDF",
//                 "titleAttr":"Esportar a PDF",
//                 "className": "btn btn-danger"
//             },{
//                 "extend": "csvHtml5",
//                 "text": "<i class='fas fa-file-csv'></i> CSV",
//                 "titleAttr":"Esportar a CSV",
//                 "className": "btn btn-info"
//             }
//         ],
//         "resonsieve":"true",
//         "bDestroy": true,
//         "iDisplayLength": 10,
//         "order":[[0,"desc"]]  
//     });

// 	// if(document.querySelector("#formCliente")){
//     //     let formCliente = document.querySelector("#formCliente");
//     //     formCliente.onsubmit = function(e) {
//     //         e.preventDefault();
//     //         let strIdentificacion = document.querySelector('#txtIdentificacion').value;
//     //         let strNombre = document.querySelector('#txtNombre').value;
//     //         let strApellido = document.querySelector('#txtApellido').value;
//     //         let strEmail = document.querySelector('#txtEmail').value;
//     //         let intTelefono = document.querySelector('#txtTelefono').value;
//     //         let strPassword = document.querySelector('#txtPassword').value;

//     //         if(strIdentificacion == '' || strApellido == '' || strNombre == '' || strEmail == '' || intTelefono == '' || strPassword == ''  )
//     //         {
//     //             swal("Atención", "Todos los campos son obligatorios." , "error");
//     //             return false;
//     //         }
//     //         if(!validar_cedula(strIdentificacion)){
//     //             swal("Atención", "Necesita ingresar una identificación válida." , "error");
//     //             return false;
//     //         }

//     //         let elementsValid = document.getElementsByClassName("valid");
//     //         for (let i = 0; i < elementsValid.length; i++) { 
//     //             if(elementsValid[i].classList.contains('is-invalid')) { 
//     //                 swal("Atención", "Por favor verifique los campos en rojo." , "error");
//     //                 return false;
//     //             } 
//     //         } 
//     //         divLoading.style.display = "flex";
//     //         let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
//     //         let ajaxUrl = base_url+'/Clientes/setCliente'; 
//     //         let formData = new FormData(formCliente);
//     //         request.open("POST",ajaxUrl,true);
//     //         request.send(formData);
//     //         request.onreadystatechange = function(){
//     //             if(request.readyState == 4 && request.status == 200){
//     //                 console.log(request.responseText);
//     //                 let objData = JSON.parse(request.responseText);
//     //                 if(objData.status)
//     //                 {
//     //                     if(rowTable == ""){
//     //                         tableClientes.api().ajax.reload();
//     //                     }else{
//     //                        rowTable.cells[1].textContent =  strIdentificacion;
//     //                        rowTable.cells[2].textContent =  strNombre;
//     //                        rowTable.cells[3].textContent =  strApellido;
//     //                        rowTable.cells[4].textContent =  strEmail;
//     //                        rowTable.cells[5].textContent =  intTelefono;
//     //                        rowTable = "";
//     //                     }
//     //                     $('#modalFormCliente').modal("hide");
//     //                     formCliente.reset();
//     //                     swal("Usuarios", objData.msg ,"success");
//     //                 }else{
//     //                     swal("Error", objData.msg , "error");
//     //                 }
//     //             }
//     //             divLoading.style.display = "none";
//     //             return false;
//     //         }
//     //     }
//     // }


// }, false);


// let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
// let ajaxUrl = " "+funciones.url+"Clientes/ControllerClientes.php";
// request.open("POST",ajaxUrl,true);
// let hola="hola";
// request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// request.send(`opcion=${hola}`);
// request.onreadystatechange = function(){

//     if(request.readyState == 4 && request.status == 200){
//         console.log(request.responseText)
//         let objData = JSON.parse(request.responseText);
//         console.log(objData)

//     }
    
// }






});