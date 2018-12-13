import getItems from './fixtures'



export class StateManager {

  constructor (Manager = STATE_MANAGERS.PLAIN) {
    console.log('euh', Manager)
    this.state = new Manager()
  }

  addItem (item, position = (this.state.items.length - 1)) {
    this.state.addItem(item, position)
    return this.getItems()
  }

  setItemProperty (id, key, value) {
    this.state.setItemProperty(id, key, value)
    return this.getItems()
  }

  getItems () {
    return this.state.getItems()
  }

  reset () {
    this.state.reset()
    return this.state.getItems()
  }

  getCurrentType () {
    return this.state.constructor.name
  }
}

class PlainStateManager {
  constructor () {
    // We only create (clone, see fixtures) new items at creation time or when resetting.
    this.reset()
  }

  addItem (item, position) {
    this.items.splice(position, 0, item)
  }

  setItemProperty (id, key, value) {
    this.getItem(id)[key] = value
  }

  getItem (id) {
    return this.items.find(i => i.id === id)
  }

  getItems () {
    return this.items
  }

  reset () {
    this.items = getItems()
  }
}

class ManualImmutableStateManager {
  constructor () {
    // We only create (clone, see fixtures) new items at creation time or when resetting.
    this.reset()
  }

  addItem (item, position) {
    this.items = [...this.items.slice(0, position), item, ...this.items.slice(position)]
  }

  /**
   * Shallowly sets an item property. don't use for deep updates
   * @param id
   * @param key
   * @param value
   */
  setItemProperty (id, key, value) {
    this.items = this.items.map((item, index) => {
      if (item.id !== id) {
        return item
      }

      return {
        ...item,
        [key]: value
      }
    })
  }

  getItem (id) {
    return this.items.find(i => i.id === id)
  }

  getItems () {
    return this.items
  }

  reset () {
    this.items = getItems()
  }
}

export const STATE_MANAGERS = {
  PLAIN: PlainStateManager, // mutative
  MANUAL_IMMUTABLE: ManualImmutableStateManager // 'immutable' via plain object copying
}