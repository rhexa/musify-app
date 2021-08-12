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
// to retrieve songs
const endPointURL = "http://localhost:3000"

let songs;
const getSongs = async () => {
  const res = await fetch(`${endPointURL}/api/songs`)
  const data = await res.json()
  songs = data
  setAudioSong(songs[current])
}

let current = 0;
let RANDOM = false;
let PAUSE = false;

// *********FUNCTIONS***********

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
window.addEventListener("load", getSongs());
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
