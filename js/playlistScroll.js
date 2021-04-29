playlist.onscroll = function () {
  stickIt();
};

let sticky = labelHeader.offsetTop;
function stickIt() {
  console.log(sticky);
  if (playlist.scrollTop > sticky) {
    labelHeader.classList.add("sticky-label");
    mainNav.style.background = "rgba(0, 0, 0, 0.76)";
  } else {
    labelHeader.classList.remove("sticky-label");
    mainNav.style.background = "rgba(0, 0, 0, 0.2)";
  }
}

// Show the login warning if the user click the like button on a playlist.
likePlaylist.addEventListener("click", () => {
  likedPlaylistWarning.classList.add("liked-playlist-warning-show");
});
