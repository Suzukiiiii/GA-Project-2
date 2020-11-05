const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    species:{
        type: String,
        default: '',
    },
    level: {type: Number, default: 1},
    frontImage:{
        type: String,
        default: '',
    },
    backImage:{
        type: String,
        default: '',
    },
    trainerID:{
        type: String,
        default: '',
    }
});

module.exports = mongoose.model('Pokemon',pokemonSchema);