// ... otros códigos ...

// URL base de la API para obtener los primeros 150 Pokémon
const apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=150';
// ... otros códigos ...

// Función para mostrar la lista de Pokémon con tarjetas individuales
function showPokemonListWithCards() {
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const pokemonList = data.results;
      const cardContainer = document.getElementById('pokemonCards');

      // Inicializa una fila usando Bootstrap
      let row = document.createElement('div');
      row.classList.add('row');

      // Contador para rastrear las tarjetas en la fila actual
      let cardCount = 0;

      // Para cada Pokémon, realiza una solicitud para obtener su información
      pokemonList.forEach(pokemon => {
        fetch(pokemon.url)
          .then(response => response.json())
          .then(pokemonData => {
            console.log(pokemonData);
            // Crear una columna para la tarjeta usando Bootstrap
            const col = document.createElement('div');
            col.classList.add('col-md-4'); // Divide en 3 columnas en pantallas medianas (Bootstrap)

            const card = document.createElement('div');
            card.classList.add('pokemon-card');
            card.id = pokemonData.name.toLowerCase(); // Establece el ID igual al nombre del Pokémon en minúsculas

            // Crear la imagen del Pokémon
            const pokemonImage = document.createElement('img');
            pokemonImage.src = pokemonData.sprites.front_default;
            pokemonImage.alt = pokemonData.name;
            pokemonImage.classList.add('pokemon-image');

            // Crear el nombre del Pokémon
            const pokemonName = document.createElement('h2');
            pokemonName.textContent = pokemonData.name.toUpperCase();

            // Crear el tipo del Pokémon
            const pokemonType = document.createElement('p');
            pokemonType.textContent = `Type: ${pokemonData.types[0].type.name}`;

            // Agregar la imagen, el nombre y el tipo a la tarjeta
            card.appendChild(pokemonImage);
            card.appendChild(pokemonName);
            card.appendChild(pokemonType);

            // Agregar la tarjeta a la columna
            col.appendChild(card);

            // Agregar la columna a la fila actual
            row.appendChild(col);

            // Incrementa el contador de tarjetas en la fila
            cardCount++;

            // Si hemos agregado 3 tarjetas a la fila actual, crea una nueva fila
            if (cardCount === 3) {
              cardContainer.appendChild(row);
              row = document.createElement('div');
              row.classList.add('row');
              cardCount = 0;
            }
          })
          .catch(error => {
            console.error('Error fetching Pokémon data:', error);
          });
      });

      // Asegúrate de agregar la última fila si no tiene 3 tarjetas
      if (cardCount > 0) {
        cardContainer.appendChild(row);
      }
    })
    .catch(error => {
      console.error('Error fetching Pokémon list:', error);
    });
}

// Llama a la función para mostrar la lista de Pokémon con tarjetas individuales cuando la página se carga
document.addEventListener('DOMContentLoaded', showPokemonListWithCards);

// Obtén el formulario de búsqueda y el campo de entrada
const searchForm = document.querySelector('.Buscador');
const searchInput = searchForm.querySelector('input[type="search"]');

// Agrega un evento de escucha para el envío del formulario
searchForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Evita que se envíe el formulario

  const searchTerm = searchInput.value.trim().toLowerCase(); // Obtén el término de búsqueda en minúsculas

  // Busca la tarjeta del Pokémon con el ID correspondiente al término de búsqueda
  const pokemonCard = document.getElementById(searchTerm);

  if (pokemonCard) {
    // Si se encuentra la tarjeta, desplázate a ella
    pokemonCard.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Esto hará un desplazamiento suave
    pokemonCard.classList.add("resaltante");
    searchInput.value = "";
    setTimeout(() =>{
      pokemonCard.classList.remove('resaltante');
    }, 5000);

  } else {
    // Si no se encuentra la tarjeta, muestra un mensaje de error o realiza alguna otra acción
    window.alert("No se encuentra el Pokemon");
  }
});