import { TSudokuGrid } from "src/types/grid";

import leaveSudokuPuzzleClues from "../helpers/leaveSudokuPuzzleClues";
import generateEmptyGrid from "../helpers/generateEmptyGrid";

const solveSudokuPuzzle = require("./solveSudokuPuzzle.service");

interface IGenerateSudokuPuzzleParams {
    difficulty?: string;
    clues?: number;
}

const generateSudokuPuzzle = ({ difficulty, clues }: IGenerateSudokuPuzzleParams): TSudokuGrid => {
    // Generate empty grid
    const emptyGrid = generateEmptyGrid();

    // ...and solve it
    let solvedGrid: TSudokuGrid;
    try {
        solvedGrid = solveSudokuPuzzle(emptyGrid);
    } catch (e) {
        throw new Error(`Could not generate sudoku grid: ${e}`);
    }

    // Leave clues by removing digits
    const finalGrid = leaveSudokuPuzzleClues({
        difficulty,
        clues,
        generationType: clues ? "clues" : "difficulty",
        grid: solvedGrid,
    });

    if (!finalGrid) {
        throw new Error("Could not leave clues on generated grid");
    }

    return finalGrid;
};

module.exports = generateSudokuPuzzle;
