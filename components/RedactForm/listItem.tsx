import React, { Component } from 'react'
import { index } from '@typegoose/typegoose';

interface IListItemProps{
  handleOnChangeString: Function;
  handleOnDelete : Function;
  index: number;
  item : string;
}

interface IListItemState{
  index: number
  item : string
}

export class ListItem extends Component<IListItemProps, IListItemState> {
  constructor (props : IListItemProps) {
    super(props)
    this.state = {
      ... this.props
    }
  }

  static getDerivedStateFromProps (props : IListItemProps, state : IListItemState) {
    return { ...props, ... state }
  }

  render () {
    const element = this.state;
    // console.log('list item data : ',element);
    return (
        <li>
          <input type="text" onChange={this.handleOnChange} value={element.item}/>
          <button type="button" onClick={this.handleOnDelete}>Remove</button>
        </li>
    )
  }

  handleOnChange = (event) => {
    const changedString = event.target.value;
    // this.setState({ item: changedString});
    this.props.handleOnChangeString(this.props.index, changedString);
  }

  handleOnDelete = (event) => {
    event.preventDefault();
    this.props.handleOnDelete(this.props.index)
  }
}
