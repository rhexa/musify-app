const route = require('express').Router();
const songs = require('./songs')

route.use('/songs', songs)

module.exports = route