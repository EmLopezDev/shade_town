import { sunglassesOptions, defaultSunglasses } from "./sunglassesOptions";

const productDetailsEl = document.getElementById("productDetails");
const productImage = document.getElementById("productImage");
const productFrames = document.getElementsByClassName("product-image_frame")[0];
const productLenses = document.getElementsByClassName(
    "product-image_lenses"
)[0];

let sunglassesNew = "";

function setSunglasses(sunglassesNew = defaultSunglasses) {
    return sunglassesNew;
}

function render(sunglasses) {
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
    if (clickedItem.classList.contains("product-thumb")) {
        Array.from(document.getElementsByClassName("product-thumb")).forEach(
            (thumb) => {
                thumb.classList.remove("selected");
            }
        );
    } else if (clickedItem.classList.contains("product-color-swatch")) {
        const siblings = clickedItem.closest("ul").querySelectorAll("button");
        Array.from(siblings).forEach((swatch) => {
            swatch.classList.remove("selected");
        });
    }
    clickedItem.classList.add("selected");
}

document.body.addEventListener("click", (event) => {
    const clickedItem = event.target;

    sunglassesNew = !sunglassesNew ? defaultSunglasses : sunglassesNew;

    if (clickedItem.classList.contains("product-thumb")) {
        const {
            dataset: { name: currName },
        } = clickedItem;

        const modelOptions = sunglassesOptions.models.filter(({ name }) => {
            return name === currName;
        })[0];

        const { name, price, thumbImg, cssClass } = modelOptions;
        const {
            lenses: {
                color: lenseColor,
                price: lensePrice,
                cssClass: lenseCSS,
            },
            frame: { color: frameColor, price: framePrice, cssClass: frameCSS },
        } = sunglassesNew;

        sunglassesNew = {
            model: {
                name,
                price,
                thumbImg,
                cssClass,
            },
            lenses: {
                color: lenseColor,
                price: lensePrice,
                cssClass: lenseCSS,
            },
            frame: {
                color: frameColor,
                price: framePrice,
                cssClass: frameCSS,
            },
        };

        addHighlight(clickedItem);
        setSunglasses(sunglassesNew);
        render(sunglassesNew);
    }

    // update colors for frames / lenses
    if (clickedItem.classList.contains("product-color-swatch")) {
        const {
            dataset: { color: currColor },
        } = clickedItem;

        // check nearest parent div
        //lenses
        if (clickedItem.closest("div").classList[0] === "product-lenses") {
            var colorOptions = sunglassesOptions.lenses.filter(function (item) {
                return item.color === currColor;
            })[0];

            var color = colorOptions.color;
            var price = colorOptions.price;
            var cssClass = colorOptions.cssClass;

            sunglassesNew = {
                model: {
                    name: sunglassesNew.model.name,
                    price: sunglassesNew.model.price,
                    thumbImg: sunglassesNew.model.price,
                    cssClass: sunglassesNew.model.cssClass,
                },
                lenses: {
                    color: color,
                    price: price,
                    cssClass: cssClass,
                },
                frame: {
                    color: sunglassesNew.frame.color,
                    price: sunglassesNew.frame.price,
                    cssClass: sunglassesNew.frame.cssClass,
                },
            };
        }

        //frames
        else {
            var colorOptions = sunglassesOptions.frames.filter(function (item) {
                return item.color === currColor;
            })[0];

            var color = colorOptions.color;
            var price = colorOptions.price;
            var cssClass = colorOptions.cssClass;

            sunglassesNew = {
                model: {
                    name: sunglassesNew.model.name,
                    price: sunglassesNew.model.price,
                    thumbImg: sunglassesNew.model.price,
                    cssClass: sunglassesNew.model.cssClass,
                },
                lenses: {
                    color: sunglassesNew.lenses.color,
                    price: sunglassesNew.lenses.price,
                    cssClass: sunglassesNew.lenses.cssClass,
                },
                frame: {
                    color: color,
                    price: price,
                    cssClass: cssClass,
                },
            };
        }

        addHighlight(clickedItem);
        setSunglasses(sunglassesNew);
        render(sunglassesNew);
    }
});

render(defaultSunglasses);
