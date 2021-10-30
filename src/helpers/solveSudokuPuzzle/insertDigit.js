const insertDigit = (grid, digit, x, y) => {
    if (grid[y][x] !== 0) {
        return;
    }
    
    grid[y][x] = digit;
}

module.exports = insertDigit;