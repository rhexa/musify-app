const categoryGroup = document.querySelector(".category-group");

categoryGroup.addEventListener("click", (e) => {
  if (e.target.classList.contains("featured")) {
    underline.style.left = "25px";
    if (!featured.classList.contains("category-active")) {
      removeUderline();
      featured.classList.add("category-active");
    }
  }

  if (e.target.classList.contains("genres")) {
    underline.style.left = "175px";
    if (!genres.classList.contains("category-active")) {
      removeUderline();
      genres.classList.add("category-active");
    }
  }

  if (e.target.classList.contains("releases")) {
    underline.style.left = "325px";
    if (!releases.classList.contains("category-active")) {
      removeUderline();
      releases.classList.add("category-active");
    }
  }
});
