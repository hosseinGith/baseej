const habergerIcon = document.querySelector(".habergerIcon");
const headerSect = document.querySelector(".headerSect");
const loadingCont = document.querySelector(".loadingCont");
const searchIcon = document.querySelector(".searchIcon");
const searchCont = document.querySelector(".searchCont");
const closeSearch = document.querySelector(".closeSearch");

$("#searchBtn").on("click", () => {
  searchCont.classList.add("active");
  console.log(1);
});
searchIcon.addEventListener("click", () => {
  searchCont.classList.add("active");
});
closeSearch.addEventListener("click", () => {
  searchCont.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", () => {
  loadingCont.parentElement.parentElement.remove();
});
habergerIcon.addEventListener("click", () => {
  headerSect.classList.toggle("showMenu");
});
window.addEventListener("scroll", () => {
  if (scrollY > 50) headerSect.classList.add("position");
  else headerSect.classList.remove("position");
});
searchCont.children[0].addEventListener("input", () => {
  searchCont.classList.remove("emptySearch");
});
