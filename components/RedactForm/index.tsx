import React, { Component } from 'react'
import DreanItem from '../../Templates/DreanItem';
import { List } from './list'

interface IRedactFormProps{
  handlerDeleteSubListItem: Function;
  handlerOnSubmit : Function;
  data : DreanItem;
}
interface IRedactFormState{
    data : DreanItem;
}

class RedactForm extends Component<IRedactFormProps, IRedactFormState> {
  constructor (props : IRedactFormProps) {
    super(props)
    this.state = {
      data : {} as DreanItem
    }
  }

  static getDerivedStateFromProps (props : IRedactFormProps, state : IRedactFormState) {
    return { ...props, ...state.data}
  }

  render () {
    const element = this.state.data;
    const dateTime = element && new Date(element.dateOfEvent).toLocaleDateString();
    return (
      <form onSubmit={this.handleOnSubmit}>
        <input type="hidden" name="id" value={element && element._id} />
        <input type="text" name="codeName" value={element && element.codeName} onChange={this.handleInputChange} />
        <input type="text" name="description" value={element && element.description} onChange={this.handleInputChange} />
        <input type="text" name="dateOfEvent" value={dateTime} onChange={this.handleInputChange} />

        <List name='guests' listName={'Guests'} items={element && element.guests} handleOnDelete={this.props.handlerDeleteSubListItem} />
        <List name='needThings' listName={'Need Things'} items={element && element.needThings} handleOnDelete={this.props.handlerDeleteSubListItem} />
        <br/>
        <br/>
        <button type="submit">{element && element._id ? 'Save' : 'Add'}</button>
      </form>
    )
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    this.props.handlerOnSubmit(this.state.data)
  }

  handleInputChange = (event) => {
    const value : string = event.target.value
    const name : string = event.target.name

    this.state.data[name] = value
    this.setState({ data: this.state.data })
  };
}

export default RedactForm
