const router = require('express').Router();
const Trainer = require('../models/trainer');
const Pokemon = require('../models/pokemon');

// INDEX
router.get('/', async(req,res)=>{
    let allTrainers = await Trainer.find();
    res.render('trainers/index.ejs',{trainers: allTrainers})
    //res.send(allTrainers);
});

// NEW
router.get('/new', async (req, res) => {
  let allIngredients = await Ingredient.find({});
  res.render('foods/new.ejs', { ingredients: allIngredients });
});

// SHOW
router.get('/:id', async (req, res) => {
  let allIngredients = await Ingredient.find({});

  let foundFood = await Food.findById(req.params.id).populate({
    path: 'ingredients',
    options: { sort: { name: 1 } },
  });

  res.render('foods/show.ejs', {
    food: foundFood,
    ingredients: allIngredients,
  });
});

// CREATE
router.post('/', async (req, res) => {
  console.log(req.body);
  let food = await Food.create(req.body);
  res.redirect(`/foods/${food.id}`);
});

// UPDATE
router.put('/:foodId/ingredients', async (req, res) => {
  let foundFood = await Food.findByIdAndUpdate(
    req.params.foodId,
    {
      $push: {
        ingredients: req.body.ingredients,
      },
    },
    { new: true, upsert: true }
  );
  console.log(foundFood);
  res.redirect(`/foods/${foundFood.id}`);
});

module.exports = router;