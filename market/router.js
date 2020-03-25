const { Router } = require("express");
const Market = require("./model");

const router = new Router();

router.post("/market", (req, res, next) => {
  const market = {
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };

  Market.create(market)
    .then(market => {
      res.json(market);
    })
    .catch(next);
});

router.get("/market", (req, res, next) => {
  Market.findAll({ include: [{ all: true }] })
    .then(market => {
      res.json(market);
    })
    .catch(next);
});

router.put("/:marketId/product", (req, res, next) => {
  Market.findByPk(req.params.marketId)

    .then(market =>
      market.addOosProducts(req.body.productId, {
        through: { status: req.body.status }
      })
    )
    .then(res.send.bind(res))

    .catch(next);
});

module.exports = router;
