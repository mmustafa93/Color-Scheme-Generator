const schemeModes = ["Monochrome", "Monochrome-dark", "Monochrome-light", "Analogic", "Complement", "Analogic-complement", "Triad", "Quad"]

const form = document.getElementById('form')
const formBtn = document.getElementById('form-btn')
const schemeEl = document.getElementById('mode')
const chooseColor = document.getElementById('choose-color')
const schemeSectionEl = document.getElementById('scheme-section')

const baseURL = "https://www.thecolorapi.com"
const endpoint = "/scheme"


// Add scheme-modes to the dropdown menu
schemeModes.map(scheme => {
    let mode = document.createElement('option')
    mode.value = scheme
    mode.text = scheme
    schemeEl.appendChild(mode)
})

// listen for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const seedColor = chooseColor.value
    const schemeMode = schemeEl.value
    // console.log(seedColor.slice(1), schemeMode)
    
    fetchColorScheme(seedColor, schemeMode)
})

// make an API call to get the colorScheme data
async function fetchColorScheme(seedColor, schemeMode){
    url = `${baseURL}${endpoint}?hex=${seedColor.slice(1)}&mode=${schemeMode.toLowerCase()}`
    
    const res = await fetch(url)
    const colors = await res.json()
    
    const colorHexCodes = colors.colors.map(color => color.hex.value)
    const colorNames = colors.colors.map(color => color.name.value)
    console.log(colors.colors.map(color => color.name.value))
    
    renderColors(colorHexCodes, colorNames) // render the colors on the DOM
    
}

function renderColors(colorHexCodes, colorNames){
    let html = ''
    let i = 0
    
    colorHexCodes.map(color => {
        
        html += `<div class="class-container">
        <div class = "color-display" style="background-color:${color}">
        </div>
        <div class="color-details">
            <p class="color-hex-code">${color}</p>
            <p class="color-title">${colorNames[i]}</p> 
        </div>
        </div>
        `
        i++
    })
    
    schemeSectionEl.innerHTML = `<div class="colors-container">${html}</div>`
}

// function copyHexCode(){
//     let hexCodeEl = document.getElementById('color-title')
//     console.log(hexCodeEl)
// } in progress to copy hexcodes