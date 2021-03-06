const express = require("express");
const app = express();
const router = require("./router");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 3000;

// Set API limiter
const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 30,
});
app.set("trust proxy", 1);
app.use("/api", apiLimiter);

app.use(cors());

// Routes
app.use(express.static("public"));
app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
