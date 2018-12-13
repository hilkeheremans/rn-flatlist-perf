import React from 'react'
import { View, FlatList, Text, Button } from 'react-native'
import { STATE_MANAGERS, StateManager } from './state'
import { createItem } from './state/fixtures'

class MutableFlatList extends React.Component {



  constructor (...args) {
    super(...args)
    console.log('wwwaat', STATE_MANAGERS)
    this.stateManager = new StateManager(STATE_MANAGERS.PLAIN)
    this.state = {
      items: this.stateManager.getItems()
    }

  }

  _reset = () => {
    // reset and trigger rerender
    this.setState({
      items: this.stateManager.reset()
    })
  }

  _addNewRandom = () => {
    this.setState({
      items: this.stateManager.addItem(createItem(1001 + random(1000)), 9)
    })
  }

  _addNewRandomAtEnd = () => {
    this.setState({
      items: this.stateManager.addItem(createItem(1001 + random(1000)))
    })
  }

  _changeItem10 = () => {
    this.setState({
      items: this.stateManager.setItemProperty(10, 'name', 'changed')
    })
  }


  render() {
    return (
      <View>
      <View
        style={{
          height: 200,
          backgroundColor: 'yellow'
        }}
      >
        <FlatList
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={keyExtractor}
          initialNumToRender={10}
          windowSize={5}
          maxToRenderPerBatch={10}
          data={this.state.items}
        />
      </View>
        <Button onPress={this._reset} title='Reset'/>
        <Button onPress={this._addNewRandom} title='Add new item with random id at pos 10'/>
        <Button onPress={this._addNewRandomAtEnd} title='Add item at end'/>
        <Button onPress={this._changeItem10} title='Change item with id 10'/>
      </View>
    )
  }
}

function random (max) {
  return Math.floor(Math.random() * max) + 1
}

/*

Finding 1: FlatList always seems to prerender, on mount, about 10 'pages' worth of items.
The exact number of items thus depends on the individual height of the item, as well as the total height of the flatlist.

Finding 2: adjusting initialNumToRender does not seem to affect this initial render below its 'minimum' of 10 pages. It IS possible to increase it though.

CAUSE: windowSize prop

 */

const itemStyle = {
  height: 80,
  backgroundColor: 'blue',
  width: 500
}

class Item extends React.PureComponent {

  constructor (props) {
    super(props)

  }

  componentDidMount () {
    console.log(`Item with ${this.props.item.id} has mounted.`)
  }

  componentWillUnmount () {
    console.log(`Item with ${this.props.item.id} has UNmounted.`)
  }

  componentDidUpdate () {
    console.log(`Item with ${this.props.item.id} has updated.`)
  }

  render () {
    const {
      item
    } = this.props
    // console.log(`Item with ${item.id} is rendering.`)
    return (
      <View
        style={itemStyle}
      >
        <Text style={{ color: 'white' }}>
          Hello: {item.id} {item.name}
        </Text>
      </View>
    )
  }
}

function keyExtractor (item) { return String(item.id) }

export default MutableFlatList