const range = document.getElementById("myrange");
const volicon = document.querySelector(".volume-icon img");
const featured = document.querySelector(".featured");
const genres = document.querySelector(".genres");
const releases = document.querySelector(".releases");
const categoryGroup = document.querySelector(".category-group");
const categoryList = document.querySelector(".category-list");
const underline = document.querySelector(".underline");
const play = document.querySelector(".play");
const innerImgWrap = document.querySelector(".artist-info-inner-img-wrap");
const liked = document.querySelector(".liked");
const cardClick = document.querySelector(".card-click");
// const playSong = document.getElementById("playsong");
const likedSongs = document.querySelector(".liked-songs");
const playlistWarning = document.querySelector(".playlist-warning");

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

function showMessage(type, text) {
  let div = document.createElement("DIV");
  div.id = "message";
  div.className = `${type} fadein`;
  div.appendChild(document.createTextNode(text));

  document.body.appendChild(div);

  setTimeout(() => {
    document.getElementById("message").classList.add("fadeout");
    document.getElementById("message").classList.remove("fadein");
  }, 3000);

  setTimeout(() => {
    document.getElementById("message").remove();
  }, 3400);
}

// Event listeners

range.addEventListener("mouseup", () => {
  arrange();
  arrangeIcon();
});

range.addEventListener("mousemove", () => {
  arrange();
  arrangeIcon();
});

window.onload = () => {
  arrangeIcon();
};

// categoryGroup.addEventListener("click", (e) => {
//   if (e.target.classList.contains("featured")) {
//     underline.style.left = "25px";
//     if (!featured.classList.contains("category-active")) {
//       removeUderline();
//       featured.classList.add("category-active");
//     }
//   }

//   if (e.target.classList.contains("genres")) {
//     underline.style.left = "175px";
//     if (!genres.classList.contains("category-active")) {
//       removeUderline();
//       genres.classList.add("category-active");
//     }
//   }

//   if (e.target.classList.contains("releases")) {
//     underline.style.left = "325px";
//     if (!releases.classList.contains("category-active")) {
//       removeUderline();
//       releases.classList.add("category-active");
//     }
//   }
// });

// liked.addEventListener("click", () => {
//   if (!liked.classList.contains("likedit")) {
//     liked.classList.add("likedit");
//     showMessage("normal", "Song added to liked songs list");
//   } else {
//     liked.classList.remove("likedit");
//     showMessage("normal", "Song removed from liked songs list");
//   }
// });

// playSong.addEventListener("click", (e) => {
//   e.stopPropagation();
//   console.log("playsong");
// });

likedSongs.addEventListener("click", () => {
  playlistWarning.style.display = "block";
});

window.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("playlist-warning") &&
    !e.target.classList.contains("liked-songs")
  ) {
    if (window.getComputedStyle(playlistWarning).display === "block") {
      playlistWarning.style.display = "none";
    }
  }
});
