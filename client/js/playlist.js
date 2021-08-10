const labelHeader = document.querySelector(".playlist-list-label");
const mainNav = document.querySelector(".main-navbar");
const playlist = document.getElementById("playlist");
const playlistSongs = document.getElementById("playlist-songs");
const likePlaylist = document.querySelector(".like-playlist i");
const img = document.querySelector(".playlist-img-wrap img");
const likedPlaylistWarning = document.querySelector(".liked-playlist-warning");
const playlistsongmore = document.querySelectorAll(".playlist-song-more");
const songMoreOptionOp = document.querySelectorAll(".song-more-option-op");

// Make the label row sticky when it reaches to the top of the page on a scroll event
// playlist.onscroll = function () {
//   stickIt();
// };

// let sticky = labelHeader.offsetTop;
// function stickIt() {
//   console.log(sticky);
//   if (playlist.scrollTop > sticky) {
//     labelHeader.classList.add("sticky-label");
//     mainNav.style.background = "rgba(0, 0, 0, 0.76)";
//   } else {
//     labelHeader.classList.remove("sticky-label");
//     mainNav.style.background = "rgba(0, 0, 0, 0.2)";
//   }
// }

// **********EVENT LİSTENERS**********
// This function activates the sound vawe animation when the play button on song element is clicked.
playlistSongs.addEventListener("click", (e) => {
  if (e.target.parentElement.classList.contains("playlist-song-play-btn")) {
    e.target.parentElement.parentElement
      .querySelector(".playing-animation")
      .classList.toggle("active-playing-animation");
  }
  // Change the play icon into pause and viceversa
  if (e.target.classList.contains("fa-play")) {
    e.target.classList.remove("fa-play");
    e.target.classList.add("fa-pause");
  } else if (e.target.classList.contains("fa-pause")) {
    e.target.classList.remove("fa-pause");
    e.target.classList.add("fa-play");
  }
});

// Close the login warning when the escape key is pressed
document.body.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    //Close the more song option if its open
    removeMoreList();
    if (
      likedPlaylistWarning.classList.contains("liked-playlist-warning-show")
    ) {
      likedPlaylistWarning.classList.remove("liked-playlist-warning-show");
    }
  }
});

// Open the more options list on music
// Get all the more options button
playlistsongmore.forEach((item) => {
  //Iterate through each item and add click eventlistener to each one
  item.addEventListener("click", (e) => {
    const i = e.target.nextElementSibling;
    console.log("girdi");
    removeMoreList();
    i.classList.toggle("song-more-options-show");
  });
});

// If the user click somewhere other than more list or one of more list item, list is closed.
window.addEventListener("click", (e) => {
  const t = e.target;

  if (t.classList.contains("liked-playlist-warning")) {
    if (
      likedPlaylistWarning.classList.contains("liked-playlist-warning-show")
    ) {
      likedPlaylistWarning.classList.remove("liked-playlist-warning-show");
    }
  }

  if (!t.classList.contains("playlist-song-more")) {
    if (t.children[0]) {
      if (
        !t.children[0].classList.contains("song-more-option") &&
        !t.classList.contains("add-to-playlist") &&
        !t.children[0].classList.contains("song-more-option-op")
      ) {
        removeMoreList();
      }
    }
  }
});

songMoreOptionOp.forEach((item) => {
  item.addEventListener("click", () => {
    const listName = item.textContent;
    message.showMessage("success", `Song added to ${listName} successfully`);
    removeMoreList();
  });
});

/*********FUNTIONS************ */
function removeMoreList() {
  const songmoreoptions = document.querySelectorAll(".song-more-options");
  songmoreoptions.forEach((i) => {
    if (i.classList.contains("song-more-options-show")) {
      i.classList.remove("song-more-options-show");
    }
  });
}
