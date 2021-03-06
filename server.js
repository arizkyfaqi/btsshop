const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const DB = "mongodb://localhost:27017/btsshop";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connections success!");
  });

const port = 3000;
app.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});
