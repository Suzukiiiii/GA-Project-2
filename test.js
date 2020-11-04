//axios test

const axios = require('axios').default;
const getRandomPokemon = () =>{
const pokeURL = 'https://pokeapi.co/api/v2/pokemon/'
    const randNum = 5
    axios({
        method: 'get',
        url: pokeURL+randNum
    }).then((response)=>{
        // IN THE .THEN METHOD, PARSE THE JSON RESPONSE OBJECT AND FIND
        console.log(response.data.name)
        console.log(response.data.sprites.front_default)
        console.log(response.data.sprites.back_default)
    }).catch((error)=>{
        console.log(error);
    });
}

getRandomPokemon();