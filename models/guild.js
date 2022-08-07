const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guildSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    classes: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Guild', guildSchema);
