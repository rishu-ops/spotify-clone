const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    songUrl: {
        type: String,
        required: true
    },
    album: {
        type: String,
    },
    artist: {
        type: String,
        required : true
    },
    language : {
        type: String,
        
    } ,
    category : {
        type: String,
        required : true
    } ,
    
}, { timestamps: true });

const song = mongoose.model('song', songSchema);

module.exports = song;
