const router = require('express').Router();
const Trainer = require('../models/trainer');
const Pokemon = require('../models/pokemon');

// SHOW
router.get('/:trainerID/:pokeID', async (req, res) => {
    let foundTrainer = await Trainer.findById(req.params.trainerID);
  let foundPokemon  = await Pokemon.findById(req.params.pokeID);

//   res.send(foundPokemon);
  res.render('pokemon/show.ejs',{
      trainer: foundTrainer,
      pokemon: foundPokemon,
  });

});

// DELETE
router.delete('/:trainerID/:id',(req,res)=>{

    Pokemon.findByIdAndRemove(req.params.id,(err)=>{
        if(err){
            res.send(err);
        }
        else{
            res.redirect('/trainers/'+req.params.trainerID);
        }
        
    });
    
});

module.exports = router;