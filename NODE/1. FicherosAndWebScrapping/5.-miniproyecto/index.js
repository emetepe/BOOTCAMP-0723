// Require express, dotenv, cloudinary, connect
const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const { configCloudinary } = require("./src/api/middleware/files.middleware");
configCloudinary();

const { connect } = require("./src/utils/db");
connect();

const PORT = process.env.PORT;

// Server creation
const app = express();

// Set data limits
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

// Routing
const CharacterRoutes = require("./src/api/routes/Character.routes");
app.use("/api/v1/character", CharacterRoutes);


// If route is not found
app.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  return next(error);
});

app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});

// Hide technologies used
app.disable("x-powered-by");

// Port listening
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}, on http://localhost:${PORT}`);
});
