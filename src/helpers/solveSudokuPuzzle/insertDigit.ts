import { TSudokuGrid } from "src/types/grid";

export const insertDigit = (grid: TSudokuGrid, digit: number, x: number, y: number): void => {
    if (grid[y][x] !== 0) {
        return;
    }

    grid[y][x] = digit;
};
