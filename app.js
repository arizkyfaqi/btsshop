const express = require("express");

const userRoutes = require("./routes/userRoutes");
const shopRoutes = require("./routes/shopRoutes");

const app = express();

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/shop", shopRoutes);

module.exports = app;
