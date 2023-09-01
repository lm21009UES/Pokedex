const elements = (tem) => {
    //objeto base
    function Pokemon() {
        this.imagen = tem.sprites.versions['generation-v']['black-white'].animated.front_default;
        this.especie = tem.name;
        this.altura = tem.height;
        this.peso = tem.weight;
        this.habilidad = tem.abilities[0].ability.name;
        this.experienciaBase = tem.base_experience;
        this.id = tem.id;
        this.tipo = tem.types[0].type.name;
    }
    //objeto que heredara las caracteristicas del padre
    function PokemonSecond(){
        this.hp = tem.stats[0].base_stat;
        this.Attack = tem.stats[1].base_stat;
        this.Defence = tem.stats[2].base_stat;
        this.SpAttack = tem.stats[3].base_stat;
        this.SpDefence = tem.stats[4].base_stat;
        this.Speed = tem.stats[5].base_stat;
        this.moves = tem.moves;
    }
    //herencia de objetos
    PokemonSecond.prototype = new Pokemon();
    //creacion de objeto
    const Pokemones = new PokemonSecond();
    //retorno de objeto con informacion
    return Pokemones;
}

export default elements;