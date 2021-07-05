const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    lastname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String
    },
    active: {
        type: Boolean
    },
    avatar: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);