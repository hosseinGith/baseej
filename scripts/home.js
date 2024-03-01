function main() {
  const videoCont = document.querySelector(".videoCont");
  const optionsSite = document.querySelectorAll(".options ul li");
  const sliderCont = document.querySelector(".sliderCont");
  const sliderCont2 = document.querySelector(".sliderCont2");
  const sliderCont3 = document.querySelector(".sliderCont3");
  const searchCont = document.querySelector(".searchCont");

  async function getData(api) {
    let data = await (await fetch(api)).json();
    return data;
  }
  function createItems(data, container) {
    const div = document.createElement("div");
    const div_divImg = document.createElement("div");
    const div_divImg_img = document.createElement("img");
    const div_span = document.createElement("span");

    div.classList.add("item");
    div_divImg.classList.add("imgCont");
    div_span.classList.add("text");
    div_span.textContent = data.underImgText;
    div.appendChild(div_divImg);
    div_divImg.appendChild(div_divImg_img);
    div.appendChild(div_span);
    container.appendChild(div);
    div_divImg_img.src = data.imgSrc;
  }
  async function createElementSlider1() {
    let data = await getData("./assets/json/homePageSlider1.json");
    data.forEach((item) => {
      createItems(item, sliderCont);
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
      createItems(item, sliderCont2);
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

  searchCont.addEventListener("submit", (e) => {
    e.preventDefault();
    let a = document.createElement("a");
    a.href = "./pages/searchResult/index.html";
    localStorage.setItem("search", searchCont.children[0].value);
    a.click();
  });
  optionsSite.forEach((item) => {
    item.addEventListener("click", () => {
      optionsSite.forEach((ite) => {
        ite.classList.remove("active");
      });
      item.classList.add("active");
    });
  });
}
document.addEventListener("DOMContentLoaded", main);
