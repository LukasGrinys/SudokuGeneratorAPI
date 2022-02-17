import getSquareIndexes from "./getSquareIndexes";

type TSquaresRemovalMap = {
    [key: string]: string[];
};

const generateSquareRemovalMap = (squaresToClearCount: number): TSquaresRemovalMap => {
    const squaresMap: TSquaresRemovalMap = {};
    const allIndexes = getSquareIndexes();

    for (let i = 0; i < squaresToClearCount; i++) {
        squaresMap[i.toString()] = [...allIndexes];
    }

    return squaresMap;
};

export default generateSquareRemovalMap;
