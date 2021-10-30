const getBacktraceMap = (emptySquaresList) => {
    const backtraceMap = {};
    const len = emptySquaresList.length;

    for (let i = 0; i < len; i++) {
        backtraceMap[emptySquaresList[i]] = [];
    }

    return backtraceMap;
}

module.exports = getBacktraceMap;
