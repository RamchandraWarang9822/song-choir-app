const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: String,
    artist: String ,
    tempo: Number,
    link: String,
});

const Song = mongoose.model('songs', songSchema);

module.exports = Song;