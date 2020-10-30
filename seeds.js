const mongoose = require('mongoose');
const Trainer = require('./models/trainer');
const Pokemon = require('./models/pokemon');
const mongoURI = 'mongodb://localhost/mongoRelationships';
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('the connection with mongod is established');
  }
);
async function seed() {
  // CREATE TWO Pokemon
  const pokemon1 = await Pokemon.create({
    species: 'blub',
  });
  const pokemon2 = await Pokemon.create({
    species: 'ivy',
  });

  const pokemon3 = await Pokemon.create({
    species: 'venu',
  });
  const pokemon4 = await Pokemon.create({
    species: 'char',
  });

  const pokemon5 = await Pokemon.create({
    species: 'melon',
  });
  const pokemon6 = await Pokemon.create({
    species: 'zard',
  });

 
  // CREATE A NEW FOOD
  const trainer = new Trainer({
    name: 'Quiche',
    pokemon: [],
  });
  // // PUSH THE INGREDIENTS ONTO THE FOOD'S
  // // INGREDIENTS ARRAY
  trainer.pokemon.push(pokemon1);
  trainer.pokemon.push(pokemon2); // associated!
  trainer.pokemon.push(pokemon3);
  trainer.pokemon.push(pokemon4); // associated!
  trainer.pokemon.push(pokemon5);
  trainer.pokemon.push(pokemon6); // associated!
  trainer.save(function (err, savedTrainer) {
    if (err) {
      console.log(err);
    } else {
      console.log('trainer is  ', savedTrainer);
    }
  });
}


seed();