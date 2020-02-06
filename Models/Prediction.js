const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PredictSchema = new Schema({

    predict: {
        type: Number,
        required: true
    },
    answer: {
        type: Number,
        required: true
    },

    legal : { type: Schema.Types.ObjectId, ref: 'legal' },


});


module.exports = mongoose.model('prediction', PredictSchema);