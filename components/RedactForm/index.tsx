import React, { Component } from 'react'
import DreanItem from '../../Templates/DreanItem';
import { List } from './list'

interface IRedactFormProps{
    onSubmit : Function;
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

    console.log(`props : ${this.props.data}  state : ${this.state.data}`);
    console.log('redact form data : ', element);
    return (
      <form onSubmit={this.handleOnSubmit}>
        <input type="hidden" name="id" value={element && element._id} />
        <input type="text" name="codeName" value={element && element.codeName} onChange={this.handleInputChange} />
        <input type="text" name="description" value={element && element.description} onChange={this.handleInputChange} />
        <input type="text" name="dateOfEvent" value={element && (element.dateOfEvent == null ? '' : String(element.dateOfEvent))} onChange={this.handleInputChange} />

        {/* <List listName={'Guests'} items={element && element.guests} handleOnDelete={this.handleOnDelete} /> */}
        {/* <List listName={'Need Things'} items={element && element.needThings} handleOnDelete={this.handleOnDelete} /> */}
        <button type="submit">{element && element._id ? 'Save' : 'Add'}</button>
      </form>
    )
  }

  handleOnDelete = (target: string) => {
    console.log('target : ', target)
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state.data)
  }

  handleInputChange = (event) => {
    const value : string = event.target.value
    const name : string = event.target.name

    this.state.data[name] = value
    this.setState({ data: this.state.data })
  };
}

export default RedactForm
