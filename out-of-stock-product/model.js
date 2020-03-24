const Sequelize = require("sequelize");
const db = require("../db");

const OutOfStockProduct = db.define("Out of Stock Product", {
  marketId: {
    type: Sequelize.INTEGER
    // references: {
    //   model: "Market",
    //   key: "id"
    // },
    // onUpdate: "CASCADE",
    // onDelete: "CASCADE"
  },
  productId: {
    type: Sequelize.INTEGER
    // references: {
    //   model: "Product",
    //   key: "id"
    // },
    // onUpdate: "CASCADE",
    // onDelete: "CASCADE"
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = OutOfStockProduct;
