async function main() {
  const videoCont = document.querySelector(".videoCont");
  const optionsSite = document.querySelectorAll(".options ul li");
  const sliderCont = document.querySelector(".sliderCont");
  const sliderCont2 = document.querySelector(".sliderCont2");
  const sliderCont3 = document.querySelector(".sliderCont3");
  const searchCont = document.querySelector(".searchCont");
  const {
    homePageSlider1,
    homePageSlider2,
    homePageSlider3,
    homePageLastFetch,
  } = await (await fetch("assets/json/allRequestsData.json")).json();
  let swiperOptions = {
    direction: "horizontal",
    rtl: true,
    slidesPerView: 1,
    centeredSlides: false,
    spaceBetween: 50,
    loop: false,
    breakpoints: {
      1200: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      500: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
  };

  async function getData(api) {
    let data = await (await fetch(api)).json();
    return data;
  }
  function swiperTemplate() {
    // <div class="swiper-wrapper">
    //   <div class="swiper-slide">Slide 1</div>
    //   <div class="swiper-slide">Slide 2</div>
    //   <div class="swiper-slide">Slide 3</div>
    // </div>;
  }
  function createItems(data, container) {
    const div = document.createElement("div");
    const div_divImg = document.createElement("div");
    const div_divImg_img = document.createElement("img");
    const div_span = document.createElement("span");
    const swiper_slide = document.createElement("div");
    swiper_slide.classList.add("swiper-slide");

    div_divImg_img.alt = "xxx";
    div_divImg_img.loading = "lazy";
    div.classList.add("item");
    div_divImg.classList.add("imgCont");
    div_span.classList.add("text");
    div_span.textContent = data.underImgText;
    div.appendChild(div_divImg);
    div_divImg.appendChild(div_divImg_img);
    div.appendChild(div_span);
    swiper_slide.appendChild(div);
    container.appendChild(swiper_slide);
    div_divImg_img.src = data.imgSrc;
  }
  async function createElementSlider1() {
    const swiper_wrapper = document.createElement("div");
    swiper_wrapper.classList.add("swiper-wrapper");
    sliderCont.appendChild(swiper_wrapper);
    homePageSlider1.forEach((item) => {
      createItems(item, swiper_wrapper);
    });
    new Swiper(".sliderCont", swiperOptions);
    sliderCont.classList.add("swiper");
  }
  async function createElementSlider2() {
    const swiper_wrapper = document.createElement("div");
    swiper_wrapper.classList.add("swiper-wrapper");
    sliderCont2.appendChild(swiper_wrapper);
    homePageSlider2.forEach((item) => {
      createItems(item, swiper_wrapper);
    });
    new Swiper(".sliderCont2", swiperOptions);

    sliderCont2.classList.add("swiper");
  }
  async function createElementSlider3() {
    homePageSlider3.forEach((item) => {
      const div = document.createElement("div");
      const div_divImg = document.createElement("div");
      const div_divImg_img = document.createElement("img");

      div_divImg_img.alt = "xxx";
      div_divImg_img.loading = "lazy";
      div.classList.add("item");
      div_divImg.classList.add("imgCont");
      div.appendChild(div_divImg);
      div_divImg.appendChild(div_divImg_img);
      sliderCont3.appendChild(div);
      div_divImg_img.src = item.imgSrc;
    });
  }
  await createElementSlider1();
  await createElementSlider2();
  await createElementSlider3();

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
main();
// document.addEventListener("DOMContentLoaded", main);
