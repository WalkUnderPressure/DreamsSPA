import React, { Component } from 'react'

interface IListItemProps{
  handleOnChangeString: Function;
  handleOnDelete : Function;
  index: number;
  item : string;
}

interface IListItemState{
  index: number;
  item : string;
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
    event.target.index = this.state.index;
    this.props.handleOnChangeString(event);
    
    this.setState({
      item: event.target.value
    })
  }

  handleOnDelete = (event) => {
    event.preventDefault();
    this.props.handleOnDelete(this.state.index)
  }
}
