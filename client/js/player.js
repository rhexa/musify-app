const random = document.querySelector(".random");
const prev = document.querySelector(".prev");
const play = document.querySelector(".play");
const next = document.querySelector(".next");
const replay = document.querySelector(".replay");
const progressBar = document.querySelector(".progress-bar");
const bar = document.querySelector(".bar");
const circle = document.querySelector(".circle");
const counter = document.querySelector(".counter");
const total = document.querySelector(".total");
const volSlider = document.querySelector(".slider");
const volume = document.querySelector(".volume-icon");
const artistInfoBg = document.querySelector(".artist-info-img-wrap img");
const artistImage = document.querySelector(".artist-info-inner-img-wrap img");
const artistName = document.querySelector(".artist-name");
const songName = document.querySelector(".song-name");
const player = document.getElementById("player");
const music = document.getElementById("music");

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
];

let current = 0;
let RANDOM = false;
let PAUSE = false;

// *********FUNCTIONS***********
// to retrieve songs
const endPointURL = require('../env').endPointURL

// set the song informations
function setAudioSong(x) {
  music.src = `${endPointURL}/songs/${x.src}`;
  artistName.textContent = x.artist;
  songName.textContent = x.name;
  artistImage.src = `${endPointURL}/thumbnails/${x.img}`;
  artistInfoBg.src = `${endPointURL}/thumbnails/${x.img}`;
  artistInfoBg.style.background = `url("${endPointURL}/thumbnails/${x.img}") no-repeat center center/cover`;
}

// Play the song
function playAudioSong() {
  player.classList.add("playingrightnow");
  play.firstElementChild.classList.remove("fa-play-circle");
  play.firstElementChild.classList.add("fa-pause-circle");
  music.play();
}

// Pause the song
function pauseAudioSong() {
  player.classList.remove("playingrightnow");
  play.firstElementChild.classList.remove("fa-pause-circle");
  play.firstElementChild.classList.add("fa-play-circle");
  music.pause();
}

// Switch the next song
function nextSong() {
  setAudioSong(songs[checkCurrent(++current)]);
  playAudioSong();
}

// Switch the prev song
function prevSong() {
  setAudioSong(songs[checkCurrent(--current)]);
  playAudioSong();
}

// check the song if the song index is out of the song array's length
// if it's greater than song quantity set it to 0
// if it's less than 0 set it song quantity and return the number
function checkCurrent(x) {
  if (x > songs.length - 1) {
    current = 0;
    return current;
  } else if (x < 0) {
    current = songs.length - 1;
    return current;
  }

  return x;
}

// Calculate the progress bar's width according to song's current time
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const per = (currentTime / duration) * 100;
  bar.style.width = per + "%";
  circle.style.left = per + "%";

  let curmin = Math.floor(currentTime / 60);
  let cursec = Math.floor(currentTime - curmin * 60);
  let durmin = Math.floor(duration / 60);
  let dursec = Math.floor(duration - durmin * 60);
  counter.textContent = check(curmin) + ":" + check(cursec);
  total.textContent = check(durmin) + ":" + check(dursec);

  if (total.textContent === "NaN:NaN") {
    total.textContent = "00:00";
  }
}

// if the number less than 10 add 0 at the beginning
function check(x) {
  const b = parseInt(x);
  return b < 10 ? "0" + b : b;
}

// set the progress bar's width according to click position on progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const positionX = e.offsetX;
  const duration = music.duration;

  music.currentTime = (positionX / width) * duration;
  circle.style.left = e.offsetX;
}

//**********EVENT LISTENERS*********/
window.addEventListener("load", setAudioSong(songs[current]));
play.addEventListener("click", () => {
  const isPlaying = player.classList.contains("playingrightnow");
  if (isPlaying) {
    pauseAudioSong();
  } else {
    playAudioSong();
  }
});

next.addEventListener("click", nextSong);

prev.addEventListener("click", prevSong);

music.addEventListener("timeupdate", updateProgress);

music.addEventListener("ended", () => {
  if (!RANDOM) {
    nextSong();
  } else {
    let random = parseInt(Math.floor(Math.random() * songs.length));
    setAudioSong(
      songs[
        random === current ? checkCurrent((current += 2)) : (current = random)
      ]
    );
    playAudioSong();
  }
});

progressBar.addEventListener("click", setProgress);

replay.addEventListener("click", () => {
  replay.classList.toggle("active-media-btn");
  music.loop ? (music.loop = false) : (music.loop = true);
});

random.addEventListener("click", () => {
  random.classList.toggle("active-media-btn");
  RANDOM ? (RANDOM = false) : (RANDOM = true);
});

// document.body.onkeyup = function (e) {
//   if (e.keyCode == 32) {
//     const isPlaying = player.classList.contains("playingrightnow");
//     if (isPlaying) {
//       pauseAudioSong();
//     } else {
//       playAudioSong();
//     }
//   }
// };

volSlider.addEventListener("input", () => {
  music.volume = volSlider.value / 100;
});

var currentImage = "";
volume.addEventListener("click", () => {
  const currentVal = volSlider.value;
  if (music.volume > 0) {
    music.volume = 0;
    currentImage = volicon.getAttribute("src");
    console.log(currentImage);
    volicon.setAttribute("src", "images/icons/volume-none.png");
  } else {
    console.log(currentImage);
    music.volume = currentVal / 100;
    volicon.setAttribute("src", currentImage);
  }
});
