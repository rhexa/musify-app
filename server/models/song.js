// Songs
const songs = [
    {
        artist: "Aşık Celali",
        src: "a1.mp3",
        name: "Tombul Memeler",
        img: "celal.jpg",
    },
    {
        artist: "Scandinavianz",
        src: "a2.mp3",
        name: "Panama",
        img: "a2.jpg",
    },
    {
        artist: "Declan",
        src: "a3.mp3",
        name: "All Night",
        img: "a3.jpg",
    },
    {
        artist: "Mountain Man",
        src: "a4.mp3",
        name: "Acustic Love",
        img: "a4.jpg",
    },
    {
        artist: "Ason Id",
        src: "a5.mp3",
        name: "Horizon",
        img: "a5.jpg",
    },
    {
        artist: "Vendredi",
        src: "a6.mp3",
        name: "Hipnosis",
        img: "a6.jpg",
    },
    {
        artist: "Young Blood",
        src: "a7.mp3",
        name: "Energetic Royalty",
        img: "a7.jpg",
    },
    {
        artist: "Hackers Loyalty",
        src: "a8.mp3",
        name: "Retrowave",
        img: "a8.jpg",
    },
    {
        artist: "Broke in Summer",
        src: "a9.mp3",
        name: "Girl on A Date",
        img: "a9.jpg",
    },
    {
        artist: "Laio",
        src: "a10.mp3",
        name: "Back To 1981",
        img: "a10.jpg",
    },
    {
        artist: "Johny Grimes",
        src: "a11.mp3",
        name: "Orbit",
        img: "a11.jpg",
    },
    {
        artist: "Mountain Man",
        src: "a12.mp3",
        name: "Flowers",
        img: "a12.jpg",
    },
    {
        artist: "Dauntaro",
        src: "a13.mp3",
        name: "Something bout",
        img: "a13.jpg",
    },
    {
        artist: "Tubebackr",
        src: "a14.mp3",
        name: "Your Turn",
        img: "a14.jpg",
    },
    {
        artist: "Mountain Man",
        src: "a15.mp3",
        name: "Trees",
        img: "a15.jpg",
    },
    {
        id: "16",
        artist: "Kimochii",
        src: "a16.mp3",
        name: "Mona Wonderlick",
        img: "a16.jpg",
    },
]

class Song {
    construct ( artist, src, name, img ) {
        this.id = idCounter
        this.artist = artist
        this.src = src
        this.name = name,
        this.img = img
    }
}

/**
 * Get all the songs
 * @returns Array of Songs
 */
function getAll () {
    return songs
}

/**
 * Get song by name
 * @param {String} name 
 * @returns 
 */
function getSong (name) {
    return songs.find( song => song.name === name );
}

/**
 * Add a new song to the list
 * @param {Type Song} song 
 * @returns {Type Song}
 */
function addSong (song) {
    songs.push(song)
    return song
}

/**
 * Modify a song
 * @param {Type Song} song 
 * @returns {Type Song}
 */
function updateSong (song) {
    let songIndex = songs.findIndex(s => s.id === song.id)
    songs[songIndex] = song
    return song
}

// delete song by id
function deleteSong (id) {
    let songToDelete = songs.find(song => song.id === id)
    songs = songs.filter(song => song !== songToDelete)
    return songToDelete
}

module.exports = {
    Song,
    getAll,
    getSong,
    addSong,
    updateSong,
    deleteSong
}