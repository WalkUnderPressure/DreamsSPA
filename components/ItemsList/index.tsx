import React, { Component } from 'react'

interface IItemsListProps {
    items: Array<string>;
}
interface IItemsListState {
    items: Array<string>;
    isOpen: boolean;
}

class ItemsList extends Component<IItemsListProps, IItemsListState> {
  constructor (props: IItemsListProps) {
    super(props)
    this.state = {
      items: [],
      isOpen: true
    }
  }

  static getDerivedStateFromProps (props: IItemsListProps, state: IItemsListState) {
    return { items : props.items }
  }

  render () {
    const itemsArray = this.state.items
    const emptyList = 'Empty List'
    let itemsList = null
    if (itemsArray != null) {
      itemsList = this.state.items !== null && this.state.items.map((item,i) => {
        return <li key={`list_item_id${i}`} > { item } </li>
      })
    } else {
      itemsList = emptyList
    }

    return (
      <div>
        <ul>
          {this.state.isOpen ? itemsList : emptyList}
        </ul>
        <button onClick={this.hideOpenHandler}>{this.state.isOpen ? 'Hide' : 'Open'}</button>
      </div>
    )
  }

    hideOpenHandler = () => {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
}

export default ItemsList
