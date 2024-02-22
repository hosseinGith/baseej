const habergerIcon = document.querySelector(".habergerIcon");
const headerDiv = document.querySelector(".headerDiv");

habergerIcon.addEventListener("click", () => {
  headerDiv.classList.toggle("showMenu");
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
