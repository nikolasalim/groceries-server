const Sequelize = require("sequelize");
const db = require("../db");
const Product = require("../product/model");
const OutOfStockProduct = require("../out-of-stock-product/model");

const Market = db.define("Market", {
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
  through: "Out of Stock Product",
  foreignKey: "marketId"
});

Product.belongsToMany(Market, {
  through: "Out of Stock Product",
  foreignKey: "productId"
});

OutOfStockProduct.belongsTo(Market, { foreignKey: "marketId" });
OutOfStockProduct.belongsTo(Product, { foreignKey: "productId" });

module.exports = Market;
