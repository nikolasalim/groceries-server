const { Router } = require("express");
const Market = require("./model");
const { Op } = require("sequelize");
const Product = require("../Product/model");
const MarketsProducts = require("../MarketProduct/model");
const superagent = require("superagent");

const router = new Router();

// Creating a market

router.post("/market", (req, res, next) => {
  const market = {
    name: req.body.name,
    latitude: req.body.geometry.location.lat,
    longitude: req.body.geometry.location.lng
  };

  Market.create(market)
    .then(market => {
      res.json(market);
    })
    .catch(next);
});

// Reading all markets or searched markets

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

// Reading products from a specific market

router.get("/:marketId/product", (req, res, next) => {
  const isEmpty = !Object.keys(req.query).length;

  if (isEmpty) {
    Market.findByPk(req.params.marketId)
      .then(market =>
        market.getOosProducts(req.body.productId, {
          through: { status: req.body.status }
        })
      )
      .then(data => {
        res.send(data);
      })
      // .then(res.send.bind(res))

      .catch(next);
  } else {
    Market.findByPk(req.params.marketId, {
      include: {
        model: Product,
        as: "oosProducts",
        where: { name: { [Op.iLike]: "%" + req.query.searched + "%" } }
      }
    })
      .then(market => {
        console.log(
          "market.dataValues.oosProducts is:",
          market.dataValues.oosProducts
        );
        res.send(market.dataValues.oosProducts);
      })

      .catch(next);
  }
});

// Updating which products are out of stock for a specific market

router.put("/:marketId/product/:productId", (req, res, next) => {
  Market.findByPk(req.params.marketId)

    .then(market =>
      market.addOosProducts(req.params.productId, {
        through: { status: req.body.status }
      })
    )
    .then(data => {
      res.send(data);
    })

    .catch(next);
});

// Removing product

router.delete("/:marketId/product/:productId", (req, res, next) => {
  console.log("router.delete is running");

  Market.findByPk(req.params.marketId)

    .then(market =>
      market.removeOosProducts(req.params.productId, {
        through: { status: req.body.status }
      })
    )
    .then(res.json(req.params.productId))

    .catch(next);
});

// Reading fetched searched markets results

router.get("/find", (req, res, next) => {
  const searchRequest = req.query.searched;
  const searchRequestFormated = searchRequest.split(" ").join("+");

  superagent
    .get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?input=${searchRequestFormated}&inputtype=textquery&fields=formatted_address,name,opening_hours,geometry&key=AIzaSyAPU3Byc-ML0f-09-kZZsbiAgMQEHtGg_4`
    )
    .then(data => res.json(data.text))
    .catch(console.error);
});

module.exports = router;
