require("dotenv").config()
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const bodyParser = require('body-parser')
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./src/middlewares/error");
const cors = require('cors');
var path = require('path');


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
app.use("order/api/ship", require('./src/routes/ship'));

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

const server = app.listen(PORT, () =>
    console.log(`Sever running on port ${PORT}`)
);

const io = socketIo(server, {
    cors: {
        // origin: "http://localhost:3000",
        origin: "https://logistics-tracker.herokuapp.com/",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})

io.on("connection", (socket) => {
    console.log("New client connected");

    setInterval(() => getApiAndEmit(socket), 5000);

    socket.on("disconnect", () => console.log("Client disconnected"));
});

const getApiAndEmit = socket => {
    try {
        // const res = await axios.get("https://api.covid19india.org/data.json");
        socket.emit("FromAPI", 'Hello Each time');
    }
    catch (error) {
        console.log(error);
    }
}

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});