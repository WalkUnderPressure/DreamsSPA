import React, { Component } from 'react'
import { ListItem } from './listItem'

interface IListProps{
    handleOnDelete : Function;
    listName : string
    items : Array<string>
}

interface IListState{
    items : Array<string>
}

export class List extends Component<IListProps, IListState> {
  constructor (props : IListProps) {
    super(props)
    this.state = {
      items: []
    }
  }

  static getDerivedStateFromProps (props : IListProps, state : IListState) {
    return { items: props.items }
  }

  render () {
    const element = this.state.items;
    let listItems = null

    console.log('list items data : ', this.state.items);

    listItems = element && element.map((item,i) => {
      return <ListItem key={`listItem_id:${i}`} item={item} handleOnDelete={this.props.handleOnDelete}/>
    })
    return (
      <div>
        <h3>{this.props && this.props.listName}</h3>
        {listItems}
        <button onClick={this.onClickHandler}>Add new item</button>
      </div>
    )
  }

  onClickHandler = (event) => {
    event.PreventDefault();
    console.log('add new list item click');
  }
}
