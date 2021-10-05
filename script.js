const labels = document.querySelectorAll("label");
const form = document.querySelector("form")
const inputText = document.getElementsByClassName("container-input")
let urlSearchData;
console.log(form);
console.log(inputText);
let json;
const API_KEY = "23497905-ebfa1b80f325f860fce195702";
let pageNumber = 1;
let pageNumberMax = 1;
let params;

// Fetching API from Pixabay
async function start() {
    let url = "https://pixabay.com/api/?" + params.toString();
    let respons = await fetch(url);
    json = await respons.json();

    console.log(json)
    console.log(url)
    createImgFromSearchResult(json);
    numberOfPages();
    navCurrentPage()
}

// When search button is clicked. Checks which color-checkboxes are checked and creates a string to send with the other URL search parameters
form.onsubmit = event => {

    pageNumber = 1;
    const colorCheckBoxes = Array.from(document.querySelectorAll(".container-color-labels input[type=checkbox]"));
    const activeColorCheckboxes = colorCheckBoxes.filter(c => c.checked);
    const activeColorValue = activeColorCheckboxes.map(c => c.value);
    const colorString = activeColorValue.join(",");

    event.preventDefault();
    const textvalue = form.elements.text.value;
    params = new URLSearchParams({
        page: pageNumber,
        per_page: 10,
        key: API_KEY,
        q: textvalue,
        colors: colorString
    });


    start();

}

// Makes color change from having opacity to 0 opacity when clicked
function checkboxCSSChange(color) {
    let labelcolor = document.getElementById("label-" + color.value);
    let inputcolor = document.getElementById("input-color-" + color.value);

    let selectedColor = color.value;
    if (inputcolor.checked) {
        labelcolor.style.backgroundColor = selectedColor
        labelcolor.style.opacity = 1;
    }
    if (inputcolor.checked != true) {
        labelcolor.style.opacity = 0.4;
    }
}


// Create a div container for the image gallery and place inside the already existing div element "container-imagery"
function createImgContainerFromSearch() {
    let imageryContainer = document.getElementById("container-imagery");

    try {
        let remove = document.getElementById("created-imagery-container");
        imageryContainer.removeChild(remove);
    }
    catch {

    }

    let createdImageryContainer = document.createElement("div");
    imageryContainer.appendChild(createdImageryContainer);
    createdImageryContainer.id = "created-imagery-container";
    createdImageryContainer.style.margin = "auto";
    createdImageryContainer.style.textAlign = "center"
    createdImageryContainer.style.display = "flex";
    createdImageryContainer.style.flexDirection = "row";
    createdImageryContainer.style.flexWrap = "wrap";

}

// Create a div for each image, then create img from json result and tag text and add both to the div
function createImgFromSearchResult(json) {

    createImgContainerFromSearch();

    let jsonHits = json.hits;

    for (let i = 0; i < 10; i++) {

        try {
            let continer = document.getElementById("created-imagery-container");
            let createImgDiv = document.createElement("div")
            continer.appendChild(createImgDiv)
            createImgDiv.id = "container-img-" + i;
            createImgDiv.style.margin = "auto";

            let createImg = document.createElement("img")
            createImgDiv.appendChild(createImg);
            createImg.id = "img-" + i;
            createImg.src = jsonHits[i].webformatURL;
            createImg.style.padding = "15px";
            createImg.style.borderRadius = "30px";
            createImg.style.width = "100%";
            createImg.style.margin = "auto"
            createImg.style.maxWidth = "400px"

            let createTextContiner = document.createElement("div");
            createImgDiv.appendChild(createTextContiner);
            createTextContiner.id = "continer-text-" + i;
            createTextContiner.style.fontSize = "20px"
            createTextContiner.style.color = "white"
            createTextContiner.style.bottom = "75px"
            createTextContiner.style.width = "350px"
            createTextContiner.style.borderRadius = "10px"
            createTextContiner.style.backgroundColor = "rgba(56, 56, 56, 0.4)"
            createTextContiner.style.margin = "auto";

            let createTextTags = document.createElement("p");
            createTextContiner.appendChild(createTextTags)
            createTextTags.textContent = jsonHits[i].tags;

            let createTextUser = document.createElement("p");
            createTextContiner.appendChild(createTextUser)
            createTextUser.textContent = jsonHits[i].user;
        }
        catch { }
    }

}

// Check total number of images from serachresult and set total number of pages accordingly
function numberOfPages() {
    pageNumberMax = Math.ceil(json.totalHits / 10);

    let lastPageValue = document.getElementById("last-page");
    lastPageValue.value = pageNumberMax;
}

function previousButtonClick(previous) {
    if (pageNumber > 1) {
        params.set("page", (pageNumber - parseInt(previous.name)));
        pageNumber = (pageNumber - parseInt(previous.name));
    }
    start();
}

function nextButtonClick(next) {
    if (pageNumber < pageNumberMax) {
        params.set("page", (pageNumber + parseInt(next.name)));
        pageNumber = (pageNumber + parseInt(next.name));
    }
    start();
}

function navFirstPage(firstPage) {
    pageNumber = parseInt(firstPage.value);
    params.set("page", pageNumber);

    start();
}

function navPreviousPage(priviousPage) {
    pageNumber = parseInt(priviousPage.value);
    params.set("page", pageNumber);

    start();
}

function navCurrentPage() {
    let firstPage = document.getElementById("first-page");
    firstPage.value = 1;

    let previousPage = document.getElementById("previous-page");
    if (pageNumber <= 2) {
        previousPage.hidden = true;
    }
    else {
        previousPage.hidden = false;
        previousPage.value = pageNumber - 1;
    }

    let currentPage = document.getElementById("current-page");
    currentPage.value = pageNumber;
    currentPage.style.backgroundColor = "black"

    let nextPage = document.getElementById("next-page");
    if (pageNumber >= (pageNumberMax - 1)) {
        nextPage.hidden = true;
    }
    else {
        nextPage.hidden = false;
        nextPage.value = pageNumber + 1;
    }

    let lastPage = document.getElementById("last-page");
    lastPage.value = pageNumberMax;

    const previousButton = document.getElementById("previous-input");
    const nextButton = document.getElementById("next-input");

    if(pageNumber <= 1){
        firstPage.hidden = true;
        previousButton.hidden = true;
    }
    else{
        firstPage.hidden = false;
        previousButton.hidden = false;
    }

    if(pageNumber >= pageNumberMax){
        lastPage.hidden = true;
        nextButton.hidden = true;
    }
    else{
        lastPage.hidden = false;
        nextButton.hidden = false;
    }

}

function navNextPage(nextPage) {
    pageNumber = parseInt(nextPage.value);
    params.set("page", pageNumber);

    start();
}

function navLastPage(lastPage) {
    pageNumber = pageNumberMax;
    params.set("page", pageNumber);

    start();
}
