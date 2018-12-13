import _ from 'lodash'

import Chance from 'chance'
const chance = new Chance()

/**
 * Creates a single item with id
 * @param id
 * @returns {{id: *}}
 */
export const createItem = id => ({
  id: id,
  name: chance.name(),
  age: chance.age(),
  email: chance.email(),
  pressed: false
})

/**
 * By default, create 1000 items, randomly generated.
 * Generation occurs on app start and is not repeated
 */
const items = [...Array(1000).keys()].map(createItem)

/**
 * We export a function that _clones_ the items, not returns the items themselves.
 * This is to avoid having mutative state managers alter the original items.
 *
 * After all, we want to start with the same data in all state managers...
 */
export default () => {
  return _.cloneDeep(items)
}