import { TSudokuGrid } from "src/types/grid";

const clearDigit = (grid: TSudokuGrid, x: number, y: number) => {
    grid[y][x] = 0;
};

module.exports = clearDigit;
