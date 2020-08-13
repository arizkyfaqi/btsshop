const express = require("express");
const userRoutes = require("./routes/userRoutes");
const shopRoutes = require("./routes/shopRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/shop", shopRoutes);

// Error handling middlware
app.use(globalErrorHandler);

module.exports = app;
