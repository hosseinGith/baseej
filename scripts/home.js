function main() {
  const habergerIcon = document.querySelector(".habergerIcon");
  const headerDiv = document.querySelector(".headerDiv");
  const videoCont = document.querySelector(".videoCont");
  const searchIcon = document.querySelector(".searchIcon");
  const searchCont = document.querySelector(".searchCont");
  const closeSearch = document.querySelector(".closeSearch");
  const optionsSite = document.querySelectorAll(".options ul li");
  const loadingCont = document.querySelector(".loadingCont");

  habergerIcon.addEventListener("click", () => {
    headerDiv.classList.toggle("showMenu");
  });
  window.addEventListener("scroll", () => {
    if (scrollY > 50) headerDiv.classList.add("position");
    else headerDiv.classList.remove("position");
  });
  $(document).ready(function () {
    $(".sliderCont").owlCarousel({
      rtl: true,
      nav: false,
      dots: false,
      lazyLoad: true,
      autoWidth: true,
    });
    $(".sliderCont2").owlCarousel({
      rtl: true,
      nav: false,
      dots: false,
      lazyLoad: true,
      autoWidth: true,
    });
    $(".sliderCont3").owlCarousel({
      items: 1,
      rtl: true,
      nav: false,
      dots: false,
      lazyLoad: true,
      loop: true,
    });
  });

  videoCont.addEventListener("click", () => {
    videoCont.children[0].controls = true;
  });
  searchIcon.addEventListener("click", () => {
    searchCont.classList.add("active");
  });
  closeSearch.addEventListener("click", () => {
    searchCont.classList.remove("active");
  });
  optionsSite.forEach((item) => {
    item.addEventListener("click", () => {
      optionsSite.forEach((ite) => {
        ite.classList.remove("active");
      });
      item.classList.add("active");
    });
  });
  loadingCont.parentElement.parentElement.remove();
}
document.addEventListener("DOMContentLoaded", main);
