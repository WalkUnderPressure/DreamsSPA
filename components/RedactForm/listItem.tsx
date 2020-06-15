import React, { Component } from 'react'

interface IListItemProps{
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
    // console.log(`state`,state);
    // console.log(`props`,props);
    return { ...props, ... state }
  }

  render () {
    const element = this.state.item;
    // console.log('list item data : ',element);
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
    // console.log(changedString)
    this.setState({ item : changedString })
  }

  handleOnDelete = (event) => {
    event.preventDefault();
    this.props.handleOnDelete(this.props.index)
  }
}
