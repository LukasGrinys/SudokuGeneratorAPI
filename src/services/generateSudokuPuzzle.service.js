const {
    generateEmptyGrid,
    leaveCluesByDifficulty,
    leaveCluesByCount,
} = require("../helpers/generateSudokuPuzzle");
const solveSudokuPuzzle = require("./solveSudokuPuzzle.service");

const generateSudokuPuzzle = ({ difficulty, clues }) => {
    // Generate empty grid
    const emptyGrid = generateEmptyGrid();
    // ...and solve it
    let solvedGrid;
    try {
        solvedGrid = solveSudokuPuzzle(emptyGrid);
    } catch (e) {
        throw new Error(`Could not generate sudoku grid: ${e}`);
    }

    // Leave clues, depending on difficulty/clue count provided
    let finalGrid;
    if (clues) {
        finalGrid = leaveCluesByCount(solvedGrid, clues);
    } else {
        finalGrid = leaveCluesByDifficulty(solvedGrid, difficulty);
    }

    if (!finalGrid) {
        throw new Error("Could not leave clues on generated grid");
    }

    return finalGrid;
};

module.exports = generateSudokuPuzzle;
