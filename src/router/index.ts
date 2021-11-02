import { Request, Response, Router } from "express";

const router = Router();
const { homepageController, sudokuGeneratorController } = require("../controllers");

router.get("/", homepageController);
router.get("/api", sudokuGeneratorController);

router.get("/*", (req: Request, res: Response) => {
    res.status(301).redirect("/");
});

module.exports = router;
