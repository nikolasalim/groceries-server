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

module.exports = router;
