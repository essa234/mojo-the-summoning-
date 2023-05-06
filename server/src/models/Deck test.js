const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Deck } = require('.')
const { db } = require('../db/config')

// define in global scope
let deck;

const deckNames = ['snake pit', 'the matrix', 'Doom Burger']
// const decks = await Promise.all(
//     users.map((u, i) => u.createDeck({ name: deckNames[i] }))
//   )

// clear db and create new card before tests
beforeAll(async () => {
  await db.sync({ force: true })
  deck = await Deck.create({name: deckNames[0], xp: 100});
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Deck', () => {
  it('has an id', async () => {
    expect(deck).toHaveProperty('id')
  })

  

  it('has an imgUrl', async () => {
    let foundDeck = await Deck.findByPk(0)
    expect(foundDeck.name).toBe("snake pit");
  })

  it('Deck can have many cards', async () => {
    let newdeck = await Deck.create({name: "deck", xp: 100})
    let card1 = await Card.create({name: "card-1", mojo: 10, stamina: 20, imgUrl: "test1.url"});
    let card2 = await Card.create({name: "card-2", mojo: 20, stamina: 30, imgUrl: "test2.url"});

    await newdeck.addCard(card1);
    await newdeck.addCard(card2);

    let associatedDecks = await newdeck.getCards();
    expect(associatedDecks.length).toBe(2);
  })
})