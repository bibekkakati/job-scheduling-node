const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
