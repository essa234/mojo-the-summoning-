const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { User, Deck } = require('./index')
const { db } = require('../db/config')

// define in global scope
let user;
const users = [
  { username: 'v1per' },
  { username: 'trinity' },
  { username: 'mr_spoon' }
];

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true })
  user = await User.create({ username: 'gandalf' })
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('User', () => {
  it('has an id', async () => {
    expect(user).toHaveProperty('id')
  })

  /**
   * Create more tests
   * E.g. check that the username of the created user is actually gandalf
   */

  it('has an username', async () => {
    await User.bulkCreate(users);
    let foundUser = await User.findByPk(1)
    expect(foundUser.username).toBe("gandalf");
  })


  //association tests
  it('can associate a deck', async () => {
    let newuser = await User.create({username: "robert"});
    let newdeck = await Deck.create({name: "test-deck", xp: 100})
    await newuser.setDeck(newdeck);
    let associatedDeck = newuser.getDeck();
    expect(associatedDeck instanceof Deck).toBeTruthy();
  })
})
