const profileRow = document.querySelectorAll(".profile-row");
const seeAll = document.querySelectorAll(".see-all a");

// Upload image
const uploadimage = document.getElementById("upload-profile-pic");
const outputimg = document.querySelector(".profile-pic-wrap img");

uploadimage.addEventListener("change", () => {
  const file = uploadimage.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      outputimg.setAttribute("src", this.result);
    });

    reader.readAsDataURL(file);
  }
});

// Eventlisteners

// If there is 6 or more card inside a row set the width to 100%
//If not set the width to fit-content
profileRow.forEach((item, index) => {
  const num = Array.from(item.querySelectorAll(".profile-pp-click")).length;

  console.log(seeAll);
  if (num >= 6) {
    item.classList.add("profile-row-full-width");
    if (num === 6) {
      seeAll[index].style.display = "none";
    }
  } else {
    seeAll[index].style.display = "none";
    item.style.width = "fit-content";
  }
});
