const mongoose = require('mongoose');
const Trainer = require('./models/trainer');
const Pokemon = require('./models/pokemon');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ 'Project2';
//const mongoURI = 'mongodb://localhost/mongoRelationships';

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('the connection with mongod is established');
  }
);
async function seed() {
  // CREATE Pokemon
  const pokemon1 = await Pokemon.create({
    species: 'blub',
  });
  const pokemon2 = await Pokemon.create({
    species: 'ivy',
  });

  console.log(pokemon1);
  // const pokemon3 = await Pokemon.create({
  //   species: 'venu',
  // });
  // const pokemon4 = await Pokemon.create({
  //   species: 'char',
  // });

  // const pokemon5 = await Pokemon.create({
  //   species: 'melon',
  // });
  // const pokemon6 = await Pokemon.create({
  //   species: 'zard',
  // });

   const trainer = new Trainer({
    name: 'Suzuki',
    pokemon: [],
  });

  trainer.pokemon.push(pokemon1);
  trainer.pokemon.push(pokemon2);

  console.log(trainer);
  console.log(trainer.pokemon[0].species);
  // trainer.pokemon.push(pokemon3);
  // trainer.pokemon.push(pokemon4);
  // trainer.pokemon.push(pokemon5);
  // trainer.pokemon.push(pokemon6);
  trainer.save(function (err, savedTrainer) {
    if (err) {
      console.log(err);
    } else {
      console.log('trainer is  ', savedTrainer);
    }
  });

}


seed();

