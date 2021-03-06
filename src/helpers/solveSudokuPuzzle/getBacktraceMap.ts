import { TBacktraceMap } from "src/types/backtraceMap";

export const getBacktraceMap = (emptySquaresList: string[]): TBacktraceMap => {
    const backtraceMap = {} as TBacktraceMap;
    const len = emptySquaresList.length;

    for (let i = 0; i < len; i++) {
        backtraceMap[emptySquaresList[i]] = [];
    }

    return backtraceMap;
};
