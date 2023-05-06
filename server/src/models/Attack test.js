const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Attack } = require('.')
const { db } = require('../db/config')

// define in global scope
let attack;


// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true })
  attack = await Attack.create({ title: 'sprit bomb', mojoCost: 100, staminaCost: 30 })
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Attack', () => {
  it('has an id', async () => {
    expect(attack).toHaveProperty('id')
  })

  /**
   * Create more tests
   * E.g. check that the username of the created user is actually gandalf
   */

  it('has an stamina cost', async () => {
    let foundAttack = await User.findByPk(0)
    expect(foundAttack.staminaCost).toBe(30);
  })

  it('attack can be assigned to many cards', async () => {
    let newattack = await Attack.create("test-attack", 100, 100);
    let card1 = await Card.create(({name: "card1", mojo: 20, stamina: 20, imgUrl: "attack.url"}));
    let card2 = await Card.create(({name: "card1", mojo: 10, stamina: 67, imgUrl: "attack.url"}));
    await card1.addAttack(newattack);
    await card2.addAttack(newattack);
    expect(card1.length + card2.length).toBe(2);

  })
})
