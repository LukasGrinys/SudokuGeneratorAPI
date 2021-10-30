const getSectionIndexes = (x,y) => {
    let sectionX, sectionY;

    if (x < 3) {
        sectionX = 0;
    } else if (x < 6) {
        sectionX = 3;
    } else {
        sectionX = 6
    }

    if (y < 3) {
        sectionY = 0;
    } else if (y < 6) {
        sectionY = 3;
    } else {
        sectionY = 6
    };

    return [sectionX, sectionY];
}

// Returns boolean, which tells if number can be inserted into wanted squar
const canNumberBeInserted = (grid, numberToCheck, x, y) => {
    // Check for occurence in section (one of 3x3 sections)
    const [startingX, startingY] = getSectionIndexes(x,y);

    for (let i = 0; i < 3; i++) {
        for (let l = 0; l < 3; l++) {
            const xIndexToCheck = startingX + l;
            const yIndexToCheck = startingY + i;
            
            if (grid[yIndexToCheck][xIndexToCheck] === numberToCheck) {
                return false;
            }
        }
    }

    // Check for occurence in row
    for (let i = 0; i < grid[y].length; i++) {
        if (grid[y][i] === numberToCheck) {
            return false;
        }
    }

    // Check for occurence in column
    for (let i = 0; i < grid.length; i++) {
        if (grid[i][x] === numberToCheck) {
            return false;
        }
    }

    return true;
}

module.exports = canNumberBeInserted;