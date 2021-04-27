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
        const getAll = JSON.parse(sessionStorage.getItem("selected"));

        if (getAll != null) {
          const ids = getAll.map((i) => i.id);
          const newList = [];

          list.forEach((i) => {
            if (!ids.includes(i.id)) {
              newList.push(i);
            }
          });

          addFetchedSongsToStorage(newList);
          generateSong(newList);
        } else {
          addFetchedSongsToStorage(list);
          generateSong(list);
        }

        //if list length is greater than 0 then render the songs to dom
      }

      // Save each search to session storage to use them later on
    })
    .catch((err) => console.log(err));
}

function getAllFromStorage() {
  return JSON.parse(sessionStorage.getItem("songs"));
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
          <button  class="btn add-to-playlist-added">Add</button>
        </div>
      </div>
  `
    )
    .join("");
  filteredSongs.innerHTML = songs;

  const playFiltered = document.querySelectorAll(".filtered-song-img-wrap > i");

  // Play filtered song
  playFiltered.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.parentElement.parentElement.getAttribute("data-id");

      const songs = getAllFromStorage();
      console.log(songs);
      const one = songs[0].find((s) => s.id === id);

      createPlaylistSetSong(one);
      makePlayerIconPause();
      music.play();
    });
  });

  const buttons = Array.from(
    document.querySelectorAll(".add-to-playlist-added")
  );

  buttons.forEach((i) => {
    i.addEventListener("click", () => {
      const parent = i.parentElement.parentElement;
      const id = parent.getAttribute("data-id");
      const songs = getAllFromStorage();
      const one = songs[0].find((s) => s.id == id);

      addSelectedToStorage(one);

      const audiosrc = music.src.split("/")[music.src.split("/").length - 1];

      addedSong(one, isSongPlayin(audiosrc, one.src));
      parent.remove();
    });
  });
}

function isSongPlayin(x, y) {
  return x === y;
}

function createPlaylistSetSong(x) {
  music.src = `musics/${x.src}`;
  artistName.textContent = x.artist;
  songName.textContent = x.name;
  artistImage.src = `song-covers/${x.img}`;
  artistInfoBg.src = `song-covers/${x.img}`;
  artistInfoBg.style.background = `url("song-covers/${x.img}") no-repeat center center/cover`;
}

// Add selected song to session storage
function addSelectedToStorage(song) {
  let selected;

  if (sessionStorage.getItem("selected") === null) {
    selected = [];
  } else {
    selected = JSON.parse(sessionStorage.getItem("selected"));
  }

  selected.push(song);
  sessionStorage.setItem("selected", JSON.stringify(selected));
}

// Add fetched songs to the session storage
function addFetchedSongsToStorage(songs) {
  let fetched = [];
  if (sessionStorage.getItem("songs") === null) {
    fetched = [];
  } else {
    fetched = JSON.parse(sessionStorage.getItem("songs"));
  }

  fetched.push(songs);
  sessionStorage.setItem("songs", JSON.stringify(fetched));
}

// Make player icon play
function makePlayerIconPlay() {
  play.firstElementChild.classList.remove("fa-pause-circle");
  play.firstElementChild.classList.add("fa-play-circle");
}

// Make player icon pause
function makePlayerIconPause() {
  play.firstElementChild.classList.remove("fa-play-circle");
  play.firstElementChild.classList.add("fa-pause-circle");
}

// Add selected song to playlist
function addedSong(x, isPlaying) {
  playlistSongs.innerHTML += `
  <section class="playlist-song" data-id="${x.id}">
                <div class="inner-song">
                  <div class="playlist-song-play-btn">
                    <i class="fas fa-pause"></i>
                  </div>
                  <div class="playlist-song-index">1</div>
                  <div class="playlist-song-info">
                    <div class="playlist-song-info-img-wrap">
                      <img src="song-covers/${x.img}" alt="song" />
                    </div>
                    <div class=".playlist-song-info-right">
                      <h4 class="playlist-song-name">
                        ${x.name}
                      </h4>
                      <h4 class="playlist-song-artist-name">${x.artist}</h4>
                    </div>
                  </div>
                  <div class="playing-animation ${
                    isPlaying ? "active-playing-animation" : ""
                  }">
                    <div class="playing-container">
                      <div class="ani-bar bar-1"></div>
                      <div class="ani-bar bar-2"></div>
                      <div class="ani-bar bar-3"></div>
                      <div class="ani-bar bar-4"></div>
                      <div class="ani-bar bar-5"></div>
                    </div>
                  </div>
                  <div class="playlist-song-album">${x.name}</div>
                  <div class="playlist-song-added-date">2 days ago</div>
                  <div class="playlist-song-like-icon">
                    <i class="fas fa-heart"></i>
                  </div>
                  <div class="playlist-song-length">2:54</div>
                  <div class="song-more-button">
                    <a href="#" class="playlist-song-more">
                      <i class="fas fa-ellipsis-h"></i>
                    </a>
                    <div class="song-more-options">
                      <ul>
                        <li>
                          <a class="song-more-option" href="#">Add to queue</a>
                        </li>
                        <li>
                          <a class="song-more-option" href="#">Go to artist</a>
                        </li>
                        <li>
                          <a class="song-more-option" href="#">Go to album</a>
                        </li>
                        <li>
                          <a class="add-to-playlist song-more-option" href="#"
                            >Add to playlist
                            <i class="fas fa-caret-right"></i>
                          </a>
                          <ul>
                            <li>
                              <a class="song-more-option-op" href="#"
                                >Playlist#1</a
                              >
                            </li>
                            <li>
                              <a class="song-more-option-op" href="#"
                                >Playlist#2</a
                              >
                            </li>
                            <li>
                              <a class="song-more-option-op" href="#"
                                >Playlist#3</a
                              >
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <div class="playlist-song-playerlist"></div>
                    </div>
                  </div>
                </div>
              </section>
  `;
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

  if (e.target.parentElement.classList.contains("playlist-song-play-btn")) {
    const item = e.target.parentElement.parentElement.querySelector(
      ".playing-animation"
    );

    if (!item.classList.contains("active-playing-animation")) {
      makePlayerIconPlay();
      music.pause();
    } else {
      makePlayerIconPause();
      music.play();
    }
  }
});

searchInput.addEventListener("keyup", (e) => {
  sessionStorage.removeItem("songs");
  const word = e.target.value;

  if (word.length > 0) {
    fetchSong(word);
    deleteInput.style.display = "flex";
  } else {
    deleteInput.style.display = "none";
    filteredSongs.innerHTML = "";
    sessionStorage.removeItem("songs");
  }
});

// Delete text inside the input field
deleteInput.addEventListener("click", () => {
  searchInput.value = "";
  deleteInput.style.display = "none";
  searchInput.focus();
  filteredSongs.innerHTML = "";
  sessionStorage.removeItem("songs");
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

// Clear the session storage when the page is reloaed
window.addEventListener("load", () => {
  sessionStorage.clear();
});

playlistSongs.addEventListener("change", () => {
  console.log("girdi");
  const items = this.children;

  const id = items[0].getAttribute("data-id");
  const listed = JSON.parse(sessionStorage.getItem("selected"));

  const song = listed.find((i) => i.id == id);

  coverPic.setAttribute("src", song.img);
  coverPic.style.display = "block";

  coverPic.onload = () => {
    setColor(coverPic);
  };
});
