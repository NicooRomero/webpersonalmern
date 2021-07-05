const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CursosSchema = Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    img: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Cursos', CursosSchema);