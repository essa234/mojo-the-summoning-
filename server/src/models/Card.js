const { db, Sequelize } = require("../db/config.js");

const Card = db.define("Card", {
    name: Sequelize.STRING,
    mojo: Sequelize.INTEGER,
    stamina: Sequelize.INTEGER,
    imgUrl: Sequelize.STRING
})

module.exports = {
    Card
}