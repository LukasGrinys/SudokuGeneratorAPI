// Elements
const simpleSudokuGrid = document.getElementById("grid1");
const sudokuByDifficultyGrid = document.getElementById("grid2");
const sudokuByCluesCountGrid = document.getElementById("grid3");

const loadingText = "Generating...";
const errorText = "Error occured";
const invalidCountMessage = "Invalid count of clues provided. Must be a number between 1 and 81";

async function getSudokuGrid(url) {
    return await fetch(url).then(function (res) {
        return res.json();
    });
}

async function getSimpleSudokuGrid() {
    return await getSudokuGrid("/api");
}

async function getSudokuByDifficultyGrid(difficulty) {
    return await getSudokuGrid("/api?difficulty=" + difficulty);
}

async function getSudokuByCluesCountGrid(cluesCount) {
    return await getSudokuGrid("/api?clues=" + cluesCount);
}

async function generateSimpleSudokuGrid(event) {
    event.target.disabled = true;
    const gridContainer = simpleSudokuGrid;

    gridContainer.innerHTML = loadingText;

    const grid = await getSimpleSudokuGrid();

    if (!grid || !Array.isArray(grid.puzzle)) {
        gridContainer.innerHTML = errorText;
        event.target.disabled = false;
        return;
    }

    displayGrid(grid.puzzle, gridContainer);
    event.target.disabled = false;
}

async function generateSudokuByDifficulty(event) {
    event.target.disabled = true;
    const gridContainer = sudokuByDifficultyGrid;
    const difficulty = document.getElementById("difficulty").value;

    gridContainer.innerHTML = loadingText;

    const grid = await getSudokuByDifficultyGrid(difficulty);

    if (!grid || !Array.isArray(grid.puzzle)) {
        gridContainer.innerHTML = errorText;
        event.target.disabled = false;
        return;
    }

    displayGrid(grid.puzzle, gridContainer);
    event.target.disabled = false;
}

async function generateSudokuByCluesCount(event) {
    const gridContainer = sudokuByCluesCountGrid;
    const cluesCount = document.getElementById("clues").value;

    if (cluesCount < 1 || cluesCount > 81) {
        gridContainer.innerHTML = invalidCountMessage;
        return;
    }

    gridContainer.innerHTML = loadingText;
    event.target.disabled = true;

    const grid = await getSudokuByCluesCountGrid(cluesCount);

    if (!grid || !Array.isArray(grid.puzzle)) {
        gridContainer.innerHTML = errorText;
        event.target.disabled = false;
        return;
    }

    displayGrid(grid.puzzle, gridContainer);
    event.target.disabled = false;
}

function displayGrid(grid, container) {
    const gridElement = document.createElement("table");

    for (let i = 0; i < 9; i++) {
        const row = document.createElement("tr");

        for (let l = 0; l < 9; l++) {
            const col = document.createElement("td");
            col.dataset.row = l;
            col.dataset.col = i;

            if (grid[i][l] !== 0) {
                col.innerHTML = grid[i][l];
            }

            row.appendChild(col);
        }

        gridElement.appendChild(row);
    }

    container.innerHTML = "";
    container.appendChild(gridElement);
}

function addEventListeners() {
    const simpleSudokuGeneratorButton = document.getElementById("simpleSudokuGeneratorButton");
    const sudokuGeneratorByDifficultyButton = document.getElementById(
        "sudokuGeneratorByDifficultyButton"
    );
    const sudokuGeneratorByCluesButton = document.getElementById("sudokuGeneratorByCluesButton");

    simpleSudokuGeneratorButton.addEventListener("click", generateSimpleSudokuGrid);
    sudokuGeneratorByDifficultyButton.addEventListener("click", generateSudokuByDifficulty);
    sudokuGeneratorByCluesButton.addEventListener("click", generateSudokuByCluesCount);
}

function init() {
    addEventListeners();
}

init();
