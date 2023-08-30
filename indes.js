
// URL base de la API para obtener los primeros 150 Pokémon
const apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=150';
//URL base para pedir los pokemones de manera individual a la API
const apiURLindividual = "https://pokeapi.co/api/v2/pokemon/"
//lista para almacenar los pokemones
let listaPokemon = [];

//objeto principal que contendra metodos publicos y privados
const PokemonEstruc = (() => {
  //reiniciamos la lista de pokemones, cada vez que llamemos la funcion para que contenga los pokemones
  listaPokemon = [];
  //creamos un metodo privado para cargar la informacion de los pokemones
  const _cargarPokemones = async () => {//realizamos un async await
    try {
      const promesas = [];//creamos una variable que nos almacene la informacion temporal de los pokemones
      //utilizamos un for para realizar las 150 peticiones
      for (let index = 1; index <= 150; index++) {
        //teniendo la ulr de la api, solo agregamos el indice para asi pedir uno a uno los pokemones
        const apiUrl = apiURLindividual + index;
        //hacemos la peticion obteniendo la informacion del pokemon i
        const promesa = fetch(apiUrl)
          .then((response) => {
            //si la peticion tine un error, entonces retornamos un mensaje de erorr
            if (!response.ok) {
              throw new Error('No se pudo obtener los datos desde la API');
            }
            //si la peticion corre con exito, retornamos una respuesta en formato json
            return response.json();
          })
          //luego de haber obtenido la repuesta analizamos el objeto que se nos ha sido devuelto
          .then((data) => {
            //agregamos el objeto a nuestra lista que utilizaremos para manejar los pokemones
            listaPokemon.push(data);
          })//en caso de que ocurra un error, retornamos un mensaje
          .catch((error) => {
            console.error(error);
          });
        //manejamos los elementos temporales que nos retornan las promesas realizadas
        promesas.push(promesa);
      }

      // Esperar a que todas las promesas se completen antes de continuar
      await Promise.all(promesas);
    } catch (error) {
      console.error(error);
    }
  };//fin de metodo para pedir la informacion

  //creacion de metodo para dibujar los pokemones, inicialmente se pide un parametro que indicara el tipo de pokemones a dibujar
  const _dibujarPokemones = (option) =>{
    //capturamos el div donde se agregaran las card de cada pokemon
    const carPokemon = document.querySelector("#pokemonCards");
    //una vez que se tenga la lista con toda la informacion de los pokemones, la recorremos con un for
    for(let i = 0; i<listaPokemon.length; i++){
      //analizamos el parametro que se ha pasado en la funcion, si este es ver todos, se mostraran todos los pokemones, de lo contrario
      //se analizara si el tipo de pokemon i coincide con el parametro que estamos pasando a la funcion
      if(option ==="Ver todos" || listaPokemon[i].types[0].type.name === option){
        //si la verifiacion es verdadero, creamos un elemento div
        const card = document.createElement('div');
        //le agregamos una clase pokemon-card que se encuentra con los estilos en el archivo style.css
        card.classList.add('pokemon-card');
        //verificamos el tipo de pokemon y asignamos una clase para fondo
        if(listaPokemon[i].types[0].type.name =="bug"){
          //borde para pokemon tipo bug
          card.classList.add("bugD");
        }
        else if(listaPokemon[i].types[0].type.name=="dragon"){
          //borde para pokemon tipo dragon
          card.classList.add("dragonD");
        }
        else if(listaPokemon[i].types[0].type.name=="electric"){
          //fongo para pokemon tipo electric
          card.classList.add("electricD");
        }
        else if(listaPokemon[i].types[0].type.name=="fire"){
          //fondo para pokemon tipo fire
          card.classList.add("fireD");
        }
        else if(listaPokemon[i].types[0].type.name == "fighting"){
          //fondo para pokemon tipo fighting
          card.classList.add("fightingD");
        }
        else if(listaPokemon[i].types[0].type.name=="grass"){
          //fongo para pokemon tipo grass
          card.classList.add("grassD");
        }
        else if(listaPokemon[i].types[0].type.name == "ground"){
          //fondo para pokemon tipo ground
          card.classList.add("groundD");
        }
        else if(listaPokemon[i].types[0].type.name=="ghost"){
          //fondo para pokemon tipo ghost
          card.classList.add("ghostD");
        }
        else if(listaPokemon[i].types[0].type.name=="normal"){
          //fondo para pokemon tipo normal
          card.classList.add("normalD");
        }
        else if(listaPokemon[i].types[0].type.name=="poison"){
          //fondo para pokemon tipo poison
          card.classList.add("poisonD");
        }
        else if(listaPokemon[i].types[0].type.name=="psychic"){
          //fondo para pokemon tipo psychic
          card.classList.add("psychicD");
        }
        else if(listaPokemon[i].types[0].type.name=="rock"){
          //fondo para pokemon tipo rock
          card.classList.add("rockD");
        }
        else if(listaPokemon[i].types[0].type.name=="water"){
          //fondo para pokemon tipo water
          card.classList.add("waterD");
        }
        card.id = listaPokemon[i].name.toLowerCase(); // Establece el ID igual al  nombre del Pokémon en minúsculas
        // Crear la imagen del Pokémon
        const pokemonImage = document.createElement('img');
        pokemonImage.src = listaPokemon[i].sprites.front_default;//agrega un sprite proporcionado por la API
        pokemonImage.alt = listaPokemon[0].name;//se le asigna un alt para personas no vidente
        pokemonImage.classList.add('pokemon-image');//agregamos una clase personalizada para las imagenes en las card
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
        //agregamos la card con tada la informacion al div que se encuntra en el index.html
        carPokemon.appendChild(card);
      }
    }
  }

  //creacion del unico metodo publico accesible para ejecutar los metodos privados
  const dibujarPokemon = async (options) => {//utilizamos una funcion async await, ya que el primer metodo para pedir datos es asincrono,
    //que llevaria tiempo realizarla, de esta manera se asegura que los datos se carguen primeramente
    await _cargarPokemones();//se cargan los datos en la lista
    _dibujarPokemones(options);//se dibuja los pokemones de acuerdo al parametro que se ha especificado
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
          //removemos todas las clases para fondo de las card, ya que cada card se mostrara con un color acorde al tipo de pokemon
          card.classList.remove("cardbug","carddragon","cardelectric","cardfire","cardfighting","cardgrass","cardground","cardghost","cardnormal","cardpoison","cardpsychic","cardrock","cardwater");
          //verificamos el tipo de pokemon y asignamos una clase para fondo
          if(tem.types[0].type.name =="bug"){
            //fondo para pokemon tipo bug
            card.classList.add("cardbug");
          }
          else if(tem.types[0].type.name=="dragon"){
            //fongo para pokemon tipo dragon
            card.classList.add("carddragon");
          }
          else if(tem.types[0].type.name=="electric"){
            //fongo para pokemon tipo electric
            card.classList.add("cardelectric");
          }
          else if(tem.types[0].type.name=="fire"){
            //fondo para pokemon tipo fire
            card.classList.add("cardfire");
          }
          else if(tem.types[0].type.name == "fighting"){
            //fondo para pokemon tipo fighting
            card.classList.add("cardfighting");
          }
          else if(tem.types[0].type.name=="grass"){
            //fongo para pokemon tipo grass
            card.classList.add("cardgrass");
          }
          else if(tem.types[0].type.name == "ground"){
            //fondo para pokemon tipo ground
            card.classList.add("cardground");
          }
          else if(tem.types[0].type.name=="ghost"){
            //fondo para pokemon tipo ghost
            card.classList.add("cardghost");
          }
          else if(tem.types[0].type.name=="normal"){
            //fondo para pokemon tipo normal
            card.classList.add("cardnormal");
          }
          else if(tem.types[0].type.name=="poison"){
             //fondo para pokemon tipo poison
            card.classList.add("cardpoison");
          }
          else if(tem.types[0].type.name=="psychic"){
            //fondo para pokemon tipo psychic
            card.classList.add("cardpsychic");
          }
          else if(tem.types[0].type.name=="rock"){
            //fondo para pokemon tipo rock
            card.classList.add("cardrock");
          }
          else if(tem.types[0].type.name=="water"){
            //fondo para pokemon tipo water
            card.classList.add("cardwater");
          }
          //agregamos informacion de la api a la card
          const movesList = tem.moves;
          const movesHTML = movesList.map(move => `<li style="width: 100%"><i class="fa-solid fa-check"></i>${move.move.name}</li>`).join('');
          card.innerHTML = `
                  
          <div class="cardTHeader">
            <i id="salir"><img src="./IMG/boton.png"></i>
          </div>
          <div class="cardTImg">
            <img src="${tem.sprites.versions['generation-v']['black-white'].animated.front_default}" alt="${tem.name}" id="imgpokemon" style="width: 30%; height: auto;">
          </div>
          <div class="cardTNav">
            <ul class="nav nav-tabs card-header-tabs">
              <li class="nav-item">
                <a class="nav-link active">About</a>
              </li>
            </ul>
            <ul class="nav nav-tabs card-header-tabs">
              <li class="nav-item">
                <a class="nav-link">Base Stats</a>
              </li>
            </ul>
            <ul class="nav nav-tabs card-header-tabs">
              <li class="nav-item">
                <a class="nav-link">moves</a>
              </li>
            </ul>
          </div>
          <div class="cardTBody">
            <div id="campo">
              <div class="row">
                <div class="col">
                  <ul>
                    <li style="width: 100%">Especies: ${tem.name.toUpperCase()}</li>
                    <li style="width: 100%">Height: ${(tem.height)*10} cm</li>
                    <li style="width: 100%">Weight: ${(tem.weight)/100} kg</li>
                    <li style="width: 100%">Abilities: ${tem.abilities[0].ability.name}</li>
                    <li style="width: 100%">Base Experience: ${tem.base_experience}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="d-none" id="campo">
              <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <ul>
                    <li style="width: 100%">HP: ${tem.stats[0].base_stat}</li>
                    <li style="width: 100%"><progress value="${tem.stats[0].base_stat}" max="150"></progress></li>
                    <li style="width: 100%">Attack: ${tem.stats[1].base_stat}</li>
                    <li style="width: 100%"><progress value="${tem.stats[1].base_stat}" max="150"></progress></li>
                    <li style="width: 100%">Defence: ${tem.stats[2].base_stat}</li>
                    <li style="width: 100%"><progress value="${tem.stats[2].base_stat}" max="150"></progress></li>
                    <li style="width: 100%">Sp. Atk: ${tem.stats[3].base_stat}</li>
                    <li style="width: 100%"><progress value="${tem.stats[3].base_stat}" max="150"></progress></li>
                    <li style="width: 100%">Sp. Def: ${tem.stats[4].base_stat}</li>
                    <li style="width: 100%"><progress value="${tem.stats[4].base_stat}" max="150"></progress></li>
                    <li style="width: 100%">Speed: ${tem.stats[5].base_stat}</li>
                    <li style="width: 100%"><progress value="${tem.stats[5].base_stat}" max="150"></progress></li>
                  </ul>
                </div>
              </div>
              <div>
                <h5>Type</h5>
              </div>
              <div class="row">
                <div class="col-12">
                  <h4>${tem.types[0].type.name}</h4>
                </div>
              </div>
            </div>
            
            <div class="d-none moves-container" id="campo">
              <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <ul id="movesList">
                    ${movesHTML}
                  </ul>
                </div>
              </div>
            </div>
          </div>`;
          //cargada la informacion, la card contiene tres elementos en el nav, lo capturamos
          const generalidad = document.querySelectorAll(".nav-link");
          //secciones que muestran la informacion de acuerdo a la eleccion del nav
          const campos = document.querySelectorAll("#campo");
          //recorremos el arreglo que nos retorna la captura de los elementos del nav,
          generalidad.forEach((element, indice) => {//pasamos como parametro el elemento y el indice del mismo
            element.addEventListener("click", () =>{//agregamos un evento a cada uno
              generalidad.forEach(element => {//eliminamos la clase que pueden contener los elementos del nav
                  element.classList.remove("active")
              });
              //el elemento clickeado le asignamos clase active para dar enfasis
              element.classList.add("active");
              //recorremos el arreglo de los campos, y el indice que capturamos anteriormente servira para saver que campos mostrar
              for (let index = 0; index < campos.length; index++) {
                if(indice===index){//comparamos el indice con la variable index
                  campos[index].classList.remove("d-none");//si son iguales removemos la clase que mantiene oculta la informacion
                }
                else{
                  campos[index].classList.add("d-none");//los elmentos diferentes al indice seran ocultos
                }
              }
            })
          });
          // Muestra la tarjeta con una transición de opacidad
          card.style.display = "block";
          setTimeout(function() {
            card.style.opacity = "1"; // Hace que la tarjeta sea visible
          }, 10); // Se necesita un pequeño retraso para que la transición funcione correctamente
          const salir = document.querySelector("#salir");
          salir.addEventListener("click", () =>{
          var card = document.querySelector(".cardT");
        
          // Oculta la tarjeta con una transición de opacidad
          card.style.opacity = "0"; // Hace que la tarjeta sea invisible
          setTimeout(function() {
            card.style.display = "none";
          }, 500); // Espera a que termine la transición y luego oculta la tarjeta
          
        })
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
          //removemos clases para fondo de tarjetas
          card.classList.remove("cardbug","carddragon","cardelectric","cardfire","cardfighting","cardgrass","cardground","cardghost","cardnormal","cardpoison","cardpsychic","cardrock","cardwater");
          //verificamos el tipo de pokemon y asignamos un background acorde a la categoria
          if(tem.types[0].type.name =="bug"){
            
            card.classList.add("cardbug");
          }
          else if(tem.types[0].type.name=="dragon"){
            card.classList.add("carddragon");
          }
          else if(tem.types[0].type.name=="electric"){
            card.classList.add("cardelectric");
          }
          else if(tem.types[0].type.name=="fire"){
            card.classList.add("cardfire");
          }
          else if(tem.types[0].type.name == "fighting"){
            card.classList.add("cardfighting");
          }
          else if(tem.types[0].type.name=="grass"){
            card.classList.add("cardgrass");
          }
          else if(tem.types[0].type.name == "ground"){
            card.classList.add("cardground");
          }
          else if(tem.types[0].type.name=="ghost"){
            card.classList.add("cardghost");
          }
          else if(tem.types[0].type.name=="normal"){
            card.classList.add("cardnormal");
          }
          else if(tem.types[0].type.name=="poison"){
            card.classList.add("cardpoison");
          }
          else if(tem.types[0].type.name=="psychic"){
            card.classList.add("cardpsychic");
          }
          else if(tem.types[0].type.name=="rock"){
            card.classList.add("cardrock");
          }
          else if(tem.types[0].type.name=="water"){
            card.classList.add("cardwater");
          }
          //agregamos informacion de la api a la card
          const movesList = tem.moves;
          const movesHTML = movesList.map(move => `<li style="width: 100%"><i class="fa-solid fa-check"></i>${move.move.name}</li>`).join('');
          card.innerHTML = `
                  
          <div class="cardTHeader">
            <i id="salir"><img src="./IMG/boton.png"></i>
          </div>
          <div class="cardTImg">
            <img src="${tem.sprites.versions['generation-v']['black-white'].animated.front_default}" alt="${tem.name}" id="imgpokemon" style="width: 30%; height: auto;">
          </div>
          <div class="cardTNav">
            <ul class="nav nav-tabs card-header-tabs">
              <li class="nav-item">
                <a class="nav-link active">About</a>
              </li>
            </ul>
            <ul class="nav nav-tabs card-header-tabs">
              <li class="nav-item">
                <a class="nav-link">Base Stats</a>
              </li>
            </ul>
            <ul class="nav nav-tabs card-header-tabs">
              <li class="nav-item">
                <a class="nav-link">moves</a>
              </li>
            </ul>
          </div>
          <div class="cardTBody">
            <div id="campo">
              <div class="row">
                <div class="col">
                  <ul>
                    <li style="width: 100%">Especies: ${tem.name.toUpperCase()}</li>
                    <li style="width: 100%">Height: ${(tem.height)*10} cm</li>
                    <li style="width: 100%">Weight: ${(tem.weight)/100} kg</li>
                    <li style="width: 100%">Abilities: ${tem.abilities[0].ability.name}</li>
                    <li style="width: 100%">Base Experience: ${tem.base_experience}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="d-none" id="campo">
              <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <ul>
                    <li style="width: 100%">HP: ${tem.stats[0].base_stat}</li>
                    <li style="width: 100%"><progress value="${tem.stats[0].base_stat}" max="150"></progress></li>
                    <li style="width: 100%">Attack: ${tem.stats[1].base_stat}</li>
                    <li style="width: 100%"><progress value="${tem.stats[1].base_stat}" max="150"></progress></li>
                    <li style="width: 100%">Defence: ${tem.stats[2].base_stat}</li>
                    <li style="width: 100%"><progress value="${tem.stats[2].base_stat}" max="150"></progress></li>
                    <li style="width: 100%">Sp. Atk: ${tem.stats[3].base_stat}</li>
                    <li style="width: 100%"><progress value="${tem.stats[3].base_stat}" max="150"></progress></li>
                    <li style="width: 100%">Sp. Def: ${tem.stats[4].base_stat}</li>
                    <li style="width: 100%"><progress value="${tem.stats[4].base_stat}" max="150"></progress></li>
                    <li style="width: 100%">Speed: ${tem.stats[5].base_stat}</li>
                    <li style="width: 100%"><progress value="${tem.stats[5].base_stat}" max="150"></progress></li>
                  </ul>
                </div>
              </div>
              <div>
                <h5>Type</h5>
              </div>
              <div class="row">
                <div class="col-12">
                  <h4>${tem.types[0].type.name}</h4>
                </div>
              </div>
            </div>
            
            <div class="d-none moves-container" id="campo">
              <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <ul id="movesList">
                    ${movesHTML}
                  </ul>
                </div>
              </div>
            </div>
          </div>`;
          //opciones del navbar de la tarjeta de caracteristicas
          const generalidad = document.querySelectorAll(".nav-link");
          //partes donde se encuntra almacenada las caracteristicas
          const campos = document.querySelectorAll("#campo");
          generalidad.forEach((element, indice) => {//recorremos el arreglo de elementos del nav y capturamos el indice
            element.addEventListener("click", () =>{
              generalidad.forEach(element => {//removemos el estado activo de algun elemento del nav
                  element.classList.remove("active")
              });
              //el elemento que ha sido clickeado se resalta para mostrar el click
              element.classList.add("active");
              for (let index = 0; index < campos.length; index++) {//mostramos la seccion acorde al indice que se ha capturado
                if(indice===index){
                  campos[index].classList.remove("d-none");//mostramos informacion
                }
                else{
                  campos[index].classList.add("d-none");//se oculta campos que no tengan el mismo indice
                }
              }
            })
          });
          // Muestra la tarjeta con una transición de opacidad
          card.style.display = "block";
          setTimeout(function() {
            card.style.opacity = "1"; // Hace que la tarjeta sea visible
          }, 10); // Se necesita un pequeño retraso para que la transición funcione correctamente
          const salir = document.querySelector("#salir");
          salir.addEventListener("click", () =>{
          var card = document.querySelector(".cardT");
        
          // Oculta la tarjeta con una transición de opacidad
          card.style.opacity = "0"; // Hace que la tarjeta sea invisible
          setTimeout(function() {
            card.style.display = "none";
          }, 500); // Espera a que termine la transición y luego oculta la tarjeta
        })
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

