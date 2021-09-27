const labels = document.querySelectorAll("label");
const form = document.querySelector("form")
const inputText = document.getElementsByClassName("container-input")
let urlSearchData;
console.log(form);
console.log(inputText);
let json;
const API_KEY = "23497905-ebfa1b80f325f860fce195702";

async function start(){  
    let url = "https://pixabay.com/api/?"+ urlSearchData;
    let respons = await fetch(url);
    json = await respons.json();


    
    console.log(json)
    console.log(url)
    createImgFromSearchResult(json);
}

form.onsubmit = event => {
    const colorCheckBoxes = Array.from(document.querySelectorAll(".container-color-labels input[type=checkbox]"));
    const activColorCheckboxes = colorCheckBoxes.filter(c => c.checked);
    const activColorValue = activColorCheckboxes.map(c => c.value);
    const colorString = activColorValue.join(",");

        event.preventDefault();
        const textvalue = form.elements.text.value;
        const params = new URLSearchParams({
            page: 1,
            per_page: 10,
            key: API_KEY,
            q: textvalue,
            colors: colorString
        });


    urlSearchData = params.toString();
    start();

}


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

function checkboxMousEnterEvent(label){
    let labelcolor = document.getElementById(label.id);
    let inputcolor = document.querySelector("#"+label.id + " input");
    if(inputcolor.checked != true){
        labelcolor.style.opacity = 1;
    }
        
}

function checkboxMousLeaveEvent(label){
    let labelcolor = document.getElementById(label.id);
    let inputcolor = document.querySelector("#"+label.id + " input");
    if(inputcolor.checked != true){
        labelcolor.style.opacity = 0.4;
    }
}

function createImgContainerFromSerach(){
    let imageryContainer = document.getElementById("container-imagery");
    let createdImageryContainer = document.createElement("div");
    imageryContainer.appendChild(createdImageryContainer);
    createdImageryContainer.id = "created-imagery-container";
    createdImageryContainer.style.margin="auto";
    createdImageryContainer.style.textAlign="center"
    createdImageryContainer.style.display = "flex";
    createdImageryContainer.style.flexDirection = "row";
    createdImageryContainer.style.flexWrap = "wrap";

}

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
            createImg.style.position = "relative"
            
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
            creatTextContiner.style.opacity = "1";
            
            let createTextTags = document.createElement("p");
            creatTextContiner.appendChild(createTextTags)
            createTextTags.textContent = jsonHits[i].tags;
            
            let createTextUser = document.createElement("p");
            creatTextContiner.appendChild(createTextUser)
            createTextUser.textContent = jsonHits[i].user;
        }
        catch{

        }
    }

}
