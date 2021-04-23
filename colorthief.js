const colorThief = new ColorThief();
const img = document.querySelector(".playlist-img-wrap img");
let color = {};

// Make sure image is finished loading
if (img.complete) {
  color = colorThief.getPalette(img)[2];
  document.body.style.backgroundImage = `
  linear-gradient(0deg, #000 40%, rgb(${color[0]},${color[1]},${color[2]}))
  `;
} else {
  window.addEventListener("load", function () {
    color = colorThief.getPalette(img)[2];

    document.body.style.backgroundImage = `
  linear-gradient(0deg, #000 40%, rgb(${color[0]},${color[1]},${color[2]}))
  `;
  });
}
