const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LegalSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },

    Answer: Number,

    Answrer : [{ type: Schema.Types.ObjectId, ref: 'user' }],


});


module.exports = mongoose.model('legal', LegalSchema);