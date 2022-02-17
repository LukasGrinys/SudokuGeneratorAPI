import { TSudokuGrid } from "src/types/grid";

import cloneNestedArray from "../../util/cloneNestedArray";
import { clearDigit, insertDigit } from "../solveSudokuPuzzle";

import getNumbersOfClues from "./getNumbersOfClues";
import getSquareIndexes from "./getSquareIndexes";
import generateSquareRemovalMap from "./generateSquareRemovalMap";
import hasMoreSolutions from "./hasMoreSolutions";

type TGenerateSudokuPuzzleHelperParams = {
    generationType: "clues" | "difficulty";
    clues: number | undefined;
    difficulty: string | undefined;
    grid: TSudokuGrid;
};

const leaveSudokuPuzzleClues = ({
    generationType,
    clues,
    difficulty,
    grid,
}: TGenerateSudokuPuzzleHelperParams): TSudokuGrid => {
    const cluesCount =
        generationType === "clues" ? clues : difficulty ? getNumbersOfClues(difficulty) : null;
    if (!cluesCount || typeof cluesCount !== "number") {
        throw new Error("Could not calculate clues count");
    }

    if (cluesCount > 81) {
        throw new Error("Invalid clues count");
    }

    const squaresToClearCount = 81 - cluesCount;

    const squaresMap = generateSquareRemovalMap(squaresToClearCount);
    const removalTraceMap = new Map<string, number>();
    const testGrid = cloneNestedArray(grid);

    // Digit removal loop:
    let gridFormed = false;
    let iteration = 0;
    while (!gridFormed) {
        if (iteration < 0) {
            throw new Error("Unknown error occurred");
        }

        // For each iteration, pick a random square from untested ones
        const currentlyRemovedIndexes = Array.from(removalTraceMap.keys());
        const currentIterationIndexes = squaresMap[iteration].filter(
            (iterationPosition) =>
                !currentlyRemovedIndexes.find(
                    (removedPosition) => removedPosition === iterationPosition
                )
        );

        const randomIndex = Math.floor(Math.random() * currentIterationIndexes.length);
        const randomSquare = currentIterationIndexes[randomIndex];

        // Try to remove that square from grid
        const [testX, testY] = randomSquare.split(",");
        const randomSquareDigit = testGrid[Number(testY)][Number(testX)];
        clearDigit(testGrid, Number(testX), Number(testY));

        // Test if grid has only one solution
        const solutionCountCheckTreshold = Number(process.env.SOLUTION_COUNT_CHECK_TRESHOLD) || 0;
        const hasSingleSolution =
            solutionCountCheckTreshold > squaresToClearCount
                ? !hasMoreSolutions(testGrid, 1)
                : true;

        if (hasSingleSolution) {
            // Save the performed action
            removalTraceMap.set(randomSquare, randomSquareDigit);
            // Remove the guessed position from current indexes
            squaresMap[iteration] = squaresMap[iteration].filter(
                (square) => square !== randomSquare
            );
            // Keep the testGrid and move pointer
            iteration++;
        } else {
            if (currentIterationIndexes.length === 1) {
                // Restore the current step indexes
                squaresMap[iteration] = getSquareIndexes();

                // If restore the action made in current position, if made
                const currentIterationKey = Array.from(removalTraceMap.keys())[iteration];
                if (removalTraceMap.has(currentIterationKey)) {
                    const removedDigit = removalTraceMap.get(currentIterationKey) as number;
                    insertDigit(testGrid, removedDigit, Number(testX), Number(testY));
                    removalTraceMap.delete(currentIterationKey);
                }

                // Move pointer back
                iteration--;
            } else {
                // Remove the guessed position from current indexes
                squaresMap[iteration] = squaresMap[iteration].filter(
                    (square) => square !== randomSquare
                );
            }
        }

        if (iteration === squaresToClearCount) {
            gridFormed = true;
        }
    }

    Array.from(removalTraceMap.keys()).forEach((square) => {
        const [x, y] = square.split(",");
        clearDigit(grid, Number(x), Number(y));
    });

    return grid;
};

export default leaveSudokuPuzzleClues;
