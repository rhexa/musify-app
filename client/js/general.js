const range = document.getElementById("myrange");
const volicon = document.querySelector(".volume-icon img");
const featured = document.querySelector(".featured");
const genres = document.querySelector(".genres");
const releases = document.querySelector(".releases");

const categoryList = document.querySelector(".category-list");
const underline = document.querySelector(".underline");
// const play = document.querySelector(".play");
const innerImgWrap = document.querySelector(".artist-info-inner-img-wrap");
const liked = document.querySelector(".liked");
const cardClick = document.querySelector(".card-click");
// const playSong = document.getElementById("playsong");
const likedSongs = document.querySelector(".liked-songs");
const createPlaylist = document.querySelector(".create-playlist-btn");
const createPlaylistWarning = document.querySelector(".create-list-warning");
const playlistWarning = document.querySelector(".playlist-warning");

// Objects
const message = new Message();

// Functions
function arrange() {
  let x = range.value;
  let color = `linear-gradient(
    to right,
    var(--bar-color) ${x}%,
    var(--progress-bar-color) ${x}%
  )`;

  range.style.backgroundImage = color;
}

function arrangeIcon() {
  if (range.value == 100) {
    volicon.setAttribute("src", "images/icons/volume-full.png");
  } else if (range.value < 100 && range.value > 50) {
    volicon.setAttribute("src", "images/icons/volume-mid2.png");
  } else if (range.value <= 50 && range.value > 0) {
    volicon.setAttribute("src", "images/icons/volume-mid1.png");
  } else {
    volicon.setAttribute("src", "images/icons/volume-none.png");
  }
}

function removeUderline() {
  const arr = Array.from(categoryList.children);
  arr.pop();
  arr.forEach((i) => {
    if (i.firstElementChild.classList.contains("category-active")) {
      i.firstElementChild.classList.remove("category-active");
    }
  });
}

function arrangeVolIcon() {
  arrange();
  arrangeIcon();
  console.log("girdi");
}

// Event listeners

range.addEventListener("mouseup", () => {
  arrange();
  arrangeIcon();
  range.removeEventListener("mousemove", arrangeVolIcon);
});

range.addEventListener("mousedown", () => {
  range.addEventListener("mousemove", arrangeVolIcon);
});

window.onload = () => {
  arrangeIcon();
};

liked.addEventListener("click", () => {
  if (!liked.classList.contains("likedit")) {
    liked.classList.add("likedit");
    message.showMessage("normal", "Song added to liked songs list");
  } else {
    liked.classList.remove("likedit");
    message.showMessage("normal", "Song removed from liked songs list");
  }
});

// playSong.addEventListener("click", (e) => {
//   e.stopPropagation();
//   console.log("playsong");
// });
