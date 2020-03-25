const Sequelize = require("sequelize");
const db = require("../db");

const MarketsProducts = db.define("markets_product", {
  marketId: {
    type: Sequelize.INTEGER
  },
  productId: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.STRING
  }
});

module.exports = MarketsProducts;
