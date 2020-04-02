const { Router } = require("express");
const Market = require("./model");
const { Op } = require("sequelize");
const Product = require("../Product/model");
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
    Market.findAll({
      include: [{ model: Product, as: "oosProducts" }],
      order: [["id", "DESC"]]
    })
      .then(market => {
        res.json(market);
      })
      .catch(next);
  } else {
    Market.findAll(
      { where: { name: { [Op.iLike]: "%" + req.query.searched + "%" } } },
      { include: [{ model: Product, as: "oosProducts" }] }
    )
      .then(market => {
        res.json(market);
      })
      .catch(next);
  }
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
