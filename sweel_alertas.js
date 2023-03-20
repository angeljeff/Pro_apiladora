

class SwAlerts{
    constructor () {
    }

    error_t(texto,titulo){
        Swal.fire({
            icon: 'error',
            title: titulo,
            text: texto,
            background: 'linear-gradient(to right, #38ef7d, #11998e)',
            color:'#0000ff',
            confirmButtonColor:'#1420ff',
          });

    }

    error_normal(texto,titulo){
        Swal.fire({
            icon: 'error',
            title: titulo,
            text: texto,
            color:'#0000ff',
            confirmButtonColor:'#1420ff'
          })

    }

    exito_timer(texto,titulo){
        Swal.fire({
            icon: 'success',
            title: titulo,
            text: texto,
            background: 'linear-gradient(to right, #38ef7d, #11998e)',
            color:'#0000ff',
            // confirmButtonColor:'#1420ff',
            showConfirmButton: false,
            timer: 2500
          });

    }

    exito_normal(texto,titulo){
      Swal.fire({
          icon: 'success',
          title: titulo,
          text: texto,
          color:'#0000ff',
          // confirmButtonColor:'#1420ff',
          showConfirmButton: false,
          timer: 2500
        });

  }
    preguntar(titulo){
        Swal.fire({
            icon: 'question',
            title: titulo,
            showCancelButton: true,
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result.isConfirmed) {
              return true;
            } else  {
              return false;
            }
          })
    }

}