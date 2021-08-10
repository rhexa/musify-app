const route = require('express').Router();
const songs = require('../models/song')
const Song = songs.Song

// Get all
route.get('/', (req, res) => {
    res.json(songs.getAll())
})

// Get by name
route.get('/:name', (req, res) => {

})

// Add a new song
route.post('/', (req, res) => {

})

// Update a song
route.put('/:id', (req, res) => {

})

// Delete a song by id
route.delete('/:id', (req, res) => {

})

module.exports = route