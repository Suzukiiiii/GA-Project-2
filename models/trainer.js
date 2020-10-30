const mongoose = require('mongoose');


const trainerSchema = new mongoose.Schema({
    name:{
        type: String,
        default: '',
    },
    pokemon: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Pokemon',
        }],
        validate: {
            validator: (v)=>{return v.length<=6}, message: 'Max number of pokemon is 6'
        }
    }
});

module.exports = mongoose.model('Trainer',trainerSchema);


// tags: {
//     type: [String],
//     validate: {
//         validator: function (v) {
//             return v.length > 1
//         },
//         message: 'You must provide more than 1 tag.'
//     }
// },