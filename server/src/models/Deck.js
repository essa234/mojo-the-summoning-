const { db, Sequelize } = require("../db/config.js");

const Deck = db.define("Deck", {
    name: Sequelize.STRING,
    xp: Sequelize.INTEGER
})

module.exports = {
    Deck
}