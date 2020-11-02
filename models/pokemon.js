const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    species:{
        type: String,
        default: '',
    },
    level: {type: Number, default: 1}
});

module.exports = mongoose.model('Pokemon',pokemonSchema);