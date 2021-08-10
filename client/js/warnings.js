createPlaylist.addEventListener("click", () => {
  createPlaylistWarning.style.display = "block";
});

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

  if (
    !e.target.classList.contains("create-list-warning") &&
    !e.target.classList.contains("create-playlist-btn")
  ) {
    if (window.getComputedStyle(createPlaylistWarning).display === "block") {
      createPlaylistWarning.style.display = "none";
    }
  }
});
