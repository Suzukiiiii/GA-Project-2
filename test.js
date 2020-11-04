//axios test
const Pokemon = require('./models/pokemon');
const axios = require('axios').default;
const getRandomPokemon = async() =>{
const pokeURL = 'https://pokeapi.co/api/v2/pokemon/'
    const randNum = 5
    axios({
        method: 'get',
        url: pokeURL+randNum
    }).then((response)=>{
        // IN THE .THEN METHOD, PARSE THE JSON RESPONSE OBJECT AND FIND
        // console.log(response.data.name)
        // console.log(response.data.sprites.front_default)
        // console.log(response.data.sprites.back_default)

        const pokemon2 = await Pokemon.create({
            species: response.data.name,
            frontImage: response.data.sprites.front_default,
            backImage: response.data.sprites.back_default
          });
        return pokemon2
    }).catch((error)=>{
        console.log(error);
    });
}

console.log(getRandomPokemon());