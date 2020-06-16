import React, { Component } from 'react'
import DreanItem from '../../Templates/DreanItem';
import { List } from './list'

interface IRedactFormProps{
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

    // console.log('redact form element : ',element);

    const dateTime = element && new Date(element.dateOfEvent).toLocaleDateString();
    return (
      <form onSubmit={this.handleOnSubmit}>
        <input type="hidden" name="id" value={element && element._id} />
        <input type="text" name="codeName" value={element && element.codeName} onChange={this.handleInputChange} />
        <input type="text" name="description" value={element && element.description} onChange={this.handleInputChange} />
        <input type="text" name="dateOfEvent" value={dateTime} onChange={this.handleInputChange} />

        <List 
          name='guests' 
          listName={'Guests'} 
          items={element && element.guests} 
          handleOnDelete={this.handleOnDelete}
          handleOnChangeString={this.handleOnChangeString}
          addNewItemHandler={this.addNewItemHandler} />
        <List 
          name='needThings' 
          listName={'Need Things'} 
          items={element && element.needThings} 
          handleOnDelete={this.handleOnDelete}
          handleOnChangeString={this.handleOnChangeString}
          addNewItemHandler={this.addNewItemHandler} />
        <br/>
        <br/>
        <button type="submit">{element && element._id ? 'Save' : 'Add'}</button>
        {/* <button type="button" onClick={this.getData}>get data</button> */}
      </form>
    )
  }

  // getData = () => {
  //   console.log("get data",this.state.data);
  // }

  handleOnSubmit = (event) => {
    event.preventDefault()
    this.props.handlerOnSubmit(this.state.data)
  }

  handleInputChange = (event) => {
    const value : string = event.target.value
    const name : string = event.target.name

    let newState= {...this.state};
    newState.data[name] = value
    this.setState({ ...newState })
  };

  handleOnChangeString = (event) => {
    const name = event.target.name;
    const index = event.target.index;
    const value = event.target.value
    
    this.props.data[name][index] = value;
  }

  addNewItemHandler = (name: string) => {
    this.state.data[name].push('');
    this.setState({
      data: this.state.data
    })
  }

  handleOnDelete = (index:number, target: string) => {
    const newState = { ... this.state } as IRedactFormState;
    newState.data[target] = this.state.data[target].filter( (item,i) => i !== index);
    this.setState({ ... newState });
  }
}

export default RedactForm
