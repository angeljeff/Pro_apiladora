var ordenActividad="";
var idActividad="";
var val=0;
    var myModalActividad = new bootstrap.Modal(document.getElementById('modalActividad'));
    var myModalOrdenActividad = new bootstrap.Modal(document.getElementById('modalOrdenActividad'));

    let tableActividades; 
    let rowTable = "";
    let funciones = new Funciones();
    let alertas= new SwAlerts();
    
    tableActividades = $('#tableActividades').DataTable({
        "aProcessing":true,
        "aServerSide":true,
        "ordering": false,
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
                "url": " "+funciones.url+"Actividades/ControllerActividad.php",
                "data": {"opcion":"obtenerActividades"},
                "dataSrc": "",    
            },
            "columns":[
                {"data":"id_actividad"},
                {"data":"nom_actividad"},
                {"data":"desc_actividad"},
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
            document.querySelector("#formActividad").reset();
            rowTable="";
            idActividad="";
            let header= document.querySelectorAll('.modal-header')
            if(header[0].classList.contains('bg-info')){
                header[0].classList.replace("bg-info", "bg-success");
                document.querySelector('#titleModal').innerHTML ="Nueva Actividad";
                document.querySelector('.cerrar-info').classList.replace("cerrar-info", "cerrar-success");
                document.querySelector('#btnText').innerHTML ="Guardar";
                document.querySelector('#btnActionForm').classList.replace("btn-info", "btn-success");
            }
            myModalActividad.show();
            
        })
    }



    if(document.getElementById('abrirModificacion')){
        document.getElementById('abrirModificacion').addEventListener('click', function(){
            document.querySelector("#formOrdenActividad").reset();
            container= document.querySelector('.contenidoActividades');
            container.innerHTML="";
            val++;
            let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            let ajaxUrl = funciones.url+"Actividades/ControllerActividad.php"; 
            let formDat = new FormData();
            formDat.append("opcion","obtenerActividadesOrden")
            request.open("POST",ajaxUrl,true);
            request.send(formDat);
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    console.log(request.responseText);
                    container.innerHTML=request.responseText;
                    if(val==1){
                        Sortable.create(container,{
                            animation: 150,
                            store:{
                                set: sortable =>{
                                    const orden= sortable.toArray();
                                    console.log(orden)
                                    ordenActividad=orden;
                                }
                            }
                            
                        });

                    }


                    myModalOrdenActividad.show();
                    // let objData = JSON.parse(request.responseText);
                    // console.log(objData)

                    
    
                }
    
            }

            // myModalOrdenActividad.show();
            
        })
    }
    


    
    if(document.querySelector("#btnAction")){
        document.querySelector("#btnAction").addEventListener('click', function(e){
            e.preventDefault();
            let arreglo = [];
            if(ordenActividad!=""){
                for(let i=1; i<=ordenActividad.length ; i++){
                    let fila={"id":ordenActividad[i-1] ,
                     "orden":i};
                    arreglo.push(fila)
                }
                let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                let ajaxUrl = funciones.url+"Actividades/ControllerActividad.php"; 
                // let data = ["opcion"="ActualizarActividadesOrden", "data"=arreglo]
                // formDat.append("opcion","ActualizarActividadesOrden")
                request.open("POST",ajaxUrl,true);
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send(`arreglo=${JSON.stringify(arreglo)}&opcion=ActualizarActividadesOrden`);
                request.onreadystatechange = function(){
                    if(request.readyState == 4 && request.status == 200){
                        // console.log(request.responseText);
                        myModalOrdenActividad.hide();
                        alertas.exito_normal("El orden de las actividades ha sido modificado","Correcto.!")

                        
        
                    }
        
                }

            }else{
                myModalOrdenActividad.hide();
                alertas.exito_normal("El orden de las actividades ha sido modificado","Correcto.!")


            }
            



        })
    
    }










    if(document.querySelector("#formActividad")){
        document.querySelector("#btnActionForm").addEventListener('click', function(e){
            e.preventDefault();
            let header= document.querySelectorAll('.headerRegister');
            let formActividad=  document.querySelector("#formActividad");
            let strActividad = document.querySelector('#txtActividad').value;
            let strDescripcion = document.querySelector('#txtDescripcion').value;
            // let strEstado = document.querySelector('#txtEstado').value;
            if(strActividad == '' || strDescripcion == ''  )
            {
                alertas.error_normal("Todos los campos son requeridos.","Atención")
                return false;
            }

            if(header[0].classList.contains('bg-success')){
                // comprobarCodigo(strCodigo)
                // .then((respon)=>{
                //     if(respon.respon=="no"){
                let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                let ajaxUrl = funciones.url+"Actividades/ControllerActividad.php"; 
                let formData = new FormData(formActividad);
                formData.append("opcion","guardarActividad")
                request.open("POST",ajaxUrl,true);
                request.send(formData);
                request.onreadystatechange = function(){
                    if(request.readyState == 4 && request.status == 200){
                        // console.log(request.responseText);
                        let objData = JSON.parse(request.responseText);
                        if(objData.respon=="si"){
                            myModalActividad.hide();
                            alertas.exito_normal(" Se ha registrado la nueva Actividad","Éxito");
                            tableActividades.ajax.reload();
                        }
        
                    }
        
                }

                //     }else{
                //         alertas.error_normal(" El código ingresado para la nueva maquinaria ya existe ","Error..!");


                //     }
                // })

            }else{
                // console.log(rowTable.cells[0].textContent)
                let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                let ajaxUrl = funciones.url+"Actividades/ControllerActividad.php"; 
                let formDat = new FormData(formActividad);
                formDat.append("opcion","actualizarActividad")
                formDat.append("idActividad",rowTable.cells[0].textContent.toString())
                request.open("POST",ajaxUrl,true);
                request.send(formDat);
                request.onreadystatechange = function(){
                    if(request.readyState == 4 && request.status == 200){
                        // console.log(request.responseText);
                        let objData = JSON.parse(request.responseText);
                        if(objData.respon=="si"){
                            myModalActividad.hide();
                            alertas.exito_normal(" Se ha modificado la Actividad","Éxito");
                            rowTable.cells[1].textContent= strActividad;
                            rowTable.cells[2].textContent= strDescripcion;
                        }
        
                    }
        
                }

            }
        })


    }
    
    
        
    function Editarinfo(element, idactividad){
        document.querySelector("#formActividad").reset();
        rowTable = element.parentNode.parentNode.parentNode;
        idActividad= idactividad;
        let header= document.querySelectorAll('.modal-header')
        if(header[0].classList.contains('bg-success')){
            header[0].classList.replace("bg-success", "bg-info");
            document.querySelector('#titleModal').innerHTML ="Actualizar Actividad";
            document.querySelector('.cerrar-success').classList.replace("cerrar-success", "cerrar-info");
            document.querySelector('#btnText').innerHTML ="Actualizar";
            document.querySelector('#btnActionForm').classList.replace("btn-success", "btn-info");
        }
        let request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        let ajaxUrl = " "+funciones.url+"Actividades/ControllerActividad.php";
        let data= new FormData();
        data.append("opcion", "obtengoUnaActividad");
        data.append("idActividad", idactividad);
        request.open("POST",ajaxUrl,true);
        request.send(data);
        request.onreadystatechange = function(){
            if(request.readyState == 4 && request.status == 200){
                // console.log(request.responseText);
                let objData = JSON.parse(request.responseText);
                    document.querySelector("#txtActividad").value = objData.data.nom_actividad;
                    document.querySelector("#txtDescripcion").value = objData.data.desc_actividad;     
            }
            myModalActividad.show();
            
        }
        
    }
