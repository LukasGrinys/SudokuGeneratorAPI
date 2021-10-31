const path = require("path");

const homepageController = (_, res) => {
    res.sendFile(path.join(__dirname + "./../../public/index.html"));
};

module.exports = homepageController;
