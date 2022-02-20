const cloneNestedArray = <T>(array: T[][]): T[][] => {
    const resultArr: T[][] = [];

    array.forEach((child) => {
        const clonedChild = [...child];
        resultArr.push(clonedChild);
    });

    return resultArr;
};

export default cloneNestedArray;
