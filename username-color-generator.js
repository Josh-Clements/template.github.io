// Function to generate a color from a string
function generateColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Generate pleasing pastel-like colors
    const h = Math.abs(hash) % 360;
    const s = 55 + (Math.abs(hash) % 20); // Saturation between 55-75%
    const l = 45 + (Math.abs(hash) % 15); // Lightness between 45-60%

    return `hsl(${h}, ${s}%, ${l}%)`;
}

// Function to determine if text should be light or dark
function getTextColor(backgroundColor) {
    // Convert HSL to RGB for luminance calculation
    const h = parseInt(backgroundColor.match(/\d+/)[0]);
    const s = parseInt(backgroundColor.match(/\d+/g)[1]);
    const l = parseInt(backgroundColor.match(/\d+/g)[2]);

    // If lightness is less than 50%, use white text
    return l < 50 ? '#FFFFFF' : '#000000';
}

// Example usage:
const username = "Alice Kim";
const bgColor = generateColor(username);
const textColor = getTextColor(bgColor);
console.log(`Background: ${bgColor}, Text: ${textColor}`);