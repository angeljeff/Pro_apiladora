 var idMaquinaria="";
// $(document).ready(function() {

    var myModalMaquinaria = new bootstrap.Modal(document.getElementById('modalMaquinaria'));
    let tableMaquinaria; 
    let rowTable = "";
    let funciones = new Funciones();
    let alertas= new SwAlerts();
    
    tableMaquinaria = $('#tableMaquinaria').DataTable({
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
                "url": " "+funciones.url+"Maquinaria/ControllerMaquinaria.php",
                "data": {"opcion":"obtenerMaquinarias"},
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
                {"data":"codigo_maq"},
                {"data":"maquina"},
                {"data":"descripcion_ma"},
                {"data":"estado"},
                {"data":"options"}
            ],
        'dom': 'Bfrtlp',
                'buttons': [
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
            document.querySelector("#formMaquinaria").reset();
            rowTable="";
            idMaquinaria="";
            let header= document.querySelectorAll('.modal-header')
            if(header[0].classList.contains('bg-info')){
                header[0].classList.replace("bg-info", "bg-success");
                document.querySelector('#titleModal').innerHTML ="Nueva Maquinaria";
                document.querySelector('.cerrar-info').classList.replace("cerrar-info", "cerrar-success");
                document.querySelector('#btnText').innerHTML ="Guardar";
                document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-success");
                document.querySelector("#txtCodigo").removeAttribute("readonly");
            
            }
            myModalMaquinaria.show();
            
        })
    }
    
    
    // ------------- consultar si cedula o correo no existen -------------
    function comprobarCodigo(codigo){
        // console.log(cedula)
        console.log(codigo.toUpperCase())
        return new Promise((resolve, reject)=>{
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = funciones.url+"Maquinaria/ControllerMaquinaria.php"; 
            let formData = new FormData();
            formData.append("opcion","consultarCodigo")
            formData.append("codigo",codigo.toUpperCase())
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






    if(document.querySelector("#formMaquinaria")){
        document.querySelector("#btnActionForm").addEventListener('click', function(e){
            e.preventDefault();
            let header= document.querySelectorAll('.headerRegister');
            let formMaquinaria=  document.querySelector("#formMaquinaria");
            let strCodigo = document.querySelector('#txtCodigo').value;
            let strMaquina= document.querySelector('#txtMaquina').value;
            let strDescripcion = document.querySelector('#txtDescripcion').value;
            let strEstado = document.querySelector('#txtEstado').value;
            if(strCodigo == '' || strMaquina == '' || strDescripcion == ''  )
            {
                alertas.error_normal("Todos los campos son obligatorios.","Atención")
                return false;
            }

            if(header[0].classList.contains('bg-success')){
                comprobarCodigo(strCodigo)
                .then((respon)=>{
                    if(respon.respon=="no"){
                        let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                        let ajaxUrl = funciones.url+"Maquinaria/ControllerMaquinaria.php"; 
                        let formData = new FormData(formMaquinaria);
                        formData.append("opcion","guardarMaquinaria")
                        request.open("POST",ajaxUrl,true);
                        request.send(formData);
                        request.onreadystatechange = function(){
                            if(request.readyState == 4 && request.status == 200){
                                console.log(request.responseText);
                                let objData = JSON.parse(request.responseText);
                                if(objData.respon=="si"){
                                    myModalMaquinaria.hide();
                                    alertas.exito_normal(" Se ha registrado la nueva maquinaria","Éxito");
                                    tableMaquinaria.ajax.reload();
                                }
                
                            }
                
                        }

                    }else{
                        alertas.error_normal(" El código ingresado para la nueva maquinaria ya existe ","Error..!");


                    }
                })

            }else{
                // console.log(rowTable.cells[0].textContent)
                let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                let ajaxUrl = funciones.url+"Maquinaria/ControllerMaquinaria.php"; 
                let formDat = new FormData(formMaquinaria);
                formDat.append("opcion","actualizarMaquinaria")
                formDat.append("codigo",rowTable.cells[0].textContent.toString())
                formDat.append("idmaquina",idMaquinaria)
                request.open("POST",ajaxUrl,true);
                request.send(formDat);
                request.onreadystatechange = function(){
                    if(request.readyState == 4 && request.status == 200){
                        console.log(request.responseText);
                        let objData = JSON.parse(request.responseText);
                        if(objData.respon=="si"){
                            myModalMaquinaria.hide();
                            alertas.exito_normal(" Se ha modificado la maquinaria","Éxito");
                            rowTable.cells[1].textContent= strMaquina;
                            rowTable.cells[2].textContent= strDescripcion;
                            rowTable.cells[3].textContent= (strEstado==0)? "Inactivo": "Activo";
                            // tableMaquinaria.ajax.reload();
                        }
        
                    }
        
                }

            }
        })


    }
    
    
    


// let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
// let ajaxUrl = " "+funciones.url+"Maquinaria/ControllerMaquinaria.php";
// request.open("POST",ajaxUrl,true);
// let hola="obtenerMaquinarias";
// request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// request.send(`opcion=${hola}`);
// request.onreadystatechange = function(){

//     if(request.readyState == 4 && request.status == 200){
//         console.log(request.responseText)
//         let objData = JSON.parse(request.responseText);
//         console.log(objData)

//     }
    
// }






    

        // if(document.querySelector("#formCliente")){
        //     let formCliente = document.querySelector("#formCliente");
        //     formCliente.onsubmit = function(e) {
        //         e.preventDefault();
        //         let strIdentificacion = document.querySelector('#txtIdentificacion').value;
        //         let strNombre = document.querySelector('#txtNombre').value;
        //         let strApellido = document.querySelector('#txtApellido').value;
        //         let strEmail = document.querySelector('#txtEmail').value;
        //         let intTelefono = document.querySelector('#txtTelefono').value;
    
        //         if(strIdentificacion == '' || strApellido == '' || strNombre == '' || strEmail == '' || intTelefono == ''   )
        //         {
        //             alertas.error_normal("Todos los campos son obligatorios.","Atención")
        //             return false;
        //         }
        //         if(!validar_cedula(strIdentificacion)){
        //             alertas.error_normal("El número de cédula ingresado no es válido ","Atención")
        //             return false;
        //         }
    
        //         verificar_correo_cedula(strIdentificacion,strEmail)
        //         .then((respon)=>{
                    
        //             if(respon.correoycedula=="si"){
        //                 alertas.error_normal("El número de cédula y el correo electrónico ya se encuentran registrados ","Atención")
        //                 return false;
        //             }else{
        //                 if(respon.solocedula=="si"){
        //                     alertas.error_normal("El número de cédula ya se encuentra registrado","Atención")
        //                     return false;
        //                 }else{
        //                     if(respon.solocorreo=="si"){
        //                         alertas.error_normal("El correo electrónico ya se encuentra registrado","Atención")
        //                         return false;
        //                     }else{
        //                         let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        //                         let ajaxUrl = funciones.url+"Clientes/ControllerClientes.php"; 
        //                         let formData = new FormData(formCliente);
        //                         formData.append("opcion","registrarclienteAdmin")
        //                         request.open("POST",ajaxUrl,true);
        //                         request.send(formData);
        //                         request.onreadystatechange = function(){
        //                             if(request.readyState == 4 && request.status == 200){
        //                                 // console.log(request.responseText);
        //                                 let objData = JSON.parse(request.responseText);
        //                                 if(objData.respon=="si"){
        //                                     myModalCliente.hide();
        //                                     alertas.exito_normal("Cliente registrado exitosamente", "Éxito");
        //                                     tableClientes.ajax.reload();
    
        //                                 }
                                       
                        
        //                             }
                        
        //                         }
    
                                
        //                     }
                            
        //                 }
                        
        //             }
    
        //         })
    
        //     }
        // }
    
 





    
    
    // });


        
    function Editarinfo(element, idmaquinaria){
        document.querySelector("#formMaquinaria").reset();
        rowTable = element.parentNode.parentNode.parentNode;
        idMaquinaria= idmaquinaria;
        let header= document.querySelectorAll('.modal-header')
        if(header[0].classList.contains('bg-success')){
            header[0].classList.replace("bg-success", "bg-info");
            document.querySelector('#titleModal').innerHTML ="Actualizar Maquinaria";
            document.querySelector('.cerrar-success').classList.replace("cerrar-success", "cerrar-info");
            document.querySelector('#btnText').innerHTML ="Actualizar";
            document.querySelector('#btnActionForm').classList.replace("btn-success", "btn-info");
        }
        let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        let ajaxUrl = " "+funciones.url+"Maquinaria/ControllerMaquinaria.php";
        let data= new FormData();
        data.append("opcion", "obtengoUnaMaquinaria");
        data.append("idMaquinaria", idmaquinaria);
        request.open("POST",ajaxUrl,true);
        request.send(data);
        request.onreadystatechange = function(){
    
            if(request.readyState == 4 && request.status == 200){
                console.log(request.responseText);
                let objData = JSON.parse(request.responseText);
                    document.querySelector("#txtCodigo").value = objData.data.codigo_maq;
                    document.querySelector("#txtMaquina").value = objData.data.maquina;
                    document.querySelector("#txtCodigo").setAttribute("readonly", true)
                    document.querySelector("#txtDescripcion").value = objData.data.descripcion_ma;
                    document.querySelector("#txtEstado").value = objData.data.estado_maq;
                    // document.querySelector("#txtTelefono").value = objData.data.telefono;
                    // document.querySelector("#txtEmail").value = objData.data.email_user;
                
            }
            myModalMaquinaria.show();
            
        }
        

        // document.querySelector('.modal-header').classList.replace("headerRegister", "headerUpdate");
        // document.querySelector('#btnActionForm').classList.replace("btn-primary", "btn-info");
    
    
    
    
        // document.querySelector('#btnText').innerHTML ="Actualizar";
        // let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        // let ajaxUrl = base_url+'/Clientes/getCliente/'+idpersona;
        // request.open("GET",ajaxUrl,true);
        // request.send();
        // request.onreadystatechange = function(){
    
        //     if(request.readyState == 4 && request.status == 200){
        //         let objData = JSON.parse(request.responseText);
        //         if(objData.status)
        //         {
        //             document.querySelector("#idUsuario").value = objData.data.idpersona;
        //             document.querySelector("#txtIdentificacion").value = objData.data.identificacion;
        //             document.querySelector("#txtIdentificacion").setAttribute("readonly", true)
        //             document.querySelector("#txtNombre").value = objData.data.nombres;
        //             document.querySelector("#txtApellido").value = objData.data.apellidos;
        //             document.querySelector("#txtTelefono").value = objData.data.telefono;
        //             document.querySelector("#txtEmail").value = objData.data.email_user;
        //         }
        //     }
        //     $('#modalFormCliente').modal('show');
        // }
    }
