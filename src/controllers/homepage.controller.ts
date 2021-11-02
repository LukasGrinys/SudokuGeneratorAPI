import { Request, Response } from "express";

const homepageController = (_: Request, res: Response) => {
    const path = require("path");

    res.sendFile(path.join(__dirname + "./../../public/index.html"));
};

module.exports = homepageController;
