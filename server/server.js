const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const merchantRoute = require("./routes/merchant");
const paymentRoute = require("./routes/paypal");
const reviewRoute = require("./routes/review");
const ministryRoute = require("./routes/ministry");

const app = express();

app
  .use(bodyParser.json())
  .use(cors())
  .use((req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  })
  .use("/api/users", userRoute)
  .use("/api/auth", authRoute)
  .use("/api/products", productRoute)
  .use("/api/merchants", merchantRoute)
  .use("/api/payment", paymentRoute)
  .use("/api/review", reviewRoute)
  .use("/api/ministry", ministryRoute);

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
