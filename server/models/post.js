const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const PostSchema = Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    date: Date
});

PostSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Post', PostSchema);