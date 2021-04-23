const labelHeader = document.querySelector(".playlist-list-label");
const mainNav = document.querySelector(".main-navbar");
const playlist = document.getElementById("playlist");

// Sticky part
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
