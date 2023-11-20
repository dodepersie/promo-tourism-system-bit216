const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const merchantRoute = require("./routes/merchant");

const app = express();

app
  .use(bodyParser.json())
  .use(cors());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/merchants", merchantRoute);

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
