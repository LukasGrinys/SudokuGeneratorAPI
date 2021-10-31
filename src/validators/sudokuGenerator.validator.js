const validateCluesCount = (cluesCount) => {
    if (cluesCount === null) {
        return {
            isValid: true,
        };
    }

    if (cluesCount < 1) {
        return {
            isValid: false,
            message: "Clues count must be higher than 0",
        };
    }

    if (cluesCount > 80) {
        return {
            isValid: false,
            message: "Clues count must be lower than 81",
        };
    }

    return {
        isValid: true,
    };
};

const validateDifficulty = (difficulty) => {
    if (difficulty === null) {
        return {
            isValid: true,
        };
    }

    const possibleDifficulties = ["easy", "medium", "hard", "evil"];
    if (possibleDifficulties.indexOf(difficulty) === -1) {
        return {
            isValid: false,
            message:
                "Difficulty is not valid. Must be one of the following: easy, medium, hard, evil or none",
        };
    }

    return {
        isValid: true,
    };
};

module.exports = {
    validateCluesCount,
    validateDifficulty,
};
