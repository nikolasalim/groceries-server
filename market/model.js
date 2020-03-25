const Sequelize = require("sequelize");
const db = require("../db");
const Product = require("../product/model");
const MarketsProducts = require("../MarketProduct/model");

const Market = db.define("market", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  latitude: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  longitude: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Market.belongsToMany(Product, {
  as: "oosProducts",
  through: "markets_product",
  foreignKey: "marketId"
});

Product.belongsToMany(Market, {
  through: "markets_product",
  foreignKey: "productId"
});

MarketsProducts.belongsTo(Market, { foreignKey: "marketId" });
MarketsProducts.belongsTo(Product, { foreignKey: "productId" });

module.exports = Market;
