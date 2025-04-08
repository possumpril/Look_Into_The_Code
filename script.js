// float tilesX, tilesY, tilesH, tilesW;
let helvetica, ibmplex, ibmplexMedium;
let helvSize;
let ibmplexSize;
let distance;
let tilesX = 40;
let tilesY = 40;
let tilesW;
let tilesH;
let circleSize = 200;
let ones = Array.from(new Array(tilesX), () => new Array(tilesY));

function setup() {
    createCanvas(595, 842);
    helvSize = 18;
    ibmplexSize = 16;
    frameRate(60); //    pixelDensity(2);
    textFont('Open Sans');
    textAlign(CENTER);
    tilesX = 40;
    tilesY = 40;
    tilesW = width / float(tilesX);
    tilesH = height / float(tilesY);
    for (let x = 0; x < tilesX; x++) {
        for (let y = 0; y < tilesY; y++) {
            if (random(0, 100) <= 10) ones[x][y] = "1";
            else ones[x][y] = "0";
        }
    }
}

// function preload() {
//   font = loadFont('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Open+Sans&display=swap');
// }

function draw() {
    background(0);
    fill(255);
    textAlign(CENTER);

    let mx = mouseX;
    let my = mouseY;
    let circleSizeSq = circleSize * circleSize; // Use squared distance for optimization

    let lastFont = null;
    let lastFontSize = null;

    for (let x = 0; x < tilesX; x++) {
        for (let y = 0; y < tilesY; y++) {
            let dx = tileCenterX(x) - mx;
            let dy = tileCenterY(y) - my;
            let distanceSq = dx * dx + dy * dy; // Squared distance

            let fontSize;
            let charToRender;
            let fontWeight = 400; // Default to regular weight (400)

            if (distanceSq <= circleSizeSq) {
                fontSize = distanceToSize(Math.sqrt(distanceSq)); // Calculate font size based on distance
                charToRender = "1";
                fontWeight = 500; // Medium weight for nearby text
            } else {
                fontSize = ibmplexSize; // Default font size
                charToRender = ones[x][y];
            }

            // Apply the font weight and size
            if (fontSize !== lastFontSize || fontWeight !== lastFont) {
                // Set the font size and weight for IBM Plex Mono
                textFont('IBM Plex Mono', fontWeight);
                lastFontSize = fontSize;
                lastFont = fontWeight;
            }

            textSize(fontSize); // Dynamically set the font size for each symbol
            text(charToRender, x * tilesW + 7, y * tilesH + ibmplexSize); // Draw the character
        }
    }

    // Large black text
    fill(0);
    textSize(125);
    textFont('Open Sans');
    // textFont('IBM Plex Mono');
    textAlign(LEFT);
    text("LOOK", tilesW - 9, 4 * tilesH);
    text("INTO", tilesW - 9, 9 * tilesH);
    text("THE", tilesW - 9, 14 * tilesH);
    text("CODE", tilesW - 9, 19 * tilesH);
}
function tileCenterX(x) {
    return x * tilesW + tilesW / 2;
}

function tileCenterY(y) {
    return y * tilesH + tilesH / 2;
}

function distanceToMouse(x, y) {
    return dist(tileCenterX(x), tileCenterY(y), mouseX, mouseY);
}

function distanceToSize(distance) {
    return int(map(distance, 0, circleSize, 50, 18));
}