import { Request, Response } from "express";
const generateSudokuPuzzle = require("../services/generateSudokuPuzzle.service");
const { sudokuGeneratorValidator } = require("../validators");

const sudokuGeneratorController = (req: Request, res: Response) => {
    const params = req.query;

    const clues =
        typeof params.clues === "string" && !isNaN(parseInt(params.clues))
            ? parseInt(params.clues)
            : null;
    const cluesValidation = sudokuGeneratorValidator.validateCluesCount(clues);
    if (!cluesValidation.isValid) {
        return res.status(400).send({
            error: true,
            message: cluesValidation.message,
        });
    }

    const difficulty = params.difficulty || null;
    const difficultyValidation = sudokuGeneratorValidator.validateDifficulty(difficulty);
    if (!difficultyValidation.isValid) {
        return res.status(400).json({
            error: true,
            message: difficultyValidation.message,
        });
    }

    try {
        const puzzle = generateSudokuPuzzle({
            difficulty,
            clues,
        });

        res.status(200).json({
            puzzle,
        });
    } catch (e: unknown) {
        res.status(500).json({
            error: true,
            message: e instanceof Error ? e.message : "Unknown error occured",
        });
    }
};

module.exports = sudokuGeneratorController;
