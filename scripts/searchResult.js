const searchResultsCont = document.querySelector("#searchResultsCont");
const titlePage = document.querySelector("title");
let searchValue = localStorage.getItem("search");
let emptyContent = [];
emptyContent.push(searchResultsCont.querySelector(".emptyResult"));
searchResultsCont.querySelector(".emptyResult").remove();

async function getData(api) {
  let data = await (await fetch(api)).json();
  return data;
}
function createItems(item) {
  const a = document.createElement("a");
  const img = document.createElement("img");
  const span = document.createElement("span");

  img.src = item.imgSrc;
  span.textContent = item.title;
  a.classList.add("item");
  a.appendChild(img);
  a.appendChild(span);
  searchResultsCont.appendChild(a);
}
async function checkItems() {
  if (!searchValue) {
    titlePage.textContent = "نتیجه‌ای پیدا نشد.";
    searchResultsCont.children.length === 0
      ? searchResultsCont.appendChild(emptyContent[0])
      : [];
    return;
  }
  let data = await getData("../../assets/json/searchResult.json");
  window.location.hash = searchValue;
  titlePage.textContent = searchValue;
  data.forEach((item, index) => {
    if (
      String(item.title).includes(searchValue) ||
      String(item.hasTags).includes(searchValue.replace(" ", "_"))
    ) {
      searchResultsCont.querySelector(".emptyResult")
        ? searchResultsCont.querySelector(".emptyResult").remove()
        : [];
      createItems(item);
    }
  });
  localStorage.removeItem("search");
  searchResultsCont.children.length === 0
    ? searchResultsCont.appendChild(emptyContent[0])
    : [];
}
checkItems();
searchCont.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!searchCont.children[0].value)
    return searchCont.classList.add("emptySearch");
  let a = document.createElement("a");
  a.href = "./index.html";
  localStorage.setItem("search", searchCont.children[0].value);
  a.click();
});
