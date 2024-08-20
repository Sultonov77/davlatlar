const body = document.body;
const header = document.querySelector("header");
let countryList = document.querySelector(".countries-list");
let selectCountry = document.querySelector(".select-country");
let searchSection = document.querySelector(".search-section");
let likeList = document.querySelector(".like-list");
let saveList = document.querySelector(".save-list");
let likeCount = document.querySelector(".like-count");
let saveCount = document.querySelector(".save-count");
let elModal = document.querySelector(".modal");
let elWrapper = document.querySelector("#wrapper")
// cards
function allCountries(arr, list) {
  list.innerHTML = " ";
  arr.forEach((value) => {
    let elItem = document.createElement("li");
    let elImg = document.createElement("img");
    let elName = document.createElement("h2");
    let elCapital = document.createElement("p");
    let elPopulation = document.createElement("p");
    let elIdtag = document.createElement("span");
    let elLike = document.createElement("button");
    let elSave = document.createElement("button");
    let elMore = document.createElement("button");

    elItem.className =
      "w-[300px] hover:scale-105 duration-200 z-0 p-2 m-6 bg-slate-300 rounded-[10px]";
    elImg.src = value.flag;
    elImg.className = "w-[100%] h-[200px] rounded-[10px] ";
    elName.textContent = "Country: " + value.name;
    elName.className = "font-bold text-[22px] mb-2";
    elCapital.textContent = "Capital: " + value.capital;
    elCapital.className = "text-[20px]  text-blue-800 mb-1";
    elPopulation.textContent = "Population: " + value.population;
    elPopulation.className = "text-[18px] text-zinc-700";
    elIdtag.textContent = "Country: " + value.id;
    elIdtag.className = "text-[18px] text-teal-800 flex";
    elLike.innerHTML = `
    <svg id = ${value.id} width="30px" height="30px" viewBox="0 0 24 24" fill=${
      value.isLike ? "red" : "white"
    } xmlns="http://www.w3.org/2000/svg">
<path  id = ${
      value.id
    } fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    elLike.className = `rounded-md  m-2`;
    elLike.id = value.id;
    elSave.innerHTML = `
    <svg id = ${
      value.id
    } width="30px" height="30px" class="scale-125" viewBox="0 0 24 24"  fill=${
      value.isSave ? "blue" : "white"
    } xmlns="http://www.w3.org/2000/svg">
<path id = ${
      value.id
    } fill-rule="evenodd" clip-rule="evenodd" d="M6.75 6L7.5 5.25H16.5L17.25 6V19.3162L12 16.2051L6.75 19.3162V6ZM8.25 6.75V16.6838L12 14.4615L15.75 16.6838V6.75H8.25Z" />
</svg`;
    elSave.className = ` rounded-md m-2`;
    elSave.id = value.id;
    elMore.className =
      "text-md  flex border-slate-700 border rounded-md px-3 py-1 hover:bg-blue-900 hover:text-white transition-all duration-500";

    elMore.textContent = "More info";
    elMore.id = value.id;

    elItem.append(
      elImg,
      elName,
      elCapital,
      elPopulation,
      elIdtag,
      elLike,
      elSave,
      elMore
    );
    list.append(elItem);

    elLike.addEventListener("click", (e) => {
      let findObject = countrys.find((item) => item.id == e.target.id);
      findObject.isLike = !findObject.isLike;
      allCountries(countrys, countryList);
      likeCount.textContent = countrys.filter(
        (item) => item.isLike == true
      ).length;
    });
    elSave.addEventListener("click", (e) => {
      let findObject1 = countrys.find((item) => item.id == e.target.id);
      findObject1.isSave = !findObject1.isSave;
      allCountries(countrys, countryList);
      saveCount.textContent = countrys.filter(
        (item) => item.isSave == true
      ).length;
    });
    elMore.addEventListener("click", (e) => {
      const findObj = countrys.find((item) => item.id == e.target.id);
      elModal.classList.remove("hidden");
      elModal.innerHTML = `
   <div class="flex items-center justify-between">
      <img src=${findObj.flag} width="300" height="280"/>
      <div>
        <h2 class="scale-125">${findObj.name}</h2>
        <h2 class="scale-125">${findObj.capital}</h2>
        <h2 class="scale-125">Population:${findObj.population}</h2>
        <h2 class="scale-125">ID:${findObj.id}</h2>
      </div>
      <button  id="hide-btn" class="absolute top-0 right-0 border rounded-md top-2 right-2">
      Exit
       </button>
    </div> `;
    
    });
  });
}
allCountries(countrys, countryList);
// modal page
elModal.addEventListener("click", function (e) {
  if (e.target.matches("#hide-btn")) {
    elModal.classList.add("hidden");
  }
});
// liked countries list
likeList.addEventListener("click", () => {
  const likedList = countrys.filter((item) => item.isLike == true);
  allCountries(likedList, countryList);
});
// saved countries list
saveList.addEventListener("click", () => {
  const savedList = countrys.filter((item) => item.isSave == true);
  allCountries(savedList, countryList);
});
// option section
countrys.forEach((value) => {
  let elOption = document.createElement("option");
  elOption.textContent = value.name + "  " + value.capital;
  elOption.setAttribute("value", value.capital);
  selectCountry.append(elOption);
});
// change option section
selectCountry.addEventListener("change", (evt) => {
  if (evt.target.value == "All") {
    allCountries(countrys, countryList);
  } else {
    let selectedOption = countrys.filter(
      (item) => item.capital == evt.target.value
    );
    allCountries(selectedOption, countryList);
  }
});
// search mode
searchSection.addEventListener("keyup", (evt) => {
  const searchValue = evt.target.value;
  if (Number(searchValue)) {
    const searchList = countrys.filter((item) =>
      String(item.population).includes(searchValue.trim())
    );
    allCountries(searchList, countryList);
  } else {
    const searchList = countrys.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase().trim())
    );
    allCountries(searchList, countryList);
  }
});
// dark mode
const darkModeToggle = document.getElementById("dark-mode-toggle");
let isDarkMode = false;
darkModeToggle.addEventListener("click", () => {
  if (isDarkMode) {
    body.classList.remove("dark-mode");
    header.classList.remove("dark-mode");
    selectCountry.classList.remove("dark-mode");
    searchSection.classList.remove("dark-mode");
    isDarkMode = false;
  } else {
    body.classList.add("dark-mode");
    header.classList.add("dark-mode");
    searchSection.classList.add("dark-mode");
    selectCountry.classList.add("dark-mode");
    isDarkMode = true;
  }
});
