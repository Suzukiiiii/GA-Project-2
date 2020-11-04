//axios test
const Pokemon = require('./models/pokemon');
const axios = require('axios').default;
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ 'Project2';
//const mongoURI = 'mongodb://localhost/mongoRelationships';

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('the connection with mongod is established');
  }
);

const getRandomPokemon = async() =>{
const pokeURL = 'https://pokeapi.co/api/v2/pokemon/'
    const randNum = 5
    // await axios({
    //     method: 'get',
    //     url: pokeURL+randNum
    // }).then((response)=>{
    //     // IN THE .THEN METHOD, PARSE THE JSON RESPONSE OBJECT AND FIND
    //     console.log(response.data);
    //     // console.log(response.data.sprites.front_default)
    //     // console.log(response.data.sprites.back_default)

    //     // const pokemon2 = await Pokemon.create({
    //     //     species: response.data.name,
    //     //     frontImage: response.data.sprites.front_default,
    //     //     backImage: response.data.sprites.back_default
    //     //   });

    //     //  console.log(pokemon2);
    //     //  return pokemon2
    //     return response.data;
    // }).catch((error)=>{
    //     console.log(error);
    // });
    try {
        return await axios.get(pokeURL+randNum)
      } catch (error) {
        console.error(error)
      }

}

const printMon = async () =>{
    const poke2 = await getRandomPokemon();

console.log(poke2.data.name)

 const pokemon2 = await Pokemon.create({
         species: poke2.data.name,
        frontImage: poke2.data.sprites.front_default,
       backImage: poke2.data.sprites.back_default
       });

console.log(pokemon2);
}

printMon();
