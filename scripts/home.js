function main() {
  const habergerIcon = document.querySelector(".habergerIcon");
  const headerDiv = document.querySelector(".headerDiv");
  const videoCont = document.querySelector(".videoCont");
  const searchIcon = document.querySelector(".searchIcon");
  const searchCont = document.querySelector(".searchCont");
  const closeSearch = document.querySelector(".closeSearch");
  const optionsSite = document.querySelectorAll(".options ul li");
  const loadingCont = document.querySelector(".loadingCont");
  const sliderCont = document.querySelector(".sliderCont");
  const sliderCont2 = document.querySelector(".sliderCont2");
  const sliderCont3 = document.querySelector(".sliderCont3");

  async function getData(api) {
    let data = await (await fetch(api)).json();
    return data;
  }
  async function createElementSlider1() {
    let data = await getData("./assets/json/homePageSlider1.json");
    data.forEach((item) => {
      const div = document.createElement("div");
      const div_divImg = document.createElement("div");
      const div_divImg_img = document.createElement("img");
      const div_span = document.createElement("span");

      div.classList.add("item");
      div_divImg.classList.add("img");
      div_span.classList.add("text");
      div_span.textContent = item.underImgText;
      div.appendChild(div_divImg);
      div_divImg.appendChild(div_divImg_img);
      div.appendChild(div_span);
      sliderCont.appendChild(div);
      div_divImg_img.src = item.imgSrc;
    });
    $(".sliderCont").owlCarousel({
      rtl: true,
      nav: false,
      dots: false,
      lazyLoad: true,
      autoWidth: true,
    });
    sliderCont.classList.add("owl-carousel");
  }
  async function createElementSlider2() {
    let data = await getData("./assets/json/homePageSlider2.json");
    data.forEach((item) => {
      const div = document.createElement("div");
      const div_divImg = document.createElement("div");
      const div_divImg_img = document.createElement("img");
      const div_span = document.createElement("span");
      div.classList.add("item");
      div_divImg.classList.add("imgCont");
      div_span.classList.add("text");
      div_span.textContent = item.underImgText;
      div.appendChild(div_divImg);
      div_divImg.appendChild(div_divImg_img);
      div.appendChild(div_span);
      sliderCont2.appendChild(div);
      div_divImg_img.src = item.imgSrc;
    });
    $(".sliderCont2").owlCarousel({
      rtl: true,
      nav: false,
      dots: false,
      lazyLoad: true,
      autoWidth: true,
    });
    sliderCont2.classList.add("owl-carousel");
  }
  async function createElementSlider3() {
    let data = await getData("./assets/json/homePageSlider3.json");
    data.forEach((item) => {
      const div = document.createElement("div");
      const div_divImg = document.createElement("div");
      const div_divImg_img = document.createElement("img");

      div.classList.add("item");
      div_divImg.classList.add("imgCont");
      div.appendChild(div_divImg);
      div_divImg.appendChild(div_divImg_img);
      sliderCont3.appendChild(div);
      div_divImg_img.src = item.imgSrc;
    });
    $(".sliderCont3").owlCarousel({
      items: 1,
      rtl: true,
      nav: false,
      dots: false,
      lazyLoad: true,
      loop: true,
    });
    sliderCont3.classList.add("owl-carousel");
  }
  createElementSlider1();
  createElementSlider2();
  createElementSlider3();

  habergerIcon.addEventListener("click", () => {
    headerDiv.classList.toggle("showMenu");
  });
  window.addEventListener("scroll", () => {
    if (scrollY > 50) headerDiv.classList.add("position");
    else headerDiv.classList.remove("position");
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
