

class Funciones{
    constructor() {
        this.url ='http://localhost:8080/Pro_apiladora/' ;
      }

    validar_caracteres(cadena){
        const minusculas= /[a-z]+/g;
        const mayusculas= /[A-Z]+/g;
        const numeros= /[\d]+/g;
        const caracteres= /[-*/+_?¡=()¿#]+/g;
        const blanco ="#fff";
        const rojo = "#ff0000";
        const anaranjado = "#FA884B";
        const amarillo = "#FCE731";
        const verde = "#00ff02";
        var colores=[blanco, rojo, anaranjado, amarillo, verde];
        let fuerza=0;
        let validaciones= [false,false, false, false, false];
        const texto=["Seguridad", "Baja", "Normal", "Media", "Fuerte"];
        validaciones[0]=minusculas.test(cadena);
        validaciones[1]=mayusculas.test(cadena);
        validaciones[2]=numeros.test(cadena);
        validaciones[3]=caracteres.test(cadena);
        if(cadena.length >=8){validaciones[4]=true};
        validaciones.filter(valor=>{ if(valor)fuerza++});
        const arreglo= [{"valor":fuerza, "color":colores[fuerza-1], "texto":texto[fuerza-1]}];
        return arreglo;




    }

    testEntero(intCant){
        var intCantidad = new RegExp(/^([0-9])*$/);
        if(intCantidad.test(intCant)){
            return true;
        }else{
            return false;
        }
    }
}

