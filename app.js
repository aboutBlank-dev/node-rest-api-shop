const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//Routes
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

//Connect to MongoDB
const pw = process.env.MONGO_ATLAS_PW;
mongoose.connect(
  `mongodb+srv://josecolaco1999:${pw}@node-rest-shop.io4bcpx.mongodb.net/?retryWrites=true&w=majority&appName=node-rest-shop`
);

//.use() adds middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handling CORS errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }

  next();
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

//Handling all routes that do not fall under the ones above
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

//Handle ALL errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
