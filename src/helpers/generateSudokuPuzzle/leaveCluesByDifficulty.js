const { clearDigit } = require('../solveSudokuPuzzle');
const getNumberOfClues = require('./getNumbersOfClues');
const leaveCluesByCount = require('./leaveCluesByCount');

const leaveCluesByDifficulty = (grid, difficulty) => {
    const numberOfClues = getNumberOfClues(difficulty);
    
    return leaveCluesByCount(grid, numberOfClues);
}

module.exports = leaveCluesByDifficulty;