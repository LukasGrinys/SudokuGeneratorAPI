import { TSudokuGrid } from "src/types/grid";

const generateEmptyGrid = (): TSudokuGrid => {
    const grid: TSudokuGrid = [];

    for (let i = 0; i < 9; i++) {
        for (let l = 0; l < 9; l++) {
            if (grid[i] === undefined) {
                grid[i] = [];
            }

            grid[i].push(0);
        }
    }

    return grid;
};

export default generateEmptyGrid;
