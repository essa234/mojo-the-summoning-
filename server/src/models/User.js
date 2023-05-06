// create your User model here
const { db, Sequelize } = require("../db/config.js");

const User = db.define("User", {
    username: Sequelize.STRING
})

module.exports = {
    User
}