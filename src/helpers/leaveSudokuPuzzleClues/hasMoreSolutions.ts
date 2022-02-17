import { TSudokuGrid } from "src/types/grid";

import cloneNestedArray from "../../util/cloneNestedArray";
import {
    generateNumbersToCheck,
    getEmptySquaresList,
    getBacktraceMap,
    insertDigit,
    canNumberBeInserted,
    clearDigit,
} from "../solveSudokuPuzzle";

const hasMoreSolutions = (testGrid: TSudokuGrid, moreThan = 1): boolean => {
    const grid = cloneNestedArray(testGrid);
    const emptySquares = getEmptySquaresList(grid);
    const backtraceMap = getBacktraceMap(emptySquares);
    const pathLength = emptySquares.length;

    let solutionsCount = 0;
    let pointer = 0;
    let breakLoop = false;

    while (!breakLoop) {
        // If pointer eventually gets to -1 - all guesses has been tried
        if (pointer < 0) {
            breakLoop = true;
            break;
        }

        const currentSquare = emptySquares[pointer];

        // Check if we have tried all digits on current square
        if (backtraceMap[currentSquare].length === 9) {
            // Reset the guessed digits list
            backtraceMap[currentSquare] = [];
            // Move pointer back
            pointer--;

            if (pointer < 0) {
                breakLoop = true;
                break;
            }

            // Clear the previously inserted digit
            const [prevX, prevY] = emptySquares[pointer].split(",");
            clearDigit(grid, Number(prevX), Number(prevY));
            continue;
        }

        // Get coordinates of current square
        const [x, y] = currentSquare.split(",");
        // Get numbers for solver to check in random order
        const numbersToCheck = generateNumbersToCheck();

        singleSquareCheck: for (
            let numberToGuessIndex = 0;
            numberToGuessIndex < 9;
            numberToGuessIndex++
        ) {
            const currentNumberToCheck = numbersToCheck[numberToGuessIndex];

            // Check if it has not been guessed before
            if (backtraceMap[currentSquare].indexOf(currentNumberToCheck) === -1) {
                // Check if it can be inserted
                const canBeInserted = canNumberBeInserted(
                    grid,
                    currentNumberToCheck,
                    Number(x),
                    Number(y)
                );

                // Append as a considered number
                backtraceMap[currentSquare].push(currentNumberToCheck);

                if (canBeInserted) {
                    // Apply number and move on
                    insertDigit(grid, currentNumberToCheck, Number(x), Number(y));
                    pointer++;
                    break singleSquareCheck;
                }
            }
        }

        if (pointer === pathLength) {
            // Grid was solved, try to look for more solutions
            pointer--;
            solutionsCount++;
        }

        // If we already know the answer, break the loop
        if (solutionsCount > moreThan) {
            breakLoop = true;
            break;
        }
    }

    return solutionsCount > moreThan;
};

export default hasMoreSolutions;
