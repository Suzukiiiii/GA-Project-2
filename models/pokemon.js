const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    species:{
        type: String,
        default: '',
    },
});

module.exports = mongoose.model('Pokemon',pokemonSchema);