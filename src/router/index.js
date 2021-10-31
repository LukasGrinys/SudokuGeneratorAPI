const express = require("express");
const router = express.Router();

const { homepageController, sudokuGeneratorController } = require("../controllers");

router.get("/", homepageController);
router.get("/api", sudokuGeneratorController);

router.get("/*", (req, res) => {
    res.status(301).redirect("/");
});

module.exports = router;
