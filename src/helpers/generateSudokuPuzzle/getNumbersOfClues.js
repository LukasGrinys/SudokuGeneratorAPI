const getNumberOfClues = (difficulty) => {
    switch (difficulty) {
        case "evil":
            return Math.floor(Math.random() * 2) + 16;
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

module.exports = getNumberOfClues;
