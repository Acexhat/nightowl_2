require("dotenv").config()
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./src/middlewares/error");

connectDB();

app.use(express.json());

app.get("/", (req, res, next) => {
    res.send("Api running");
});

// Connecting Routes
app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/private", require("./src/routes/private"));

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
    console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});