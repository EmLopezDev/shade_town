import { sunglassesOptions, defaultSunglasses } from "./sunglassesOptions";

const productDetailsEl = document.getElementById("productDetails");
const productImage = document.getElementById("productImage");
const productFrames = document.getElementsByClassName("product-image_frame")[0];
const productLenses = document.getElementsByClassName(
    "product-image_lenses"
)[0];

let selectedSunglasses = setSelectedSunglasses();

const {
    models: modelOptions,
    lenses: lenseOptions,
    frames: frameOptions,
} = sunglassesOptions;

function setSelectedSunglasses(sunglasses = defaultSunglasses) {
    return sunglasses;
}

function setSelectedSunglassesModel(options, selectedModel) {
    const [modelOption] = options.filter(({ name }) => {
        return name === selectedModel;
    });

    const { name, price, thumbImg, cssClass } = modelOption;

    selectedSunglasses.model = {
        name,
        price,
        thumbImg,
        cssClass,
    };
}

function setSelectedSunglassesColor(type, options, selectedColor) {
    const [lenseColorOption] = options.filter(({ color }) => {
        return color === selectedColor;
    });
    const { color, price, cssClass } = lenseColorOption;

    selectedSunglasses[type] = {
        color: color,
        price: price,
        cssClass: cssClass,
    };
}

function renderDetails(sunglasses) {
    const {
        model: { name, price: modelPrice, cssClass: modelCSS },
        lenses: { color: lenseColor, price: lensePrice, cssClass: lensesCSS },
        frame: { color: frameColor, price: framePrice, cssClass: frameCSS },
    } = sunglasses;

    const priceDisplay = "$" + (modelPrice + lensePrice + framePrice);

    productDetailsEl.innerHTML = `
        <h1>${name}</h1>
        <p>Custom: ${lenseColor} lenses, ${frameColor} frame</p>
        <p>${priceDisplay}</p>
    `;

    const [, currClass] = productImage.classList;
    productImage.classList.replace(currClass, modelCSS);

    const [, currFramesClass] = productFrames.classList;
    productFrames.classList.replace(currFramesClass, frameCSS);

    const [, currLensesClass] = productLenses.classList;
    productLenses.classList.replace(currLensesClass, lensesCSS);
}

//Highlight current selection
function addHighlight(clickedItem) {
    const { classList } = clickedItem;
    if (classList.contains("product-thumb")) {
        Array.from(document.getElementsByClassName("product-thumb")).forEach(
            ({ classList }) => classList.remove("selected")
        );
    } else {
        const siblings = clickedItem.closest("ul").querySelectorAll("button");
        Array.from(siblings).forEach(({ classList }) => {
            classList.remove("selected");
        });
    }
    clickedItem.classList.add("selected");
}

document.body.addEventListener("click", ({ target: clickedItem }) => {
    const {
        dataset: { color: selectedColor, name: selectedModel },
    } = clickedItem;

    if (clickedItem.classList.contains("product-thumb")) {
        setSelectedSunglassesModel(modelOptions, selectedModel);
    }

    if (clickedItem.classList.contains("product-color-swatch")) {
        // check nearest parent div
        //lenses
        if (clickedItem.closest("div").classList[0] === "product-lenses") {
            setSelectedSunglassesColor("lenses", lenseOptions, selectedColor);
        } else {
            setSelectedSunglassesColor("frame", frameOptions, selectedColor);
        }
    }
    addHighlight(clickedItem);
    setSelectedSunglasses(selectedSunglasses);
    renderDetails(selectedSunglasses);
});

renderDetails(defaultSunglasses);
