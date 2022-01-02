const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ledSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    owner: {
        type: String,
        required: false
    }
}, {    timestamps: true    });