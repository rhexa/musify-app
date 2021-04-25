const editPlaylist = document.querySelector(".edit-playlist");
const playlistName = document.querySelector(".playlist-name");
const editPlaylistName = document.getElementById("playlist-name-input");
const uploadimage = document.querySelectorAll(".upload-playlist-pic");

const coverPic = document.querySelectorAll(".playlist-cover-pic");
const musicIcon = document.querySelectorAll(".fa-music");
const symbol = document.querySelector(".playlist-card-symbol");

// Upload image
uploadimage.forEach((item) => {
  item.addEventListener("change", () => {
    const file = item.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", function () {
        coverPic.forEach((pic, index) => {
          musicIcon[index].style.display = "none";
          pic.setAttribute("src", this.result);
          pic.style.display = "block";

          // If the loop on the cover pic add the eventlistener
          if (index === 0) {
            // Set symbol to block
            symbol.style.display = "block";
            // Call the function after image is loaded
            pic.onload = () => {
              setColor(pic);
            };
          }
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

// Function that generates the average color of the image
function setColor(pic) {
  const colorThief = new ColorThief();

  console.log(pic.complete);

  let color = {};

  // Make sure image is finished loading
  if (pic.complete) {
    color = colorThief.getColor(pic);
    console.log(color);
    document.body.style.backgroundImage = `
  linear-gradient(0deg, #000 30%, rgb(${color[0]},${color[1]},${color[2]}))
  `;
  } else {
    window.addEventListener("load", function () {
      color = colorThief.getColor(pic);
      console.log(color);
      document.body.style.backgroundImage = `
  linear-gradient(0deg, #000 30%, rgb(${color[0]},${color[1]},${color[2]}))
  `;
    });
  }
}
