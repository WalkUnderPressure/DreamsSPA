import React, { Component } from 'react'
import { ListItem } from './listItem'

interface IListProps{
    handleOnDelete : Function;
    name: string;
    listName : string;
    items : Array<string>;
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
    // console.log(`state`,state);
    // console.log(`props`,props);
    return { ...props, ...state.items }
  }

  render () {
    const element = this.state.items;
    let listItems = null;

    // console.log('list data : ', this.state.items);

    listItems = element && element.map((item,i) => {
      return <ListItem key={`listItem_id:${i}`} index={i} item={item} handleOnDelete={this.handlerOfDeleteListItem}/>
    })
    return (
      <div>
        <h3>{this.props && this.props.listName}</h3>
        {listItems}
        <br/>
        {/* <button onClick={this.onClickHandler}>Add new item</button> */}
      </div>
    )
  }

  handlerOfDeleteListItem = (index: number) => {
    this.props.handleOnDelete(index, this.props.name)
  }

  onClickHandler = (event) => {
    event.PreventDefault();
    console.log('add new list item click');
  }
}
