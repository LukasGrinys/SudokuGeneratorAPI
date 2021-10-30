const { 
    generateNumbersToCheck, 
    getEmptySquaresList, 
    getBacktraceMap, 
    insertDigit, 
    canNumberBeInserted, 
    clearDigit
} = require('../helpers/solveSudokuPuzzle');

const solveSudokuPuzzle = (grid) => {
    const emptySquares = getEmptySquaresList(grid);
    const backtraceMap = getBacktraceMap(emptySquares);
    const pathLength = emptySquares.length;

    pointerLoop:
    for (let pointer = 0; pointer < pathLength; ) {
        // If pointer eventually gets to -1 - puzzle is invalid
        if (pointer < 0) {
            throw new Error("Provided puzzle is invalid");
        }

        const currentSquare = emptySquares[pointer];

        // Check if we have tried all digits on current square
        if (backtraceMap[currentSquare].length === 9) {
            // Reset the guessed digits list
            backtraceMap[currentSquare] = [];
            // Move pointer back
            pointer--;

            // Clear the previously inserted digit
            const [prevX, prevY] = emptySquares[pointer].split(',');
            clearDigit(grid, prevX, prevY);
            continue;
        }

        // Get coordinates of current square
        const [x, y] = currentSquare.split(',');
        // Get numbers for solver to check in random order
        const numbersToCheck = generateNumbersToCheck();

        singleSquareCheck:
        for (let numberToGuessIndex = 0; numberToGuessIndex < 9; numberToGuessIndex++) {
            const currentNumberToCheck = numbersToCheck[numberToGuessIndex];

            // Check if it has not been guessed before
            if (backtraceMap[currentSquare].indexOf(currentNumberToCheck) === -1) {
                // Check if it can be inserted
                const canBeInserted = canNumberBeInserted(grid, currentNumberToCheck, x, y);

                // Append as a considered number
                backtraceMap[currentSquare].push(currentNumberToCheck);

                if (canBeInserted) {
                    // Apply number and move on
                    insertDigit(grid, currentNumberToCheck, x, y);
                    pointer++;
                    break singleSquareCheck;
                }
            }
        }
    }

    return grid;
}

module.exports = solveSudokuPuzzle