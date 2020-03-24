const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("Product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;
