const { db, Sequelize } = require("../db/config.js");

const Attack = db.define("Attack", {
    title: Sequelize.STRING,
    mojoCost: Sequelize.INTEGER,
    staminaCost: Sequelize.INTEGER
})

module.exports = {
    Attack
}