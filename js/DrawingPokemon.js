const DrawingPokemon = (listaPokemon, option) =>{
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
            else if(listaPokemon[i].types[0].type.name=="ice"){
              //fondo para pokemon tipo water
              card.classList.add("iceD");
            }
            else if(listaPokemon[i].types[0].type.name=="fairy"){
              //fondo para pokemon tipo water
              card.classList.add("fairyD");
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
            const info = document.createElement("div");
            info.setAttribute("id","link");
            info.innerHTML=`
            <div>
              <p>Height: ${(listaPokemon[i].height)*10} cm</p>
            </div>
            <div>
              <p>Weight: ${(listaPokemon[i].weight)/100} kg</p>
            </div>
            <div>
              <p>Abilities: ${(listaPokemon[i].abilities[0].ability.name)}</p>
            </div>`
            // Agregar la imagen, el nombre y el tipo a la tarjeta
            card.appendChild(pokemonImage);
            card.appendChild(pokemonName);
            card.appendChild(pokemonType);
            card.appendChild(info);
            //agregamos la card con tada la informacion al div que se encuntra en el index.html
            carPokemon.appendChild(card);
        }
    }
}

export default DrawingPokemon;