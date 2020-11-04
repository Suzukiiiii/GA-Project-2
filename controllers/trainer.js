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

  //res.send(foundTrainer);
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

// UPDATE
router.put('/:id', async (req, res) => {
    console.log("reached update route");
    res.redirect('/trainers/');
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

// UPDATE
// router.put('/:foodId/ingredients', async (req, res) => {
//   let foundFood = await Food.findByIdAndUpdate(
//     req.params.foodId,
//     {
//       $push: {
//         ingredients: req.body.ingredients,
//       },
//     },
//     { new: true, upsert: true }
//   );
//   console.log(foundFood);
//   res.redirect(`/foods/${foundFood.id}`);
// });

module.exports = router;