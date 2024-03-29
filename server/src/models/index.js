const { User } = require('./User');
// import the rest of your models above
const { Deck } = require('./Deck');
const { Attack } = require('./Attack');
const { Card } = require('./Card');
//set up the associations here
User.hasOne(Deck);
Deck.belongsTo(User);

Deck.hasMany(Card);
Card.belongsTo(Deck);

Card.belongsToMany(Attack, {through: "card-attacks"});
Attack.belongsToMany(Card, {through: "card-attacks"})

// and then export them all below
module.exports = { User, Deck, Attack, Card }
