const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Card } = require('.')
const { db } = require('../db/config')

// define in global scope
let card;
const cards = [
    {
      name: 'Arcturus Spellweaver',
      mojo: 100,
      stamina: 10,
      imgUrl: 'http://localhost:5000/img/arcturus-spellweaver.jpg'
    },
    {
      name: 'Nimue Mistral',
      mojo: 100,
      stamina: 10,
      imgUrl: 'http://localhost:5000/img/nimue-mistral.jpg'
    },
    {
      name: 'Theron Thunderstrike',
      mojo: 100,
      stamina: 10,
      imgUrl: 'http://localhost:5000/img/theron-thunderstrike.jpg'
    },
    {
      name: 'Lirien Moonshadow',
      mojo: 100,
      stamina: 10,
      imgUrl: 'http://localhost:5000/img/lirien-moonshadow.jpg'
    },
    {
      name: 'Alaric Flamecaller',
      mojo: 100,
      stamina: 10,
      imgUrl: 'http://localhost:5000/img/alaric-flamecaller.jpg'
    }
  ]

// clear db and create new card before tests
beforeAll(async () => {
  await db.sync({ force: true })
  card = await Card.bulkCreate(cards);
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Card', () => {
  it('has an id', async () => {
    expect(card).toHaveProperty('id')
  })

  

  it('has an imgUrl', async () => {
    let foundCard = await Card.findByPk(0)
    expect(foundCard.imgUrl).toBe('http://localhost:5000/img/arcturus-spellweaver.jpg');
  })


  it("card can only belong to one deck", async () => {
    let deckcard = await Card.create({name: "deck card", mojo: 20, stamina: 20, imgUrl: "deck.url"});
    let newdeck = await Deck.create({name: "deck", xp: 100});
  
    await deckcard.setDeck(newdeck);
    let associatedDeck = deckcard.getDeck();
    expect(associatedDeck instanceof Deck).toBeTruthy();

  })


  it("card can have many attacks", async () => {
    let newcard = await Card.create({name: "card", mojo: 10, stamina: 20, imgUrl: "test.url"})
    let attack1 = await Attack.create({name: "deck1", xp: 100})
    let attack2 = await Attack.create({name: "deck2", xp: 100})
    await newcard.addAttack(attack1);
    await newcard.addAttack(attack2);

    let associatedAttacks = await newcard.getAttacks();
    expect(associatedAttacks.length).toBe(2);
  })
})