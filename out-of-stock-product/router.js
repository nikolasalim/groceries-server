const { Router } = require("express");
const OutOfStockProduct = require("./model");

const router = new Router();

router.post("/oos", (req, res, next) => {
  const product = {
    marketId: req.body.marketId,
    productId: req.body.productId,
    status: req.body.status
  };

  OutOfStockProduct.create(product)
    .then(product => {
      res.json(product);
    })
    .catch(next);
});

module.exports = router;
