const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname, 'testcase1.json');
function decodeValue(value, base) {
    return parseInt(value, base); 
}

function lagrangeInterpolation(points) {
    let c = 0;
    const k = points.length;

    for (let i = 0; i < k; i++) {
        let xi = points[i].x;
        let yi = points[i].y;
        let li = 1; 
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = points[j].x;
                li *= (0 - xj) / (xi - xj); 
            }
        }
        c += yi * li; 
    }

    return c;
}

function extractPointsFromInput(input) {
    const points = [];
    const { keys } = input;

    for (const key in input) {
        if (key !== "keys") {
            const x = parseInt(key); 
            const base = parseInt(input[key].base); 
            const value = input[key].value; 
            const y = decodeValue(value, base);

            points.push({ x, y });
        }
    }

    return points;
}
function calculateSecret(input) {
    const points = extractPointsFromInput(input);
    const { k } = input.keys;
    if (points.length < k) {
        throw new Error('Not enough points provided');
    }
    const c = lagrangeInterpolation(points.slice(0, k)); 

    return c;
}

fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the JSON file:', err);
        return;
    }

    try {
        const inputData = JSON.parse(data);
        const secret = calculateSecret(inputData);
        console.log("The constant term 'c' of the polynomial is:", secret);
    } catch (err) {
        console.error('Error parsing JSON:', err);
    }
});
