require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect db
require("./helper/db_helpers/Singleton").getDb();

// Import routes
const taskRoutes = require("./controller/routes/task");

// @route - home route
app.get("/", (req, res) => {
	res.send("Job Scheduling");
});

// Handle routes
app.use("/api/task", taskRoutes);

// Error routes
app.get("*", (req, res) => {
	res.status(404).send("Invalid URL");
});

app.listen(8082, () =>
	console.log("server running at http://localhost:" + 8082)
);
