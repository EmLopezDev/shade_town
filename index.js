var sunglassesOptions = {
    models: [
        {
            name: "aviator",
            price: 300,
            thumbImg: "thumb-aviator.png",
            cssClass: "frame-aviator",
        },
        {      
            name: "half-frame",
            price: 200,
            thumbImg: "thumb-half-frame.png",
            cssClass: "frame-half",
        },
        {
            name: "round",  
            price: 250,
            thumbImg: "thumb-round.png",
            cssClass: "frame-round",
        },
        {  
            name: "wayfarer",
            price: 250,
            thumbImg: "thumb-wayfarer.png",
            cssClass: "frame-wayfarer",
        }],
    lenses: [
        {
            color: "sepia",
            price: 20,
            cssClass: "color-sepia",
        },
        {
            color: "rainbow",
            price: 50,
            cssClass: "color-rainbow",
        },
        {
            color: "iridescent",
            price: 30,
            cssClass: "color-iridescent",
        }],
    frames: [
        {
            color: "charcoal",
            price: 0,
            cssClass: "color-charcoal",
        },
        {
            color: "tan",
            price: 0,
            cssClass: "color-tan",
        },
        {
            color: "rose",
            price: 0,
            cssClass: "color-rose",
        },
    ],
}

var sunglasses = {
    model: {
        name: "aviator",
        price: 300,
        thumbImg: "./images/thumb-aviator.png",
        cssClass: "frame-aviator",
    },
    lenses: {
        color: "sepia",
        price: 20,
        cssClass: "color-sepia",
    },
    frame: {
        color: "charcoal",
        price: 0,
        cssClass: "color-charcoal",
    }     
}



var productDetailsEl = document.getElementById("productDetails")
var productImage = document.getElementById("productImage")
var productFrames = document.getElementsByClassName("product-image_frame")[0]
var productLenses = document.getElementsByClassName("product-image_lenses")[0]

var sunglassesNew = ''

function setSunglasses(sunglassesNew = sunglasses) {
    return sunglassesNew
}

function render(sunglassesNew) {
    
    var sunglassesNew = {
        model: {
            name: sunglassesNew.model.name,
            price: sunglassesNew.model.price,
            thumbImg: sunglassesNew.model.thumbImg,
            cssClass: sunglassesNew.model.cssClass,
        },
        lenses: {
            color: sunglassesNew.lenses.color,
            price: sunglassesNew.lenses.price,
            cssClass: sunglassesNew.lenses.cssClass,
        },
        frame: {
            color: sunglassesNew.frame.color,
            price: sunglassesNew.frame.price,
            cssClass: sunglassesNew.frame.cssClass,
        }     
    }
    var price = "$" + (sunglassesNew.model.price + sunglassesNew.lenses.price + sunglassesNew.frame.price)
    
  
    productDetailsEl.innerHTML = 
    "<h1>" + sunglassesNew.model.name + "</h1>" +
    "<p>Custom: "  + sunglassesNew.lenses.color + " lenses, " + sunglassesNew.frame.color + " frames</p>" +
    "<p>" + price + "</p>"
    
    var currClass = productImage.classList[1]
    productImage.classList.replace(currClass, sunglassesNew.model.cssClass)
    
    var currFramesClass = productFrames.classList[1]
    productFrames.classList.replace(currFramesClass, sunglassesNew.frame.cssClass)
    
    var currLensesClass = productLenses.classList[1]
    productLenses.classList.replace(currLensesClass, sunglassesNew.lenses.cssClass)
    
}

//Highlight current selection
function addHighlight(clickedItem) {
    if (clickedItem.classList.contains("product-thumb")) {
        Array.from(document.getElementsByClassName("product-thumb"))
            .forEach(function(thumb) {
               thumb.classList.remove("selected") 
            }) 
    } else if (clickedItem.classList.contains("product-color-swatch")) {
        var siblings = clickedItem.closest("ul").querySelectorAll("button")
        Array.from(siblings)
            .forEach(function(swatch) {
               swatch.classList.remove("selected") 
            })
    }
    clickedItem.classList.add("selected") 
}


document.body.addEventListener("click", function(event) {
    var clickedItem = event.target
    //if sunglassesNew defined take variable from updates 
        //else use original sunglasses object
    if (!sunglassesNew) {
        sunglassesNew = sunglasses
    }
    
    // update model
    if (clickedItem.classList.contains("product-thumb")) {

        var currName = clickedItem.dataset.name

        var modelOptions = sunglassesOptions.models
        .filter(function(item) {
            return item.name === currName
        })[0]
        
        var name = modelOptions.name
        var price = modelOptions.price
        var thumbImg = modelOptions.thumbImg
        var cssClass = modelOptions.cssClass
        
        sunglassesNew = {
            model: {
                name: name,
                price: price,
                thumbImg: sunglassesNew.model.thumbImg,
                cssClass: cssClass,
            },
            lenses: {
                color: sunglassesNew.lenses.color,
                price: sunglassesNew.lenses.price,
                cssClass: sunglassesNew.lenses.cssClass,
            },
            frame: {
                color: sunglassesNew.frame.color,
                price: sunglassesNew.frame.price,
                cssClass: sunglassesNew.frame.cssClass,
            }     
        }
       
        addHighlight(clickedItem)
        setSunglasses(sunglassesNew)
        render(sunglassesNew)
    }
    
    // update colors for frames / lenses
    if (clickedItem.classList.contains("product-color-swatch")) {
        var currColor = clickedItem.dataset.color
        
        // check nearest parent div
            //lenses
        if (clickedItem.closest("div").classList[0] === "product-lenses") {
            var colorOptions = sunglassesOptions.lenses
            .filter(function(item) {
                return item.color === currColor
            })[0]
            
            var color = colorOptions.color
            var price = colorOptions.price
            var cssClass = colorOptions.cssClass
        
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
                }     
            }
        } 
        
        //frames
        else {
            var colorOptions = sunglassesOptions.frames
            .filter(function(item) {
                return item.color === currColor
            })[0]
            
            var color = colorOptions.color
            var price = colorOptions.price
            var cssClass = colorOptions.cssClass
            
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
                }     
            }
        }

        addHighlight(clickedItem)
        setSunglasses(sunglassesNew)
        render(sunglassesNew)
    }
})

render(sunglasses)