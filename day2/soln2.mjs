// @ts-check

import fs from 'fs';
import path from 'path';
import url from 'url';

// A - Rock
// B - Paper
// C - Scissors

function readFile(filename = 'input.txt') {
    const __filename = url.fileURLToPath(import.meta.url);
    const inputFileName = path.join(__filename, '..', filename);
    return fs.readFileSync(inputFileName, 'utf8');
}

// rock paper scissors results
// -1 opponent wins
// 0 draw
// 1 competitor wins
function roundResult(opponent, competitor) {
    if (opponent === competitor) return 0;
    if (opponent === 'A' && competitor === 'B') return 1;
    if (opponent === 'A' && competitor === 'C') return -1;

    if (opponent === 'B' && competitor === 'A') return -1;
    if (opponent === 'B' && competitor === 'C') return 1;

    if (opponent === 'C' && competitor === 'A') return 1;
    if (opponent === 'C' && competitor === 'B') return -1;
}

// outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).
function roundScore(result) {
    if (result === -1) return 0;
    if (result === 0) return 3;
    if (result === 1) return 6;
    throw new Error('Invalid result');
}

// (1 for Rock, 2 for Paper, and 3 for Scissors)
function choiceResult(choice) {
    if (choice === 'A') return 1;
    if (choice === 'B') return 2;
    if (choice === 'C') return 3;
    throw new Error('Invalid choice');
}

// X lose, Y draw, Z win
function generateCompetitorPlay(opponentPlay, competitorCode) {
    if (competitorCode === 'X') {
        if (opponentPlay === 'A') return 'C';
        if (opponentPlay === 'B') return 'A';
        if (opponentPlay === 'C') return 'B';
    }
    if (competitorCode === 'Y') {
        return opponentPlay;
    }
    if (competitorCode === 'Z') {
        if (opponentPlay === 'A') return 'B';
        if (opponentPlay === 'B') return 'C';
        if (opponentPlay === 'C') return 'A';
    }
}

// (1 for Rock, 2 for Paper, and 3 for Scissors)
function calculateScore(round) {
    const opponentPlay = round[0];
    const competitorCode = round[2];

    // const competitorPlay = competitorCode === 'X' ? 'A' : competitorCode === 'Y' ? 'B' : 'C';
    const competitorPlay = generateCompetitorPlay(opponentPlay, competitorCode);

    const competitorRoundScore = roundScore(roundResult(opponentPlay, competitorPlay));
    const competitorChoiceScore = choiceResult(competitorPlay);

    return competitorRoundScore + competitorChoiceScore;
}

function main() {
    const testInput = ["A Y", "B X", "C Z"]
    const contents = readFile();
    // const rounds = testInput;
    const rounds = contents.split('\n');
    let totalScore = 0;
    for (let i = 0; i < rounds.length; i++) {
        const round = rounds[i];
        const score = calculateScore(round);
        totalScore += score;
        console.log(`Round ${i + 1}: ${score}`);
    }

    console.log(`Total score: ${totalScore}`);
}

main();
