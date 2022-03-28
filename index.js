require("dotenv").config()
const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./src/middlewares/error");
const cors = require('cors');


connectDB();
//uncommented it
app.use(express.json());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Connecting Routes
app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/private", require("./src/routes/private"));
app.use("/api/ship", require('./src/routes/ship'));

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
    console.log(`Sever running on port ${PORT}`)
);

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
}

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});