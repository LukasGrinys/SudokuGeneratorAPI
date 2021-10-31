const generateEmptyGrid = () => {
    let grid = [];

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

module.exports = generateEmptyGrid;
