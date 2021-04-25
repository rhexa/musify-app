const editPlaylist = document.querySelector(".edit-playlist");
const playlistName = document.querySelector(".playlist-name");
const editPlaylistName = document.getElementById("playlist-name-input");
const uploadimage = document.querySelectorAll(".upload-playlist-pic");
const img = document.querySelector(".playlist-cover-pic");
const coverPic = document.querySelectorAll(".playlist-cover-pic");
const musicIcon = document.querySelectorAll(".fa-music");

// Upload image
uploadimage.forEach((item) => {
  item.addEventListener("change", () => {
    console.log(uploadimage);
    const file = item.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", function () {
        coverPic.forEach((pic, index) => {
          pic.style.display = "block";
          musicIcon[index].style.display = "none";
          pic.setAttribute("src", this.result);
        });
      });

      reader.readAsDataURL(file);
    }
  });
});

// Eventlisteners
window.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("pl-pic-upload") ||
    e.target.classList.contains("playlist-name")
  ) {
    editPlaylist.classList.add("show-edit-playlist");
    editPlaylistName.value = playlistName.textContent;
  }

  if (e.target.classList.contains("edit-playlist")) {
    editPlaylist.classList.remove("show-edit-playlist");
    //If the playlist name empty fill with original name
    if (playlistName.textContent === "") {
      playlistName.textContent = "My Playlist#2";
    }
  }

  if (e.target.classList.contains("fa-times")) {
    editPlaylist.classList.remove("show-edit-playlist");
    if (playlistName.textContent === "") {
      playlistName.textContent = "My Playlist#2";
    }
  }
});

editPlaylistName.addEventListener("keyup", (e) => {
  playlistName.textContent = e.target.value;
});

function setColor(img) {
  const colorThief = new ColorThief();
  // const img = document.querySelector(".playlist-img-wrap img");

  let color = {};

  // Make sure image is finished loading
  if (img.complete) {
    // color = colorThief.getPalette(img)[8];
    color = colorThief.getColor(img);
    document.body.style.backgroundImage = `
  linear-gradient(0deg, #000 30%, rgb(${color[0]},${color[1]},${color[2]}))
  `;
  } else {
    window.addEventListener("load", function () {
      // color = colorThief.getPalette(img)[8];
      color = colorThief.getColor(img);

      document.body.style.backgroundImage = `
  linear-gradient(0deg, #000 30%, rgb(${color[0]},${color[1]},${color[2]}))
  `;
    });
  }
}
