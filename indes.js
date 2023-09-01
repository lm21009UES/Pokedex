import informationCharge from "./js/InformationCharge.js";
import DrawingPokemon from "./js/DrawingPokemon.js";
import featureChartPokemon from "./js/featureChartPokemon.js";
import elements from "./js/BaseObject.js";

// URL base de la API para obtener los primeros 150 Pokémon
const apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=150';
//URL base para pedir los pokemones de manera individual a la API

const apiURLindividual = "https://pokeapi.co/api/v2/pokemon/"

//lista para almacenar los pokemones
let listaPokemon = [];

//objeto principal que contendra metodos publicos y privados
const PokemonEstruc = (() => {
  const _LoadPokemones = async () => {
    try {
      const lista = await informationCharge(apiURLindividual);
      listaPokemon = lista;
    } catch (error) {
      console.error('Hubo un error:', error);
    }
  };

  //creacion de metodo para dibujar los pokemones, inicialmente se pide un parametro que indicara el tipo de pokemones a dibujar
  const _dibujarPokemones = (option) =>{
    DrawingPokemon(listaPokemon, option)
  }

  //creacion del unico metodo publico accesible para ejecutar los metodos privados
  const dibujarPokemon = async (options) => {
    try {
      await _LoadPokemones();
      _dibujarPokemones(options);
    } catch (error) {
      console.error('Hubo un error:', error);
    }
  };

  return {dibujarPokemon};//retornamos lo que realiza el metodo dibujarPokemon
});

//evento que cargara la informacion al iniciar la pagina
document.addEventListener("DOMContentLoaded", () => {
  //llamamos al objeto principal, PokemonEstruc junto con su funcion de dibujarPokemon, con el parametro para mostrar todos los pokemones inicialmente
  PokemonEstruc().dibujarPokemon("Ver todos")//aseguramos que se carguen los datos primero
    .then(() => {
      //cargado los datos, capturamos todas las tarjetas de los pokemones
      const mostrar = document.querySelectorAll(".pokemon-card");
      //recorremos el arreglo que contiene cada tarjeta
      mostrar.forEach(element => {
        //agregamos un evento click a cada tarjeta
        element.addEventListener("click", function() {
          var card = document.querySelector(".cardT");//se captura la tarjeta que servira para mostrar las generalidades del pokemon o card seleccionado
          var mostrando = element.getAttribute('id');//cada tarjeta tiene como id el nombre del pokemon, lo capturamos
          var tem = '';//creamos una variable temporal para capturar el objeto
          listaPokemon.forEach(element => {//recorremos toda la lista de pokemon para encontrarlo
            if(element.name.toLowerCase() == mostrando){//si el pokemon se encuentra en la lista
              tem= element;//la variable temporal guardara esa informacion
            }
          });
          var objeto = elements(tem);
          featureChartPokemon(card, objeto);
        });
      });
    })
    .catch(error => {
      // Manejar errores si ocurren en PokemonEstruc().dibujarPokemon("Ver todos")
      console.error(error);
    });
});

//funcion para vaciar la informacion que se ha cargado en la pagina
const remover = () =>{
  const cards = document.querySelector("#pokemonCards");//seleccionamos el div principal que contiene todas las cards
  cards.innerHTML = "";//eliminamos todo su contenido
}

const list = document.querySelectorAll(".btn-header");//capturamos toda la lista de categorias de pokemones
list.forEach(element => {//con un foreach recorremos toda la lista
  element.addEventListener("click", ()=>{//agregamos evento a cada uno de los botones
    const category = element.getAttribute("id");//captura del id de los botones, contienen el nombre de la categoria
    remover();//eliminamos toda la informacion del div principal
    PokemonEstruc().dibujarPokemon(category)//hacemos que se carguen la informacion nuevamente y se dibujuen los pokemones de la categoria seleccionada
    .then(() => {
      //se seleccionada un vector que contendra todas las card que se estan mostrando
      const mostrar = document.querySelectorAll(".pokemon-card");
      //recorremos el arreglo
      mostrar.forEach(element => {
        //eventro click para cada card
        element.addEventListener("click", function() {
          //captura de card para caracteristicas
          var card = document.querySelector(".cardT");
          var mostrando = element.getAttribute('id');//obtencion del nombre del pokemon de la card
          var tem = '';//variable temporal
          listaPokemon.forEach(element => {//busqueda del pokemon en la lista de informacion
            if(element.name.toLowerCase() == mostrando){
              tem= element;
            }
          });
          var objeto = elements(tem);
          featureChartPokemon(card, objeto);
        });
      });
    })
    .catch(error => {
      // Manejar errores si ocurren en PokemonEstruc().dibujarPokemon("Ver todos")
      console.error(error);
    });
  })
});

// Obtén el formulario de búsqueda y el campo de entrada
const searchForm = document.querySelector('.Buscador');
const searchInput = searchForm.querySelector('input[type="search"]');

// Agrega un evento de escucha para el envío del formulario
searchForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Evita que se envíe el formulario

  const searchTerm = searchInput.value.trim().toLowerCase(); // Obtén el término de búsqueda en minúsculas

  // Busca la tarjeta del Pokémon con el ID correspondiente al término de búsqueda
  const pokemonCard = document.getElementById(searchTerm);

  //Cambiando elcolor segun el tipo de pokemon
  if (pokemonCard) {
    // Si se encuentra la tarjeta, desplázate a ella
    pokemonCard.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Esto hará un desplazamiento suave

    //Definimos una const para buscar el tipo de pokemon en la lista
    const typesPoke = listaPokemon.find( pokemon => pokemon.name.toLowerCase()=== searchTerm)?.types[0].type.name;
    //Verificamos  atraves de un if si se encontro un tipo
    if(typesPoke){
      //Pasamos el nombre a minuscula
      const typeClass = typesPoke.toLowerCase();
      //Agregamos la clase del tipo de pokemon para poder cambiar el color
      pokemonCard.classList.add(typeClass);
      searchInput.value = "";
      // Eliminara el color despues de un determinado tiempo para regresar a su color original
      setTimeout(() => {
        pokemonCard.classList.remove(typeClass); 
      }, 5000);
    }
    //pokemonCard.classList.add("resaltante");
  } else {
    // Si no se encuentra la tarjeta, muestra un mensaje de error o realiza alguna otra acción
    window.alert("No se encuentra el Pokemon");
  }
});