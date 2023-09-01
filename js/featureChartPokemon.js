const featureChartPokemon = (card, tem) =>{
          //removemos todas las clases para fondo de las card, ya que cada card se mostrara con un color acorde al tipo de pokemon
          card.classList.remove("cardbug","carddragon","cardelectric","cardfire","cardfighting","cardgrass","cardground","cardghost","cardnormal","cardpoison","cardpsychic","cardrock","cardwater", "cardfairy", "cardice");
          //verificamos el tipo de pokemon y asignamos una clase para fondo
          if(tem.tipo =="bug"){
            //fondo para pokemon tipo bug
            card.classList.add("cardbug");
          }
          else if(tem.tipo=="dragon"){
            //fongo para pokemon tipo dragon
            card.classList.add("carddragon");
          }
          else if(tem.tipo=="electric"){
            //fongo para pokemon tipo electric
            card.classList.add("cardelectric");
          }
          else if(tem.tipo=="fire"){
            //fondo para pokemon tipo fire
            card.classList.add("cardfire");
          }
          else if(tem.tipo == "fighting"){
            //fondo para pokemon tipo fighting
            card.classList.add("cardfighting");
          }
          else if(tem.tipo=="grass"){
            //fongo para pokemon tipo grass
            card.classList.add("cardgrass");
          }
          else if(tem.tipo == "ground"){
            //fondo para pokemon tipo ground
            card.classList.add("cardground");
          }
          else if(tem.tipo=="ghost"){
            //fondo para pokemon tipo ghost
            card.classList.add("cardghost");
          }
          else if(tem.tipo=="normal"){
            //fondo para pokemon tipo normal
            card.classList.add("cardnormal");
          }
          else if(tem.tipo=="poison"){
             //fondo para pokemon tipo poison
            card.classList.add("cardpoison");
          }
          else if(tem.tipo=="psychic"){
            //fondo para pokemon tipo psychic
            card.classList.add("cardpsychic");
          }
          else if(tem.tipo=="rock"){
            //fondo para pokemon tipo rock
            card.classList.add("cardrock");
          }
          else if(tem.tipo=="water"){
            //fondo para pokemon tipo water
            card.classList.add("cardwater");
          }
          else if(tem.tipo=="ice"){
            //fondo para pokemon tipo ice
            card.classList.add("cardice");
          }
          else if(tem.tipo=="fairy"){
            //fondo para pokemon tipo fairy
            card.classList.add("cardfairy");
          }
          //agregamos informacion de la api a la card
          const movesList = tem.moves;
          const movesHTML = movesList.map(move => `<li style="width: 100%"><i class="fa-solid fa-check"></i>${move.move.name}</li>`).join('');
          card.innerHTML = `
                  
          <div class="cardTHeader">
            <i id="salir"><img src="./IMG/boton.png"></i>
          </div>
          <div class="cardTImg">
            <img src="${tem.imagen}" alt="${tem.especie}" id="imgpokemon" style="width: 30%; height: auto;">
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
                    <li style="width: 100%">Especies: ${tem.especie.toUpperCase()}</li>
                    <li style="width: 100%">Height: ${(tem.altura)*10} cm</li>
                    <li style="width: 100%">Weight: ${(tem.peso)/100} kg</li>
                    <li style="width: 100%">Abilities: ${tem.habilidad}</li>
                    <li style="width: 100%">Base Experience: ${tem.experienciaBase}</li>
                    <li style="width: 100%">ID : # ${tem.id} </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="d-none" id="campo">
              <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <ul>
                    <li style="width: 100%">HP: ${tem.hp}</li>
                    <li style="width: 100%"><progress value="${tem.hp}" max="150"></progress></li>
                    <li style="width: 100%">Attack: ${tem.Attack}</li>
                    <li style="width: 100%"><progress value="${tem.Attack}" max="150"></progress></li>
                    <li style="width: 100%">Defence: ${tem.Defence}</li>
                    <li style="width: 100%"><progress value="${tem.Defence}" max="150"></progress></li>
                    <li style="width: 100%">Sp. Atk: ${tem.SpAttack}</li>
                    <li style="width: 100%"><progress value="${tem.SpAttack}" max="150"></progress></li>
                    <li style="width: 100%">Sp. Def: ${tem.SpDefence}</li>
                    <li style="width: 100%"><progress value="${tem.SpDefence}" max="150"></progress></li>
                    <li style="width: 100%">Speed: ${tem.Speed}</li>
                    <li style="width: 100%"><progress value="${tem.Speed}" max="150"></progress></li>
                  </ul>
                </div>
              </div>
              <div>
                <h5>Type</h5>
              </div>
              <div class="row">
                <div class="col-12">
                  <h4>${tem.tipo}</h4>
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
}

export default featureChartPokemon;