const mongoose = require('mongoose');

const choices = new mongoose.Schema({
    cats: {
        type: Number,
        default: 0,
    },
    dogs: { 
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('choices',choices);
