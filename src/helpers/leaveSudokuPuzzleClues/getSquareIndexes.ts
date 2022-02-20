const getSquareIndexes = (): string[] => {
    const allSquareIndexes = [];

    for (let i = 0; i < 9; i++) {
        for (let l = 0; l < 9; l++) {
            allSquareIndexes.push(`${l},${i}`);
        }
    }

    return allSquareIndexes;
};

export default getSquareIndexes;
