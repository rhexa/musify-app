const editPlaylist = document.querySelector(".edit-playlist");
const playlistName = document.querySelector(".playlist-name");
const editPlaylistName = document.getElementById("playlist-name-input");
const uploadimage = document.querySelectorAll(".upload-playlist-pic");

const coverPic = document.querySelectorAll(".playlist-cover-pic");
const musicIcon = document.querySelectorAll(".fa-music");
const symbol = document.querySelector(".playlist-card-symbol");
const deleteInput = document.querySelector("#delete-input");
const searchInput = document.querySelector(".search-input");
const filteredSongs = document.querySelector(".filtered-songs");

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

// Fetch the song
function fetchSong(x) {
  fetch("js/data.json")
    .then((res) => res.json())
    .then((res) => {
      // filter the result array according to entered input value
      const list = res.filter(
        (i) => i.name.toLowerCase().indexOf(x.toLowerCase()) > -1
      );

      // if list lenght is 0 it means there is no mathing song
      //in that case show the no result text
      if (list.length === 0) {
        filteredSongs.innerHTML = `<h1 class="no-result">No results found for "${x}"</h1>`;
      } else {
        //if list length is greater than 0 then render the songs to dom
        generateSong(list);
      }
    })
    .catch((err) => console.log(err));
}

function generateSong(list) {
  const songs = list
    .map(
      (i) => `
      <div class="filtered-song" data-id="${i.id}">
        <div class="filtered-song-img-wrap">
          <i class="fas fa-play play-filtered-song"></i>
          <img src="song-covers/${i.img}" alt="${i.name}" />
        </div>
        <div class="filtered-song-info-wrap">
          <h3 class="filtered-song-name">${i.name}</h3>
          <p class="filtered-artist-name">${i.artist}</p>
        </div>
        <div class="filtered-song-btn">
          <button  class="btn add-to-playlist">Add</button>
        </div>
      </div>
  `
    )
    .join("");
  filteredSongs.innerHTML = songs;

  const playFiltered = document.querySelectorAll(".filtered-song-img-wrap > i");
  const appended = filteredSongs.children;

  playFiltered.forEach((item, index) => {
    item.addEventListener("click", () => {
      const id = appended[index].getAttribute("data-id");

      fetch("js/data.json")
        .then((res) => res.json())
        .then((res) => {
          const one = res.find((s) => s.id === id);

          setAudioSong(one);
          playAudioSong();
        });
    });
  });
}

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

searchInput.addEventListener("keyup", (e) => {
  const word = e.target.value;

  if (word.length > 0) {
    fetchSong(word);
    deleteInput.style.display = "flex";
  } else {
    deleteInput.style.display = "none";
    filteredSongs.innerHTML = "";
  }
});

deleteInput.addEventListener("click", () => {
  searchInput.value = "";
  deleteInput.style.display = "none";
  searchInput.focus();
  filteredSongs.innerHTML = "";
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
