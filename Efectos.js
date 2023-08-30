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
  
//Aca se pograma la funcionalidad del button de regresar al navbar en el index
//Definimos una funcion para regresar al navbar la cual tiene un parametro que es pxPantalla  
function subir(pxPantalla){

  //Evento que se encargara del dezplazamiento
  window.addEventListener('scroll' , () =>{

    //Obtenemos la posicion vertical del desplazamiento y la asignamos a scroll
     let  scroll = document.documentElement.scrollTop;
     // console.log(scroll);

     //const del button
     const buttonSubir = document.getElementById('Regresar');

     //verificamos si la posicion del desplazamiento es mayor que el de pxPantalla
     if(scroll > pxPantalla){
      buttonSubir.style.right = '20px';
     } 
     else{
      //ocultamos el button en caso de que no sea mayor
      buttonSubir.style.right = '-100px';
     }
  }) 
}
//Llamamos a la funcion y le otorgamos un valor
subir(330);
  