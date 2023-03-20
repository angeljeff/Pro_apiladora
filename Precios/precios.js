var idPrecio="";
// $(document).ready(function() {

    var myModalPrecios = new bootstrap.Modal(document.getElementById('modalPrecios'));
    let tablePrecios; 
    let rowTable = "";
    let funciones = new Funciones();
    let alertas= new SwAlerts();
    
    tablePrecios = $('#tablePrecios').DataTable({
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
                "url": " "+funciones.url+"Precios/ControllerPrecios.php",
                "data": {"opcion":"obtenerPrecios"},
                "dataSrc": "",

    
            },
            "columns":[
                {"data":"id_precio"},
                {"data":"peso_saca"},
                {"data":"precio_gcorto"},
                {"data":"precio_glargo"},
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
            document.querySelector("#formPrecios").reset();
            rowTable="";
            idPrecio="";
            let header= document.querySelectorAll('.modal-header')
            if(header[0].classList.contains('bg-info')){
                header[0].classList.replace("bg-info", "bg-success");
                document.querySelector('#titleModal').innerHTML ="Nuevo Precio";
                document.querySelector('.cerrar-info').classList.replace("cerrar-info", "cerrar-success");
                document.querySelector('#btnText').innerHTML ="Guardar";
                document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-success");
                document.querySelector("#intpeso").removeAttribute("readonly");
            
            }
            myModalPrecios.show();
            
        })
    }
    
    
    // ------------- consultar si cedula o correo no existen -------------
    function comprobarPeso(peso){
        // console.log(cedula)
        // console.log(codigo.toUpperCase())
        return new Promise((resolve, reject)=>{
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = funciones.url+"Precios/ControllerPrecios.php"; 
            let formData = new FormData();
            formData.append("opcion","consultarPeso")
            formData.append("peso",peso)
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






    if(document.querySelector("#formPrecios")){
        document.querySelector("#btnActionForm").addEventListener('click', function(e){
            e.preventDefault();
            let header= document.querySelectorAll('.headerRegister');
            let formPrecios=  document.querySelector("#formPrecios");
            let strpeso = document.querySelector('#intpeso').value;
            let strpreciogc= document.querySelector('#intpreciogc').value;
            let strpreciogl = document.querySelector('#intpreciogl').value;
            // let strEstado = document.querySelector('#txtEstado').value;
            if(strpeso == '' || strpreciogc == '' || strpreciogl == ''  )
            {
                alertas.error_normal("Todos los campos son obligatorios.","Atención")
                return false;
            }

            if(!funciones.testEntero(strpeso)){
                alertas.error_normal("Revisa los datos ingresados tienen que ser números .","Atención")
                return false;
            }

            if(header[0].classList.contains('bg-success')){
                comprobarPeso(strpeso)
                .then((respon)=>{
                    if(respon.respon=="no"){
                        let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                        let ajaxUrl = funciones.url+"Precios/ControllerPrecios.php"; 
                        let formData = new FormData(formPrecios);
                        formData.append("opcion","guardarPrecios")
                        request.open("POST",ajaxUrl,true);
                        request.send(formData);
                        request.onreadystatechange = function(){
                            if(request.readyState == 4 && request.status == 200){
                                console.log(request.responseText);
                                let objData = JSON.parse(request.responseText);
                                if(objData.respon=="si"){
                                    myModalPrecios.hide();
                                    alertas.exito_normal(" Se ha registrado un nuevo precio","Éxito");
                                    tablePrecios.ajax.reload();
                                }
                
                            }
                
                        }

                    }else{
                        alertas.error_normal(" Ya tienes un registro con este peso de Saca, mejor actualiza sus precios ","Error..!");


                    }
                })

            }else{
                // console.log(rowTable.cells[0].textContent)
                let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                let ajaxUrl = funciones.url+"Precios/ControllerPrecios.php"; 
                let formDat = new FormData(formPrecios);
                formDat.append("opcion","actualizarPrecio")
                // formDat.append("codigo",rowTable.cells[0].textContent.toString())
                formDat.append("idprecio",idPrecio)
                request.open("POST",ajaxUrl,true);
                request.send(formDat);
                request.onreadystatechange = function(){
                    if(request.readyState == 4 && request.status == 200){
                        console.log(request.responseText);
                        let objData = JSON.parse(request.responseText);
                        if(objData.respon=="si"){
                            myModalPrecios.hide();
                            alertas.exito_normal(" Se ha modificado correctamente","Éxito");
                            rowTable.cells[2].textContent= "$ "+strpreciogc;
                            rowTable.cells[3].textContent= "$ "+strpreciogl;
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







    




    
    
    // });


        
    function Editarinfo(element, idprecio){
        document.querySelector("#formPrecios").reset();
        rowTable = element.parentNode.parentNode.parentNode;
        idPrecio= idprecio;
        let header= document.querySelectorAll('.modal-header')
        if(header[0].classList.contains('bg-success')){
            header[0].classList.replace("bg-success", "bg-info");
            document.querySelector('#titleModal').innerHTML ="Actualizar Precios";
            document.querySelector('.cerrar-success').classList.replace("cerrar-success", "cerrar-info");
            document.querySelector('#btnText').innerHTML ="Actualizar";
            document.querySelector('#btnActionForm').classList.replace("btn-success", "btn-info");
        }
        let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        let ajaxUrl = " "+funciones.url+"Precios/ControllerPrecios.php";
        let data= new FormData();
        data.append("opcion", "obtengoUnPrecio");
        data.append("idPrecio", idprecio);
        request.open("POST",ajaxUrl,true);
        request.send(data);
        request.onreadystatechange = function(){
            if(request.readyState == 4 && request.status == 200){
                console.log(request.responseText);
                let objData = JSON.parse(request.responseText);
                    document.querySelector("#intpeso").value = objData.data.peso_saca;
                    document.querySelector("#intpreciogc").value = objData.data.precio_gcorto;
                    document.querySelector("#intpeso").setAttribute("readonly", true)
                    document.querySelector("#intpreciogl").value = objData.data.precio_glargo;
                    // document.querySelector("#txtEstado").value = objData.data.estado_maq;
      
                
            }
            myModalPrecios.show();
            
        }
        
    }
