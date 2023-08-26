// ... otros códigos ...
//Objetos que tendran la informacion de los pokemones
function Pokemon(id, nombre, especie, altura, peso, tipo, habilidades, genero){
  this.id = id;
  this.nombre = nombre
  this.especie = especie;
  this.altura = altura;
  this.peso = peso;
  this.tipo = tipo;
  this.habilidades = habilidades;
  this.genero = genero;
}

function PokemonDescription(id, nombre, especie, altura, peso, tipo, habilidades, genero, grupoHuevos, cicloHuevos){
  Pokemon.call(this,id, nombre, especie, altura, peso, tipo, habilidades, genero);
  this.grupoHuevos = grupoHuevos;
  this.cicloHuevos = cicloHuevos;
}

function PokemonLive(id, nombre, especie, altura, peso, tipo, habilidades, genero, grupoHuevos, cicloHuevos, hp, attack, defender, spAtack, spDefender, Speed, Total){
  PokemonDescription.call(this,id, nombre, especie, altura, peso, tipo, habilidades, genero, grupoHuevos, cicloHuevos);
  this.hp = hp;
  this.attack = attack;
  this.defender = defender;
  this.spAtack = spAtack;
  this.spDefender = spDefender;
  this.Speed = Speed;
  this.Total = Total;
}
// URL base de la API para obtener los primeros 150 Pokémon
const apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=150';
const apiURLindividual = "https://pokeapi.co/api/v2/pokemon/"
//lista para almacenar los pokemones
let listaPokemon = [];
const PokemonEstruc = (() => {
  listaPokemon = [];
  const _cargarPokemones = async () => {
    try {
      const promesas = [];

      for (let index = 1; index <= 150; index++) {
        const apiUrl = apiURLindividual + index;
        const promesa = fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error('No se pudo obtener los datos desde la API');
            }
            return response.json();
          })
          .then((data) => {
            listaPokemon.push(data);
          })
          .catch((error) => {
            console.error(error);
          });

        promesas.push(promesa);
      }

      // Esperar a que todas las promesas se completen antes de continuar
      await Promise.all(promesas);
    } catch (error) {
      console.error(error);
    }
  };
  const _dibujarPokemones = (option) =>{
    const carPokemon = document.querySelector("#pokemonCards");
    for(let i = 0; i<listaPokemon.length; i++){
      if(option ==="Ver todos" || listaPokemon[i].types[0].type.name === option){
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        card.id = listaPokemon[i].name.toLowerCase(); // Establece el ID igual al  nombre del Pokémon en minúsculas
        // Crear la imagen del Pokémon
        const pokemonImage = document.createElement('img');
        pokemonImage.src = listaPokemon[i].sprites.front_default;
        pokemonImage.alt = listaPokemon[0].name;
        pokemonImage.classList.add('pokemon-image');
        // Crear el nombre del Pokémon
        const pokemonName = document.createElement('h2');
        pokemonName.textContent = listaPokemon[i].name.toUpperCase();
        // Crear el tipo del Pokémon
        const pokemonType = document.createElement('p');
        pokemonType.textContent = `${listaPokemon[i].types[0].type.name}`;
        // Agregar la imagen, el nombre y el tipo a la tarjeta
        card.appendChild(pokemonImage);
        card.appendChild(pokemonName);
        card.appendChild(pokemonType);
        carPokemon.appendChild(card);
      }
    }
  }
  const dibujarPokemon = async (options) => {
    await _cargarPokemones();
    _dibujarPokemones(options);
  };

  return {dibujarPokemon};
});

document.addEventListener("DOMContentLoaded", () => {
  PokemonEstruc().dibujarPokemon("Ver todos")
    .then(() => {
      const mostrar = document.querySelectorAll(".pokemon-card");

      mostrar.forEach(element => {
        element.addEventListener("click", function() {
          var card = document.querySelector(".cardT");

          // Muestra la tarjeta con una transición de opacidad
          card.style.display = "block";
          setTimeout(function() {
            card.style.opacity = "1"; // Hace que la tarjeta sea visible
          }, 10); // Se necesita un pequeño retraso para que la transición funcione correctamente
        });
      });
      const salir = document.querySelector("#salir");
      salir.addEventListener("click", () =>{
        var card = document.querySelector(".cardT");

        // Oculta la tarjeta con una transición de opacidad
        card.style.opacity = "0"; // Hace que la tarjeta sea invisible
        setTimeout(function() {
          card.style.display = "none";
        }, 500); // Espera a que termine la transición y luego oculta la tarjeta
      })
    })
    .catch(error => {
      // Manejar errores si ocurren en PokemonEstruc().dibujarPokemon("Ver todos")
      console.error(error);
    });
});


const remover = () =>{
  const cards = document.querySelector("#pokemonCards");
  cards.innerHTML = "";
}

const list = document.querySelectorAll(".btn-header");//capturamos toda la lista de categorias de pokemones
list.forEach(element => {//con un foreach recorremos toda la lista
  element.addEventListener("click", ()=>{//agregamos evento a cada uno de los botones
    const category = element.getAttribute("id");
    // Recarga la página con el nuevo parámetro en la URL
    remover();
    PokemonEstruc().dibujarPokemon(category);
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