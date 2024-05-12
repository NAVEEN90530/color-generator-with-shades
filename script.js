// Function to generate a random color
function generateRandomColor() {
    var color;
    do {
        color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    } while (color.length !== 7); // Ensure 6-digit hex color
    return color;
}

// Function to generate random colors and their shades
function generateRandomColors() {
    var numColors = parseInt(document.getElementById("userinput").value);
    var colorContainer = document.getElementById("colorContainer");
    colorContainer.innerHTML = ""; // Clear previous containers

    for (var i = 0; i < numColors; i++) {
        var color = generateRandomColor();
        createColorDiv(color, colorContainer);
    }
}

// Function to create a color div with copy and shade buttons
function createColorDiv(color, container) {
    var colorDiv = document.createElement("div");
    colorDiv.classList.add("color");
    colorDiv.style.backgroundColor = color;

    var colorSpan = document.createElement("span");
    colorSpan.classList.add("copy-color");
    colorSpan.innerText = color;

    var copyButton = document.createElement("button");
    copyButton.innerText = "Copy Code";
    copyButton.onclick = function() { copyColor(colorSpan); };

    var shadeButton = document.createElement("button");
    shadeButton.innerText = "Generate Shades";
    shadeButton.onclick = function() { generateShades(color); };

    colorDiv.appendChild(colorSpan);
    colorDiv.appendChild(copyButton);
    colorDiv.appendChild(shadeButton);
    container.appendChild(colorDiv);
}

// Function to copy the color code
function copyColor(element) {
    var colorHex = element.innerText;
    var tempInput = document.createElement("input");
    tempInput.value = colorHex;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");

    alert("Color code copied to clipboard: " + tempInput.value);

    
    document.body.removeChild(tempInput);
}

// Function to generate shades of a color
function generateShades(colorHex) {
    var baseColor = tinycolor(colorHex);
    var numShades = 5; // Number of shades
    var step = 20 / (2 * numShades); // Step for both darken and lighten
    var colorContainer = document.getElementById("colorContainer");

    // Remove existing shade divs
    var existingShadeDivs = document.querySelectorAll(".color.shade");
    existingShadeDivs.forEach(function(shadeDiv) {
        shadeDiv.parentNode.removeChild(shadeDiv);
    });

    // Generate darker shades
    for (var i = 1; i <= numShades; i++) {
        var shade = baseColor.darken(i * step).toString('hex');
        createColorDiv(shade, colorContainer);
        var shadeDiv = colorContainer.lastElementChild;
        shadeDiv.classList.add("shade");
    }

    // Generate lighter shades
    for (var j = 1; j <= numShades; j++) {
        var shade = baseColor.lighten(j * step).toString('hex');
        createColorDiv(shade, colorContainer);
        var shadeDiv = colorContainer.lastElementChild;
        shadeDiv.classList.add("shade");
    }
}

// Initialize: generate colors and shades
generateRandomColors();

// Event listener for refresh button
document.getElementById("refreshButton").addEventListener("click", generateRandomColors);