const habergerIcon = document.querySelector(".habergerIcon");
const headerDiv = document.querySelector(".headerDiv");
const videoCont = document.querySelector(".videoCont");

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
