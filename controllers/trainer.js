const axios = require('axios').default;
const router = require('express').Router();
const Trainer = require('../models/trainer');
const Pokemon = require('../models/pokemon');

// INDEX
router.get('/', async(req,res)=>{
    let allTrainers = await Trainer.find();
    res.render('trainers/index.ejs',{trainers: allTrainers})
});

// NEW
router.get('/new', async (req, res) => {
  res.render('trainers/new.ejs'); 
});

// EDIT
router.get('/:id/edit', async (req, res) => {
    let foundTrainer = await Trainer.findById(req.params.id).populate({
        path: 'pokemon',
        options: { sort: { ['name']: 1 } },
      });
    
      res.render('trainers/edit.ejs',{
        trainer: foundTrainer,
    });
});

// SHOW
router.get('/:id', async (req, res) => {

  let foundTrainer = await Trainer.findById(req.params.id).populate({
    path: 'pokemon',
    options: { sort: { ['name']: 1 } },
  });

  res.render('trainers/show.ejs', {
    trainer: foundTrainer,
  });
});

// CREATE
router.post('/', async (req, res) => {
  console.log(req.body);
  let newTrainer = await Trainer.create(req.body);
  res.redirect(`/trainers/${newTrainer.id}`);
});

// helper function to return data from pokeAPI
const getFromPokemonAPI = async(pokeURL)=>{
    try {
        return await axios.get(pokeURL)
      } catch (error) {
        console.error(error)
      }
};

// CATCH POKEMON
router.put('/:id/catch',async(req,res)=>{
    console.log("create pokemon route");

    // let foundTrainer = await Trainer.findById(req.params.id).populate({
    //     path: 'pokemon',
    //     options: { sort: { ['name']: 1 } },
    //   });

    const pokeURL = 'https://pokeapi.co/api/v2/pokemon/';
    const randNum = 1+Math.floor(Math.random() * Math.floor(151)); // between 1 and 150
    const poke = await getFromPokemonAPI(pokeURL+randNum);
    
    const newPoke = await Pokemon.create({
        species: poke.data.name,
        frontImage:poke.data.sprites.front_default,
        backImage: poke.data.sprites.back_default,
    });

    await Trainer.findByIdAndUpdate(req.params.id,
    {
        $push: {pokemon: newPoke}
    },(err,updatedTrainer)=>{
        if(err){
            res.send(err);
        }
        else{
            res.redirect('/trainers/'+req.params.id);
        }
    });

});

// UPDATE
router.put('/:id', async (req, res) => {
    console.log("reached update route");
    console.log(req.body);
    Trainer.findByIdAndUpdate(req.params.id,req.body,(err,updatedTrainer)=>{
        if(err){
            res.send(err);
        }
        else{
            res.redirect('/trainers/'+req.params.id);
        }
    });
});

// DELETE
router.delete('/:id',(req,res)=>{

    Trainer.findByIdAndRemove(req.params.id,(err)=>{
        if(err){
            res.send(err);
        }
        else{
            res.redirect('/trainers/');
        }
        
    });
    
});

module.exports = router;