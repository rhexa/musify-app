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
