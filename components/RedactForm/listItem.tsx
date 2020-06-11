import React, { Component } from 'react'

interface IListItemProps{
  handleOnDelete : Function;
  item : string
}

interface IListItemState{
  item : string
}

export class ListItem extends Component<IListItemProps, IListItemState> {
  constructor (props : IListItemProps) {
    super(props)
    this.state = {
      item: ''
    }
  }

  static getDerivedStateFromProps (props : IListItemProps, state : IListItemState) {
    console.log(`state ${state} props ${props}`);
    return { item : props.item }
  }

  render () {
    const element = this.state.item
    return (
      <div>
        <li>
          <input type="text" onChange={this.handleOnChange} value={element}/>
          <button onClick={this.handleOnDelete}>Remove</button>
        </li>
      </div>
    )
  }

  handleOnChange = (event) => {
    const changedString = event.target.value;
    console.log(changedString)
    this.state.item = changedString;
    this.setState({ item : this.state.item })
  }

  handleOnDelete = (event) => {
    event.preventDefault();
    this.props.handleOnDelete(this.state.item)
  }
}
