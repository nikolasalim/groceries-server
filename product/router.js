const { Router } = require("express");
const Product = require("./model");

const router = new Router();

router.post("/product", (req, res, next) => {
  const product = {
    name: req.body.name
  };

  Product.create(product)
    .then(product => {
      res.json(product);
    })
    .catch(next);
});

module.exports = router;
