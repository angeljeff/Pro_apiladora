var idTrabajador="";
// $(document).ready(function() {

    var myModalTrabajador = new bootstrap.Modal(document.getElementById('modalTrabajador'));
    let tableTrabajador; 
    let rowTable = "";
    let funciones = new Funciones();
    let alertas= new SwAlerts();
    
    tableTrabajador = $('#tableTrabajador').DataTable({

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
                "url": " "+funciones.url+"Trabajadores/ControllerTrabajador.php",
                "data": {"opcion":"obtenerTrabajadores"},
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
                {"data":"celular"},
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
            document.querySelector("#formTrabajador").reset();
            rowTable="";
            idTrabajador="";
            let header= document.querySelectorAll('.modal-header')
            if(header[0].classList.contains('bg-info')){
                header[0].classList.replace("bg-info", "bg-success");
                document.querySelector('#titleModal').innerHTML ="Nuevo Trabajador";
                document.querySelector('.cerrar-info').classList.replace("cerrar-info", "cerrar-success");
                document.querySelector('#btnText').innerHTML ="Guardar";
                document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-success");
                document.querySelector("#txtIdentificacion").removeAttribute("readonly");
            }

            myModalTrabajador.show();
        })
    }
    
    
    // ------------- consultar si cedula o correo no existen -------------
    function verificar_correo_cedula(cedula, correo){
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
                    // console.log(request.responseText);
                    let objData = JSON.parse(request.responseText);
                    resolve(objData);
                }
            }
        });
    
    }



    function actualizar_estado(idtrabajador, estado){
        return new Promise((resolve, reject)=>{
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = " "+funciones.url+"Trabajadores/ControllerTrabajador.php";
            let data= new FormData();
            data.append("opcion", "cambirEstado");
            data.append("idTrabajador", idtrabajador);
            data.append("estado", estado.toString());
            request.open("POST",ajaxUrl,true);
            request.send(data);
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    // console.log(request.responseText);
                    let objData = JSON.parse(request.responseText);
                    resolve(objData);
                    
                }    
            }
    
    
        });
    
    }




    
    if(document.querySelector("#formTrabajador")){
        document.querySelector("#btnActionForm").addEventListener('click', function(e){
            e.preventDefault();
            let header= document.querySelectorAll('.headerRegister');
            let formTrabajador=  document.querySelector("#formTrabajador");
            let strIdentificacion = document.querySelector('#txtIdentificacion').value;
            let strNombre = document.querySelector('#txtNombre').value;
            let strApellido = document.querySelector('#txtApellido').value;
            let strEmail = document.querySelector('#txtEmail').value;
            let intTelefono = document.querySelector('#txtTelefono').value;
            // let strPassword = document.querySelector('#txtPassword').value;

            if(strIdentificacion == '' || strApellido == '' || strNombre == '' || strEmail == '' || intTelefono == ''   )
            {
                alertas.error_normal("Todos los campos son obligatorios.","Atención")
                return false;
            }
            if(!validar_cedula(strIdentificacion)){
                alertas.error_normal("El número de cédula ingresado no es válido ","Atención")

                return false;
            }

            if(header[0].classList.contains('bg-success')){
                verificar_correo_cedula(strIdentificacion,strEmail)
                .then((respon)=>{
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
                                let ajaxUrl = funciones.url+"Trabajadores/ControllerTrabajador.php"; 
                                let formData = new FormData(formTrabajador);
                                formData.append("opcion","registrarTrabajadorAdmin")
                                request.open("POST",ajaxUrl,true);
                                request.send(formData);
                                request.onreadystatechange = function(){
                                    if(request.readyState == 4 && request.status == 200){
                                        console.log(request.responseText);
                                        let objData = JSON.parse(request.responseText);
                                        if(objData.respon=="si"){
                                            myModalTrabajador.hide();
                                            alertas.exito_normal("Trabajador registrado exitosamente", "Éxito");
                                            tableTrabajador.ajax.reload();
                                        }
                                       
                                    }
                        
                                }          
                            }
                            
                        }
                        
                    }
    
                })

            }else{
                let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                let ajaxUrl = funciones.url+"Trabajadores/ControllerTrabajador.php"; 
                let formDat = new FormData(formTrabajador);
                formDat.append("opcion","actualizarTrabajador")
                formDat.append("cedula",rowTable.cells[0].textContent.toString())
                formDat.append("idTrabajador",idTrabajador)
                request.open("POST",ajaxUrl,true);
                request.send(formDat);
                request.onreadystatechange = function(){
                    if(request.readyState == 4 && request.status == 200){
                        console.log(request.responseText);
                        let objData = JSON.parse(request.responseText);
                        if(objData.respon=="si"){
                            myModalTrabajador.hide();
                            alertas.exito_normal(" Se ha modificado el trabajador","Éxito");
                            rowTable.cells[1].textContent= strNombre+" "+strApellido;
                            rowTable.cells[2].textContent= strEmail;
                            rowTable.cells[3].textContent= intTelefono;
                        }
        
                    }
        
                }

            }
        })

    }
     
    
    
    
    // let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    // let ajaxUrl = " "+funciones.url+"Trabajadores/ControllerTrabajador.php";
    // request.open("POST",ajaxUrl,true);
    // let hola="obtenerTrabajadores";
    // request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // request.send(`opcion=${hola}`);
    // request.onreadystatechange = function(){
    
    //     if(request.readyState == 4 && request.status == 200){
    //         console.log(request.responseText)
    //         let objData = JSON.parse(request.responseText);
    //         console.log(objData)
    
    //     }
        
    // }
    
    
    
    
    
    
    // });


    function Editarinfo(element, idtrabajador){
        document.querySelector("#formTrabajador").reset();
        rowTable = element.parentNode.parentNode.parentNode;

        idTrabajador= idtrabajador;
        let header= document.querySelectorAll('.modal-header')
        if(header[0].classList.contains('bg-success')){
            header[0].classList.replace("bg-success", "bg-info");
            document.querySelector('#titleModal').innerHTML ="Actualizar Trabajador";
            document.querySelector('.cerrar-success').classList.replace("cerrar-success", "cerrar-info");
            document.querySelector('#btnText').innerHTML ="Actualizar";
            document.querySelector('#btnActionForm').classList.replace("btn-success", "btn-info");
        }
        let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        let ajaxUrl = " "+funciones.url+"Trabajadores/ControllerTrabajador.php";
        let data= new FormData();
        data.append("opcion", "obtengoUnTrabajador");
        data.append("idTrabajador", idtrabajador);
        data.append("cedula", rowTable.cells[0].textContent.toString());
        request.open("POST",ajaxUrl,true);
        request.send(data);
        request.onreadystatechange = function(){
    
            if(request.readyState == 4 && request.status == 200){
                // console.log(request.responseText);
                let objData = JSON.parse(request.responseText);
                    document.querySelector("#txtIdentificacion").value = objData.data.cedula;
                    document.querySelector("#txtNombre").value = objData.data.nombres;
                    document.querySelector("#txtIdentificacion").setAttribute("readonly", true)
                    document.querySelector("#txtApellido").value = objData.data.apellidos;
                    document.querySelector("#txtEmail").value = objData.data.correo_electronico;
                    document.querySelector("#txtTelefono").value = objData.data.celular;
                
            }
            myModalTrabajador.show();
            
        }
        
    
    
    }


function CambioEstado(element, idtrabajador){
    let el = element.parentNode.parentNode.parentNode.parentNode;
    if(element.hasAttribute("checked")){
        element.removeAttribute("checked");
        actualizar_estado(idtrabajador,0)
        .then((respon)=>{
            if(respon.respon=="si"){
                alertas.exito_normal("El usuario ha sido inactivado","Éxito.");
                el.cells[4].innerHTML= '<span class="badge bg-danger">Inactivo</span>';
            }
        });

    }else{
        element.setAttribute("checked", true);
        actualizar_estado(idtrabajador,1)
        .then((respon)=>{
            if(respon.respon=="si"){
                alertas.exito_normal("El usuario ha sido Activado","Éxito.");
                el.cells[4].innerHTML= '<span class="badge bg-info">Activo</span>';

            }
        });

    }
    
}