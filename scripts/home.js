function main() {
  const habergerIcon = document.querySelector(".habergerIcon");
  const headerDiv = document.querySelector(".headerDiv");
  const videoCont = document.querySelector(".videoCont");
  const searchIcon = document.querySelector(".searchIcon");
  const searchCont = document.querySelector(".searchCont");
  const closeSearch = document.querySelector(".closeSearch");
  const optionsSite = document.querySelectorAll(".options ul li");
  const loadingCont = document.querySelector(".loadingCont");

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
