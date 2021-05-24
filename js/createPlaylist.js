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
const fourImages = document.querySelector(".four-images");
const image1 = document.querySelector(".image-1");
const image2 = document.querySelector(".image-2");
const image3 = document.querySelector(".image-3");
const image4 = document.querySelector(".image-4");
const ply = document.getElementById("dev-mus");

// Global variables
let isSet = false;

// Objects
const colorThief = new ColorThief();

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
          isSet = true;

          // If the loop index on the cover pic equals to 0 add eventlistener
          if (index === 0) {
            if (window.getComputedStyle(fourImages).display !== "none") {
              fourImages.style.display = "none";
            }
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

function getAllSelectedFromStorage() {
  return JSON.parse(sessionStorage.getItem("selected"));
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
      const one = songs[0].find((s) => s.id === id);

      createPlaylistSetSong(one);
      makePlayerIconPause();
      music.play();
      player.classList.add("playingrightnow");

      if (playlistSongs.children.length > 0) {
        clearPlaylistSongAnimation();
      }
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

      if (playlistSongs.children.length === 1) {
        if (window.getComputedStyle(coverPic[0]).display != "block") {
          coverPic.forEach((pic, index) => {
            musicIcon[index].style.display = "none";
            pic.setAttribute("src", `song-covers/${one.img}`);
            pic.style.display = "block";

            // If the loop index on the cover pic equals to 0 add eventlistener
            if (index === 0) {
              // Set symbol to block
              symbol.style.display = "block";
              // Call the function after image is loaded
              pic.onload = () => {
                setColor(pic);
              };
            }
          });
        }

        //if the number of the songs equals to 4 or more
        //and the isSet variable is not true create the collage
      } else if (playlistSongs.children.length >= 4 && !isSet) {
        const listsongs = playlistSongs.querySelectorAll(".playlist-song");

        coverPic.forEach((pic) => {
          pic.style.display = "none";
        });

        fourImages.style.display = "grid";

        let song1, song2, song3, song4;

        song1 =
          listsongs[0].firstElementChild.children[2].firstElementChild
            .firstElementChild;
        song2 =
          listsongs[1].firstElementChild.children[2].firstElementChild
            .firstElementChild;
        song3 =
          listsongs[2].firstElementChild.children[2].firstElementChild
            .firstElementChild;
        song4 =
          listsongs[3].firstElementChild.children[2].firstElementChild
            .firstElementChild;

        image1.setAttribute("src", song1.src);
        image2.setAttribute("src", song2.src);
        image3.setAttribute("src", song3.src);
        image4.setAttribute("src", song4.src);

        getColors(image1, image2, image3, image4).then((res) => {
          let r = 0;
          let g = 0;
          let b = 0;

          res.forEach((item) => {
            r += item[0];
            g += item[1];
            b += item[2];
          });

          document.body.style.backgroundImage = `
  linear-gradient(0deg, #000 30%, rgb(${r / 4},${g / 4},${b / 4}))
  `;
        });
      }

      parent.remove();
    });
  });
}

//This function returns rgb color values of the given 4 images
function getColors(img1, img2, img3, img4) {
  let color1, color2, color3, color4;

  return new Promise((resolve, reject) => {
    color1 = colorThief.getColor(img1);

    color2 = colorThief.getColor(img2);

    color3 = colorThief.getColor(img3);

    color4 = colorThief.getColor(img4);

    resolve([color1, color2, color3, color4]);
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

// Clear playing animation from selected songs list
function clearPlaylistSongAnimation() {
  Array.from(playlistSongs.children).forEach((item) => {
    const i = item.querySelector(".playing-animation");

    if (i.classList.contains("active-playing-animation")) {
      i.classList.remove("active-playing-animation");
      const btn = item.querySelector(".playlist-song-play-btn i");
      btn.classList.remove("fa-pause");
      btn.classList.add("fa-play");
    }
  });
}

// Add selected song to playlist
function addedSong(x, isPlaying) {
  playlistSongs.innerHTML += `
  <section class="playlist-song" data-id="${x.id}">
                <div class="inner-song">
                  <div class="playlist-song-play-btn">
                    <i class="${
                      isPlaying ? "fas fa-pause" : "fas fa-play"
                    }"></i>
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
                  <div class="playlist-song-length">56</div>
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
    const item =
      e.target.parentElement.parentElement.querySelector(".playing-animation");

    if (!item.classList.contains("active-playing-animation")) {
      makePlayerIconPlay();
      music.pause();
      player.classList.remove("playingrightnow");
    } else {
      makePlayerIconPause();
      player.classList.add("playingrightnow");
      const audiosrc = music.src.split("/")[music.src.split("/").length - 1];
      const selectedSongs = getAllSelectedFromStorage();
      const id =
        e.target.parentElement.parentElement.parentElement.getAttribute(
          "data-id"
        );
      const song = selectedSongs.find((s) => s.id === id);

      if (isSongPlayin(audiosrc, song.src)) {
        music.play();
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
      } else {
        clearPlaylistSongAnimation();
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        createPlaylistSetSong(song);
        music.play();
      }
    }
  }

  // When the play or pause button is clicked add or remove all the playing aniamtions or indicators
  if (e.target.parentElement.classList.contains("play")) {
    if (!player.classList.contains("playingrightnow")) {
      clearPlaylistSongAnimation();
    } else {
      if (playlistSongs.children.length > 0) {
        const audiosrc = music.src.split("/")[music.src.split("/").length - 1];
        const selectedSongs = getAllSelectedFromStorage();
        const song = selectedSongs.find((s) => s.src === audiosrc);

        Array.from(playlistSongs.children).forEach((item) => {
          const id = item.getAttribute("data-id");
          if (id === song.id) {
            item
              .querySelector(".playing-animation")
              .classList.add("active-playing-animation");
          }
        });
      }
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
  let color = {};

  // Make sure image is finished loading
  if (pic.complete) {
    color = colorThief.getColor(pic);
    document.body.style.backgroundImage = `
  linear-gradient(0deg, #000 30%, rgb(${color[0]},${color[1]},${color[2]}))
  `;
  } else {
    window.addEventListener("load", function () {
      color = colorThief.getColor(pic);

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
