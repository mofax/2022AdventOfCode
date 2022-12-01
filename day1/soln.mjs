// @ts-check

import fs from 'fs';
import path from 'path';
import url from 'url';

function updateDeer(deers, currentDeer, buffer) {
    const k = deers[currentDeer];
    const v = Number(buffer);
    if (k) {
        deers[currentDeer].push(v);
    } else {
        deers[currentDeer] = [v];
    }
}

function codePointIs10(c) {
    return c.codePointAt(0) === 10;
}

function computeCalories(deers, index) {
    const deer = deers[index];
    return deer.reduce((a, b) => a + b, 0);
}

async function main() {
    const __filename = url.fileURLToPath(import.meta.url);
    const inputFileName = path.join(__filename, '..', 'input.txt');
    const fileData = fs.readFileSync(inputFileName, 'utf8');
    const deers = [];
    const sums = [];
    let buffer = '';
    let currentDeer = 1;
    let max = 0;
    for (let i = 0; i < fileData.length; i++) {
        const c = fileData[i];
        const nextC = fileData[i + 1];
        const prevC = fileData[i - 1];

        if (!c) {
            break;
        }

        if (codePointIs10(c)) {
            if (codePointIs10(prevC)) {
                const sum = computeCalories(deers, currentDeer);
                if (sum > max) {
                    max = sum;
                }
                sums[currentDeer] = sum;
                currentDeer++;
            } else if (nextC && codePointIs10(nextC)) {
                updateDeer(deers, currentDeer, buffer);
                buffer = '';
            } else {
                updateDeer(deers, currentDeer, buffer);
                buffer = '';
            }
        } else {
            buffer += c;
        }
    }

    console.log(max);
    console.log(sums[0] + sums[1] + sums[2]);
}

main();
