const router = require('express').Router();
const Trainer = require('../models/trainer');
const Pokemon = require('../models/pokemon');

// NEW
router.get('/new', async (req, res) => {
  res.render('trainers/new.ejs');
});

// SHOW
router.get('/:id', async (req, res) => {

  let foundPokemon  = await Pokemon.findById(req.params.id);

  res.send(foundPokemon);

});

// CREATE
router.post('/', async (req, res) => {
  console.log(req.body);
  let newTrainer = await Trainer.create(req.body);
  res.redirect(`/trainers/${newTrainer.id}`);
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