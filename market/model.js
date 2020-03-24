const Sequelize = require("sequelize");
const db = require("../db");

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

module.exports = Market;
