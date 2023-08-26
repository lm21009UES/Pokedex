//Esta clase nos servira para el buscador individual

//Const a emplear
const pokemonInf = document.getElementById('Vista');
const ImagenPoke = document.getElementById('Pokemon');
const Buscar = document.getElementById('busqueda');
const btnBus = document.getElementById('BucarPoke');
const mensaje = document.createElement('p');
//-------------------------------------------------------------
//Objeto Pokemon
const Pokemon = (() =>{
    'use strict'

    // Funcion que sera la encargada de llamar a la API
    function callPokemon(name) {
        //Constante con la url de la APi
        const url = `https://pokeapi.co/api/v2/pokemon/${name}/`;
        // Promesa
        fetch(url)
            .then(data => {
                return data.json();
            })
            .then(dataJSON => {
                console.log(dataJSON);
                MostrarPoke(dataJSON);
            })
            .catch(error => {
                console.error("Error al mostrar:", error);
            });
    }
//-------------------------------------------------------------
    //Funcion que se encargue de mostrar
    function MostrarPoke(data){
        // Vaciando el contenido del contenedor 'pokemonInf'
          pokemonInf.innerHTML = '';
        //Limpiando la pantalla para mostrar una nueva imagen
        ImagenPoke.innerHTML = '';
        //Eliminando las clases css para el cambio de color segun el tipo de pokemon
        pokemonInf.className = '';
//-------------------------------------------------------------
        //Creando los elementos para mostrar los datos
        const h4 = document.createElement('h4');
        const Imagen2 = document.createElement('img');
        const Especie = document.createElement('h6');
        const Peso = document.createElement('h6');
        const Tipo = document.createElement('h6');
        const Habilidades = document.createElement('h6');
        const Estadistica = document.createElement('span');
        const Movimientos = document.createElement('span');
//-------------------------------------------------------------
        //Caracterizticas del pokemon
        h4.textContent = data.name;
        //En esta parte se llaman a los sprites con su respectiva animacion
        /*Imagen.src = `${data.sprites.versions['generation-v']['black-white'].animated.front_default}`;
        Imagen.alt = 'Imagen de ' + data.name;
        Imagen.style= 'width:4rem'*/
        Imagen2.src = `${data.sprites.versions['generation-v']['black-white'].animated.front_default}`;
        Imagen2.alt = 'Imagen de ' + data.name;
        Imagen2.style= 'width:6rem'
        //Informacion Adicional requeridad
        Especie.textContent = 'Altura: ' + data.height;
        Peso.textContent = 'Peso: ' + data.weight;
        //Iterando atraves del arreglo type para acceder a la propiedad buscada
        Tipo.textContent = 'Tipo: ';
        data.types.forEach(type =>{
            Tipo.textContent += type.type.name + ' ';
            //Agregando el color segun el tipo
            pokemonInf.classList.add(type.type.name);
        });
        console.log(Tipo)
        //Para las habilidades, estadisticas y movimientos hacemos lo mismo que antes
        Habilidades.textContent = 'Habilidades: ';
        data.abilities.forEach(ability =>{
            Habilidades.textContent += ability.ability.name +' '
        });
        Estadistica.textContent = 'Estadistica';
        data.stats.forEach(stat => {
            Estadistica.textContent += stat.stat.name +': '+ stat.base_stat + ' ';
        });
        Movimientos.textContent = 'Movimientos: ';
        for (let i = 0; i < 4 && i < data.moves.length; i++) {
            Movimientos.textContent += data.moves[i].move.name + ', ';
        }
        Movimientos.textContent += 'etc';
//-------------------------------------------------------------
        //Agregando los elementos al div destinado para mostrar la informacion
        pokemonInf.appendChild(h4);
        //pokemonInf.appendChild(Imagen);
        pokemonInf.appendChild(Especie);
        pokemonInf.appendChild(Peso);
        pokemonInf.appendChild(Tipo);
        pokemonInf.appendChild(Habilidades);
        pokemonInf.appendChild(Estadistica);
        pokemonInf.appendChild(Movimientos);
        ImagenPoke.appendChild(Imagen2); 
    }
//-------------------------------------------------------------
      // Método para imprimir los datos
      function ImprimirDatos() {
        // Almacenando el valor del pokemon ingresado en una variable
        const pokemonB = Buscar.value.toLowerCase();

        // Validación del ingreso de un pokemon
        if (pokemonB === '') {
            mensaje.innerHTML = "<span>Debe ingresar un nombre</span>";
            // Para que el mensaje se elimine después de 3 segundos
            setTimeout(() => {
                mensaje.innerHTML = "";
            }, 3000);
        } else {
            // Llamamos a la API
            callPokemon(pokemonB);
            //Limpiamos el input
            Buscar.value = '';
        }
    }
    return {
        callPokemon,
        ImprimirDatos
    };
})();
//-------------------------------------------------------------
//Evento encargado de la busqueda
btnBus.addEventListener('click', (e) => {
    e.preventDefault();
    // Llamamos a la función ImprimirDatos directamente
    Pokemon.ImprimirDatos();
});

