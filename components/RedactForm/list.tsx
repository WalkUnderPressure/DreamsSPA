import React, { Component } from 'react'
import { ListItem } from './listItem'
import Faker from 'faker';

interface IListProps{
  handleOnChangeString: Function;
  addNewItemHandler: Function;
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
      items: Array<string>()
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
      const key = Faker.random.uuid();
      return <ListItem
                key={`listItem_id:${item}${i}`} 
                index={i} item={item} 
                handleOnDelete={this.handlerOfDeleteListItem}
                handleOnChangeString={this.handleOnChangeString} />
    }) || 'list empty';

    // console.log('list items',listItems);

    return (
      <div>
        <h3>{this.props && this.props.listName}</h3>
        <button type="button" onClick={this.addNewItemHandler}>Add new item</button>
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }

  handlerOfDeleteListItem = (index: number) => {
    this.props.handleOnDelete(index, this.props.name)
  }


  // console.log(changedString)
  // this.setState({ item : changedString })

  handleOnChangeString = (index: number, changedString: string) => {
    this.props.handleOnChangeString(index, this.props.name, changedString);
  }

  addNewItemHandler = () => {
    this.props.addNewItemHandler(this.props.name);
  }
}
