const express = require("express");
const router = express.Router();

const Product = require("../models/product");

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /products",
  });
});

router.post("/", (req, res, next) => {
  const newProduct = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });

  product
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });

  res.status(201).json({
    message: "Handling POST requests to /products",
  });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    message: `Handling GET requests to /products/${id}`,
    id: id,
  });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    message: "Handling PATCH request",
    id: id,
  });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    message: "Deleted product!",
    id: id,
  });
});

module.exports = router;
