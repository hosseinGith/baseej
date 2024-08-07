async function main() {
  let mainApi = "../server.php?pass=";
  const loading = document.querySelector(".loading");
  if (!localStorage.getItem("pass")) {
    document.location = "404";
  }
  async function submit() {
    mainApi = "../server.php?pass=" + localStorage.getItem("pass");
    await fetch("../myIp.php");
    loading.classList.add("active");
    access = await (await fetch(mainApi)).text();
    if (access.includes("unSuccess")) return (document.location = "404");
    else {
      loading.classList.remove("active");
    }
  }
  submit();
  const { homePageSlider1, homePageSlider2, homePageLastFetch } = await (
    await fetch("../../site.php?json=allRequestsData")
  ).json();
  const slider1 = document.querySelector(".slider1");
  const slider2 = document.querySelector(".slider2");
  const optionsContainer = document.querySelector(".optionsContainer");
  const optionsContainerType = document.querySelector("#optionsContainerType");
  console.log(homePageSlider1, homePageSlider2);
  let swiperOptions = {
    direction: "horizontal",
    rtl: true,
    slidesPerView: 2,
    centeredSlides: false,
    spaceBetween: 50,
    loop: false,
    breakpoints: {
      1200: {
        slidesPerView: 7,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      500: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  };
  function createItems(data, container, type) {
    const div = document.createElement("div");
    const div_divImg = document.createElement("div");
    const div_divImg_img = document.createElement("img");
    const div_span = document.createElement("span");
    const swiper_slide = document.createElement("div");
    swiper_slide.classList.add("swiper-slide");
    div.addEventListener("click", async () => {
      let api = mainApi + `&deletePost&type=${type}&id=${data.id}`;
      loading.classList.add("active");
      let res = await (await fetch(api)).text();
      if (res === "success") {
        div.parentElement.remove();
      }
      loading.classList.remove("active");
    });
    div_divImg_img.alt = data.underImgText;
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
    slider1.appendChild(swiper_wrapper);
    homePageSlider1.forEach((item) => {
      createItems(item, swiper_wrapper, "homePageSlider1");
    });
    new Swiper(".slider1", { ...swiperOptions, slidesPerView: 3 });
    slider1.classList.add("swiper");
  }
  async function createElementSlider2() {
    const swiper_wrapper = document.createElement("div");
    swiper_wrapper.classList.add("swiper-wrapper");
    slider2.appendChild(swiper_wrapper);
    homePageSlider2.forEach((item) => {
      createItems(item, swiper_wrapper, "homePageSlider2");
    });
    new Swiper(".slider2", swiperOptions);

    slider2.classList.add("swiper");
  }
  async function deleteItem(div, id) {
    console.log(div);
    let api =
      mainApi +
      `&deletePost&type=${"homePageLastFetch"}&selecteType=${
        optionsContainerType.value
      }&id=${id}`;
    loading.classList.add("active");
    let res = await (await fetch(api)).text();
    if (res === "success") {
      div.remove();
    }
    loading.classList.remove("active");
  }
  function createFlageItems(property) {
    if (!homePageLastFetch.hasOwnProperty(property)) return;
    optionsContainer.innerHTML = "";
    homePageLastFetch[property].forEach((json) => {
      let date = json.date;
      date = new Date().getTime() - new Date(date).getTime();
      let calculateDate = Math.round(date / 86400000);
      let type = "روز";
      let dateString = `${calculateDate} ${type} پیش`;
      if (calculateDate < 1) {
        type = "امروز";
        dateString = type;
      } else if (calculateDate === 1) {
        type = "دیروز";
        dateString = type;
      } else if (calculateDate > 1 && calculateDate < 30) {
        calculateDate = Math.round(calculateDate / 30);
        dateString = `${calculateDate} ${type} پیش`;
      } else if (calculateDate > 29 && calculateDate < 364) {
        type = "ماه";
        calculateDate = Math.round(calculateDate / 30);
        dateString = `${calculateDate} ${type} پیش`;
      } else if (calculateDate > 364) {
        type = "سال";
        calculateDate = Math.round(calculateDate / 365);
        dateString = `${calculateDate} ${type} پیش`;
      }
      let domain = "gameshop.iapp.ir";
      const item = `
       <div class="item" id="${json.id}">
                    <a href="#" class="imgCont">
                      ${
                        json.imgSrc !==
                        "https://" + domain + "/site.php?fileSrc=images/"
                          ? ` <img
                          loading="lazy"
                          src=${json.imgSrc}
                          alt=${json.title}
                        />`
                          : `
                            <iframe
                              height="200"
                              src="${json.pageLink}"
                              allowfullscreen="true"
                              webkitallowfullscreen="true"
                              mozallowfullscreen="true"
                              style="border: 0;"
                            ></iframe>
                          `
                      }
                    </a>
                    <div class="content">
                      <div class="aboutItem">
                        <div class="from">
                          <span>${json.from}</span>
                          <div class="date">
                            <span>${dateString}</span>
                          </div>
                        </div>
                        <a href="#">
                          <h2 class="title">${json.title}</h2>
                        </a>
                        <div class="text">
                          <p>
                          ${json.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
    `;
      optionsContainer.innerHTML += item;
    });
    Array.from(optionsContainer.children).forEach((child) => {
      child.addEventListener("click", () => {
        deleteItem(child, child.id);
      });
    });
  }
  createElementSlider1();
  createElementSlider2();
  createFlageItems(optionsContainerType.value);
  optionsContainerType.addEventListener("change", () => {
    createFlageItems(optionsContainerType.value);
    console.log(1);
  });
}
main();
