// Returns 9 numbers in random order, which will be checked by solver
const generateNumbersToCheck = (): number[] => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const numbersRearranged = [];

    for (let i = 0; i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const [randomNumber] = numbers.splice(randomIndex, 1);

        numbersRearranged.push(randomNumber);
    }

    return numbersRearranged;
};

module.exports = generateNumbersToCheck;
