const searchResultsCont = document.querySelector("#searchResultsCont");
const titlePage = document.querySelector("title");
const searchInput = document.querySelector("#searchInput");

let searchValue = localStorage.getItem("search");
let emptyContent = [];
emptyContent.push(searchResultsCont.querySelector(".emptyResult"));
searchResultsCont.querySelector(".emptyResult").remove();

async function getData(api) {
  let data = await (await fetch(api)).json();
  return data;
}
function newArrFromLetters(string) {
  let letters = [];
  let lettersIndex = 0;
  let text = "";
  let ind = 1;

  Array.from(string).forEach((lett, index) => {
    if (lett !== " ") {
      text += lett;
      letters[lettersIndex] = text;
    } else {
      lettersIndex++;
      text = "";
    }
  });
  return letters;
}

function createItems(item) {
  const a = document.createElement("a");
  const img = document.createElement("img");
  const span = document.createElement("span");
  img.src = item.imgSrc;
  span.textContent = item.underImgText;
  a.classList.add("item");
  a.appendChild(img);
  a.appendChild(span);
  searchResultsCont.appendChild(a);
}
async function checkItems() {
  if (!searchValue) {
    titlePage.textContent = "نتیجه‌ای پیدا نشد.";
    history.replaceState({}, document.title, ".");
    searchResultsCont.children.length === 0
      ? searchResultsCont.appendChild(emptyContent[0])
      : [];
    return;
  }
  let data = await getData("../../site.php?json=searchResult");
  titlePage.textContent = searchValue;
  searchInput.value = searchValue;
  let arrFromSearchValue = newArrFromLetters(searchValue);
  window.location.hash = searchValue;

  data.forEach((item) => {
    let isFound = false;
    arrFromSearchValue.forEach((search, index) => {
      if (item.underImgText && String(item.underImgText).includes(search)) {
        isFound = true;
      } else if (item.hashTag && String(item.hashTag).includes(search)) {
        isFound = true;
      }
    });
    if (
      (item.underImgText &&
        (String(item.underImgText).includes(searchValue) ||
          String(searchValue).includes(item.underImgText))) ||
      (item.hashTag &&
        (String(searchValue).includes(item.hashTag) ||
          String(item.hashTag).includes(searchValue))) ||
      isFound
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
