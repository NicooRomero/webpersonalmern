const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MenuSchema = Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    }, 
    order: {
        type: Number
    },
    active: {
        type: Boolean
    }
});

module.exports = mongoose.model('Menu', MenuSchema);