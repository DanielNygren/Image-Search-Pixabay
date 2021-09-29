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
async function start(){  
    let url = "https://pixabay.com/api/?" + params.toString();
    let respons = await fetch(url);
    json = await respons.json();

    console.log(json)
    console.log(url)
    createImgFromSearchResult(json);
    numberOfPages();
    navCurrentPage()
}

// When search button is clicked. Checks which colors-checkboxes are checked and creates a string to send with the other URL search parameters
form.onsubmit = event => {
    const colorCheckBoxes = Array.from(document.querySelectorAll(".container-color-labels input[type=checkbox]"));
    const activColorCheckboxes = colorCheckBoxes.filter(c => c.checked);
    const activColorValue = activColorCheckboxes.map(c => c.value);
    const colorString = activColorValue.join(",");

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

// Makes color change from having opacity to 0 opacity when its clicked
function checkboxCSSChange(color){
    let labelcolor = document.getElementById("label-" + color.value);
    let inputcolor = document.getElementById("input-color-" + color.value);

    let selectedColor = color.value;
    if(inputcolor.checked){
        labelcolor.style.backgroundColor=selectedColor
        labelcolor.style.opacity = 1;
    }
    if(inputcolor.checked != true){
        labelcolor.style.opacity = 0.4;
    }
}

// Changes color to 0 opacity when mouse hovers
function checkboxMousEnterEvent(label){
    let labelcolor = document.getElementById(label.id);
    let inputcolor = document.querySelector("#"+label.id + " input");
    if(inputcolor.checked != true){
        labelcolor.style.opacity = 1;
    }
        
}
// Puts back opacity when mouse leaves
function checkboxMousLeaveEvent(label){
    let labelcolor = document.getElementById(label.id);
    let inputcolor = document.querySelector("#"+label.id + " input");
    if(inputcolor.checked != true){
        labelcolor.style.opacity = 0.4;
    }
}

// Create a div container for the image gallery and place inside the already existing div element "container-imagery"
function createImgContainerFromSerach(){
    let imageryContainer = document.getElementById("container-imagery");

    try{
        let remove = document.getElementById("created-imagery-container");
        imageryContainer.removeChild(remove);
    }
    catch{

    }

    
    let createdImageryContainer = document.createElement("div");
    imageryContainer.appendChild(createdImageryContainer);
    createdImageryContainer.id = "created-imagery-container";
    createdImageryContainer.style.margin="auto";
    createdImageryContainer.style.textAlign="center"
    createdImageryContainer.style.display = "flex";
    createdImageryContainer.style.flexDirection = "row";
    createdImageryContainer.style.flexWrap = "wrap";

}

// Create a div for each image, then create img from json result and tag text and add to the div
function createImgFromSearchResult(json){

    createImgContainerFromSerach();

    let jsonHits = json.hits;

    for (let i = 0; i < 10; i++){
        
        try{
            let continer = document.getElementById("created-imagery-container");
            let createImgDiv = document.createElement("div")
            continer.appendChild(createImgDiv)
            createImgDiv.id = "container-img-" + i;
            createImgDiv.style.margin="auto";
            
            let createImg = document.createElement("img")
            createImgDiv.appendChild(createImg);
            createImg.id = "img-" + i;
            createImg.src = jsonHits[i].webformatURL;
            createImg.style.padding="15px";
            createImg.style.borderRadius="30px";
            createImg.style.width="100%";
            createImg.style.margin="auto"
            createImg.style.maxWidth="400px"
            
            let creatTextContiner = document.createElement("div");
            createImgDiv.appendChild(creatTextContiner);
            creatTextContiner.id = "continer-text-" + i;
            creatTextContiner.style.fontSize = "20px"
            creatTextContiner.style.color = "white"
            creatTextContiner.style.bottom = "75px"
            creatTextContiner.style.width = "350px"
            creatTextContiner.style.borderRadius = "10px"
            creatTextContiner.style.backgroundColor = "rgba(56, 56, 56, 0.4)"
            creatTextContiner.style.margin = "auto";
            
            let createTextTags = document.createElement("p");
            creatTextContiner.appendChild(createTextTags)
            createTextTags.textContent = jsonHits[i].tags;
            
            let createTextUser = document.createElement("p");
            creatTextContiner.appendChild(createTextUser)
            createTextUser.textContent = jsonHits[i].user;
        }
        catch{}
    }

}

// Check total number of pages from serachresult
function numberOfPages(){
    pageNumberMax= Math.ceil(json.totalHits/10);

    let lastPageValue = document.getElementById("last-page");
    lastPageValue.value=pageNumberMax;
}

function previousButtonClick(previous){
    if(pageNumber>1){
        params.set("page" , (pageNumber - parseInt(previous.name)));
        pageNumber = (pageNumber - parseInt(previous.name));
    }
    start();
}

function nextButtonClick(next){
    if(pageNumber<pageNumberMax){
        params.set("page" , (pageNumber + parseInt(next.name)));
        pageNumber = (pageNumber + parseInt(next.name));
    }
    start();
}

function navFirstPage(firstPage){
    pageNumber = parseInt(firstPage.value);
    params.set("page", pageNumber);

    start();
}

function navPreviousPage(priviousPage){
    pageNumber = parseInt(priviousPage.value);
    params.set("page", pageNumber);

    start();
}

function navCurrentPage(){
    let firstPage = document.getElementById("first-page");
    firstPage.value = 1;

    let previousPage = document.getElementById("previous-page");
        if(pageNumber <= 2){
            previousPage.hidden = true;
        }
        else{
            previousPage.hidden = false;
            previousPage.value = pageNumber - 1;
        }

    let currentPage = document.getElementById("current-page");
    currentPage.value = pageNumber;
    currentPage.style.backgroundColor = "black"

    let nextPage = document.getElementById("next-page");
    if(pageNumber >= (pageNumberMax-1)){
        nextPage.hidden = true;
    }
    else{
        nextPage.hidden = false;
        nextPage.value = pageNumber + 1;
    }

    let lastPage = document.getElementById("last-page");
    lastPage.value = pageNumberMax;
    
}

function navNextPage(nextPage){
    pageNumber = parseInt(nextPage.value);
    params.set("page", pageNumber);

    start();
}

function navLastPage(lastPage){
    pageNumber = pageNumberMax;
    params.set("page", pageNumber);

    start();
}
