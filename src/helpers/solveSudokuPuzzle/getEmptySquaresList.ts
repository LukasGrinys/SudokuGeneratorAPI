import { TSudokuGrid } from "src/types/grid";

export const getEmptySquaresList = (grid: TSudokuGrid): string[] => {
    // Grid squares are identified as 'x,y';
    // x - index of member in row
    // y - index of row
    const squaresToFill = [];
    const len = grid.length;

    for (let i = 0; i < len; i++) {
        for (let l = 0; l < len; l++) {
            if (grid[i][l] === 0) {
                const squareCode = `${l},${i}`;
                squaresToFill.push(squareCode);
            }
        }
    }

    return squaresToFill;
};
