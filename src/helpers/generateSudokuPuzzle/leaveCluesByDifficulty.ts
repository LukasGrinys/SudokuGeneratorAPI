import { TSudokuGrid } from "src/types/grid";
const getNumberOfClues = require("./getNumbersOfClues");

const leaveCluesByDifficulty = (grid: TSudokuGrid, difficulty: string): TSudokuGrid => {
    const leaveCluesByCount = require("./leaveCluesByCount");
    const numberOfClues = getNumberOfClues(difficulty);

    return leaveCluesByCount(grid, numberOfClues);
};

module.exports = leaveCluesByDifficulty;
