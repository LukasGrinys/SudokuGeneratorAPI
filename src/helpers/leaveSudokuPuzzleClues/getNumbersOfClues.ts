const getNumbersOfClues = (difficulty: string): number => {
    switch (difficulty) {
        case "evil":
            return Math.floor(Math.random() * 2) + 17;
        case "hard":
            return Math.floor(Math.random() * 7) + 19;
        case "medium":
            return Math.floor(Math.random() * 9) + 27;
        case "easy":
            return Math.floor(Math.random() * 9) + 36;
        default:
            return Math.floor(Math.random() * 27 + 16);
    }
};

export default getNumbersOfClues;
