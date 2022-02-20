import { TSudokuGrid } from "src/types/grid";

export const clearDigit = (grid: TSudokuGrid, x: number, y: number) => {
    grid[y][x] = 0;
};
