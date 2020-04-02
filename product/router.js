const { Router } = require("express");
const Product = require("./model");
const Market = require("../Market/model");

const router = new Router();

// Creating a new product

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

// Removing a product

router.delete("/:marketId/product/:productId", (req, res, next) => {
  Market.findByPk(req.params.marketId)

    .then(market =>
      market.removeOosProducts(req.params.productId, {
        through: { status: req.body.status }
      })
    )
    .then(res.json(req.params.productId))

    .catch(next);
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

module.exports = router;
