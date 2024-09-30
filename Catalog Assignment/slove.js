const fs = require('fs');
const input = {
    "keys": {
        "n": 9,
        "k": 6
    },
    "1": {
        "base": "10",
        "value": "28735619723837"
    },
    "2": {
        "base": "16",
        "value": "1A228867F0CA"
    },
    "3": {
        "base": "12",
        "value": "32811A4AA0B7B"
    },
    "4": {
        "base": "11",
        "value": "917978721331A"
    },
    "5": {
        "base": "16",
        "value": "1A22886782E1"
    },
    "6": {
        "base": "10",
        "value": "28735619654702"
    },
    "7": {
        "base": "14",
        "value": "71AB5070CC4B"
    },
    "8": {
        "base": "9",
        "value": "122662581541670"
    },
    "9": {
        "base": "8",
        "value": "642121030037605"
    }
};

function convertValue(value, base) {
    return parseInt(value, base); 
}

function interpolateLagrange(points) {
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

function getPointsFromInput(input) {
    const points = [];
    const { keys } = input;
    for (const key in input) {
        if (key !== "keys") {
            const x = parseInt(key);
            const base = parseInt(input[key].base);
            const value = input[key].value; 
            const y = convertValue(value, base);
            points.push({ x, y });
        }
    }
    return points;
}

function Solve(input) {
    const points = getPointsFromInput(input);
    const { k } = input.keys;
    if (points.length < k) {
        throw new Error('Not enough points provided');
    }
    const c = interpolateLagrange(points.slice(0, k));

    return c;
}

const secret = Solve(input);
console.log("The constant term 'c' of the polynomial is:", secret);
