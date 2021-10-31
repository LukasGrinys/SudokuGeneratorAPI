const { clearDigit } = require("../solveSudokuPuzzle");

const getCounterSquare = (square) => {
    const [row, col] = square.split(",");

    const counterRow = 8 - Number(row);
    const counterCol = 8 - Number(col);

    return `${counterRow},${counterCol}`;
};

const shiftGrid = (grid) => {
    const xThirds = Math.floor(Math.random() * 3);
    const yThirds = Math.floor(Math.random() * 3);

    if (xThirds === 0 && yThirds === 0) {
        return;
    }

    // Shift rows
    for (let i = 0; i < yThirds * 3; i++) {
        const lastRow = grid.pop();
        grid.unshift(lastRow);
    }

    // Shift columns
    for (let i = 0; i < 9; i++) {
        for (let l = 0; l < xThirds * 3; l++) {
            const lastRowNumber = grid[i].pop();
            grid[i].unshift(lastRowNumber);
        }
    }
};

const leaveCluesByDifficulty = (grid, cluesCount) => {
    if (cluesCount > 81) {
        throw new Error("Invalid clues count");
    }

    const squaresToClearCount = 81 - cluesCount;

    const allSquareIndexes = [];
    for (let i = 0; i < 9; i++) {
        for (let l = 0; l < 9; l++) {
            allSquareIndexes.push(`${l},${i}`);
        }
    }

    const squaresToClear = [];
    for (let i = 0; i < squaresToClearCount; ) {
        const [randomSquare] = allSquareIndexes.splice(
            Math.floor(Math.random() * allSquareIndexes.length),
            1
        );
        squaresToClear.push(randomSquare);
        i++;

        if (i === squaresToClearCount) {
            break;
        }

        if (randomSquare === "4,4") {
            continue;
        }

        const counterSquare = getCounterSquare(randomSquare);
        const indexOfCounterSquare = allSquareIndexes.indexOf(counterSquare);

        if (indexOfCounterSquare > 0) {
            allSquareIndexes.splice(indexOfCounterSquare, 1);
            squaresToClear.push(counterSquare);
            i++;
        }
    }

    for (let i = 0; i < squaresToClear.length; i++) {
        const [x, y] = squaresToClear[i].split(",");
        clearDigit(grid, x, y);
    }

    shiftGrid(grid);

    return grid;
};

module.exports = leaveCluesByDifficulty;
