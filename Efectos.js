document.addEventListener("DOMContentLoaded", function () {
   //Consts a emplear 
    const buttonRes = document.querySelector('.navbar-toggler'); //del button
    //del elemento que se despliega en el responsive con las opciones
    const contenedorRes = document.querySelector('.navbar-collapse'); 

 //Evento que se encargara de cerrar el menu del responsive despues de un determinado tiempo
    buttonRes.addEventListener('click', () => {
      // Cerrando el menú después de 2 segundos
      setTimeout(function() {
        contenedorRes.classList.remove("show");
      }, 2000); // Agregado el tiempo (en milisegundos) para el setTimeout
    });
  });
  
  