const express = require('express');
const router = express.Router();

require('../db/connectDB');
const Song = require('../model/songSchema');

router.get('/', (req, res) => {
    res.status(200).send('Hello from the router');
});

router.post('/upload', async (req, res) => {
    const { title, artist, tempo, link } = req.body;

    if (!title || !link) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    try {
        //FINDS IF THE SONG ALREADY EXISTS IN THE DATABASE
        const songExists = await Song.findOne({ title: title });
        if(songExists) {
            return res.status(422).json({ error: "Song already exists" });
        }
        //SAVES THE SONG TO THE DATABASE
        const song = new Song({title, artist, tempo, link});
        await song.save()
        res.status(201).json({ message: "Song uploaded successfully" });
    } catch (error) {
        console.error(error);
    }
});



module.exports = router;