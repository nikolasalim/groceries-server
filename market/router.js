const { Router } = require("express");
const Market = require("./model");
const { Op } = require("sequelize");

const router = new Router();

// Creating a market

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

// Reading all markets

// router.get("/market", (req, res, next) => {
//   Market.findAll({ include: [{ all: true }] })
//     .then(market => {
//       res.json(market);
//     })
//     .catch(next);
// });

router.get("/market", (req, res, next) => {
  const isEmpty = !Object.keys(req.query).length;
  if (isEmpty) {
    Market.findAll({ include: [{ all: true }] })
      .then(market => {
        res.json(market);
      })
      .catch(next);
  } else {
    Market.findAll(
      { where: { name: { [Op.iLike]: "%" + req.query.searched + "%" } } },
      { include: [{ all: true }] }
    )
      .then(market => {
        res.json(market);
      })
      .catch(next);
  }
});

// // Reading searched markets

// router.get("/market/:searchRequest", (req, res, next) => {
//   // console.log("req.params is:", req.params);
//   console.log("request query is:", req.query);

//   Market.findAll(
//     { where: { name: { [Op.iLike]: "%" + req.params.searchRequest + "%" } } },
//     { include: [{ all: true }] }
//   )
//     .then(market => {
//       res.json(market);
//     })
//     .catch(next);
// });

// Updating which products are out of stock in which markets

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
