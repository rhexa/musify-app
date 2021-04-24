const playSong = document.getElementById("playsong");

playSong.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("playsong");
});
