// 1. Constants
let gridDimension = 16;
let isMouseDown = false;
let gridMode = "shade";

// 2. DOM References
let clearButton = document.querySelector(".clear");
let shadeButton = document.querySelector(".shade");
let rainbowButton = document.querySelector(".rainbow");
let eraserButton = document.querySelector(".eraser");
let alertButton = document.querySelector(".grid-alert")
let sliderText = document.querySelector(".slider-text")
let gridSlider = document.querySelector(".slider")

buttonReferenceList = [shadeButton, rainbowButton, eraserButton]

let gridTextInput = document.querySelector(".grid-text")
let gridContainer = document.querySelector(".grid-container");



// DOM Creation Functions
function gridRowCreation() {
    let gridRow = document.createElement("div");
    gridRow.style.flex = "1 1 0"
    gridRow.style.display = "flex";
    gridRow.classList.add("grid-row")
    return gridRow;
};

function gridTileCreation() {
    let gridTile = document.createElement("div");
    gridTile.classList.add("grid-tile")
    gridTile.style.border = "thin solid black"
    gridTile.style.boxSizing = "border-box"
    gridTile.style.opacity = "1"
    gridTile.style.flex = "1";
    gridTile.style.backgroundColor = "transparent";
    gridTile.addEventListener("mouseenter", () => gridTileDragListener(gridTile))
    return gridTile;
}

// 3. Logic


// 4. UI Changes

function buttonSelectionUI(gridMode) {
    let buttonSelectList = ["shade", "rainbow", "eraser"]
    buttonSelectList.forEach((mode) => {
        if (mode == gridMode) {
            let index = buttonSelectList.indexOf(mode)
            clickedButton = buttonReferenceList[index]
            clickedButton.style.backgroundColor = " #4470ff";
            clickedButton.style.color = "white";
        } else {
            let index = buttonSelectList.indexOf(mode)
            clickedButton = buttonReferenceList[index]
            clickedButton.style.backgroundColor = "#b7d8ff"
            clickedButton.style.color = "black";
        }
    })
}

function shadeMode(gridTile) {
    let currentColor = gridTile.style.backgroundColor;
    console.log(currentColor)
    if (currentColor == "transparent") {
        let newColor = "rgba(225, 205, 23, 0.1)"
        gridTile.style.backgroundColor = newColor;
    }
    else {
        opacityValue = Number(currentColor.slice(-4, -1));
        newOpacity = opacityValue + 0.1;
        console.log(newOpacity)
        let newColor = currentColor.replace(opacityValue.toString(), newOpacity.toString())
        gridTile.style.backgroundColor = newColor;
    }
}

function rainbowMode(gridTile) {
    let randomRed = Math.floor(Math.random() * 256)
    let randomGreen = Math.floor(Math.random() * 256)
    let randomBlue = Math.floor(Math.random() * 256);
    gridTile.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`
}

function eraserMode(gridTile) {
    gridTile.style.backgroundColor = "transparent";
}

function changeGridSize(gridDimension) {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    for (i = 0; i < gridDimension; i++) {
        let gridRow = gridRowCreation();
        for (j = 0; j < gridDimension; j++) {
            gridTile = gridTileCreation();
            gridRow.appendChild(gridTile);
        }
        gridContainer.appendChild(gridRow);
    }
}

// Clear Button

function clearGrid() {
    let allGridTiles = document.querySelectorAll(".grid-tile");
    allGridTiles.forEach((gridTile) => {
        gridTile.style.backgroundColor = "transparent";
    })
}


// 5. Event Listener Functions

function gridTileDragListener(gridTile) {
    gridTile.style.cursor = "pointer";
    if (isMouseDown == true) {
        if (gridMode == "shade") {
            shadeMode(gridTile);
        }
        else if (gridMode == "rainbow") {
            rainbowMode(gridTile);
        }
        else if (gridMode == "eraser") {
            eraserMode(gridTile);
        }
    }

}

// Document Mouse Listeners

document.addEventListener("mousedown", () => {
    isMouseDown = true;
})

document.addEventListener("mouseup", () => {
    isMouseDown = false;
})

// Button listeners

clearButton.addEventListener("click", () => {
    clearGrid();
})

shadeButton.addEventListener("click", () => {
    gridMode = "shade";
    buttonSelectionUI(gridMode);
})

rainbowButton.addEventListener("click", () => {
    gridMode = "rainbow";
    buttonSelectionUI(gridMode)
})

eraserButton.addEventListener("click", () => {
    gridMode = "eraser";
    buttonSelectionUI(gridMode)
})

alertButton.addEventListener("click", () => {
    let newGridDimension = prompt("Please enter grid dimension from 1 - 100", "1-100")
    if (1 <= newGridDimension && newGridDimension <= 100) {
        gridDimension = newGridDimension;
        changeGridSize(gridDimension);
    }
})

gridSlider.addEventListener("input", () => {
    gridDimension = gridSlider.value;
    sliderText.textContent = `${gridDimension} x ${gridDimension}`
    changeGridSize(gridDimension);


})

gridTextInput.addEventListener("keypress", (event) => {
    console.log(event.key)
    console.log("Hi")
    console.log(gridTextInput.textContent)
    if (event.key === "Enter") {
        gridDimension = Number(gridTextInput.value);
        changeGridSize(gridDimension);
    }
})


// Website Run
buttonSelectionUI("shade");
changeGridSize(gridDimension);