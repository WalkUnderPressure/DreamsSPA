import React, { Component } from 'react'
import PropTypes from 'prop-types'



class Todo extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <li
        onClick={this.props.onClick}
        style={{
          textDecoration: this.props.completed ? 'line-through' : 'none'
        }}
      >
        {this.props.text}
        <button onClick={this.props.removeOnClick} >Remove</button>
      </li>
    )
  }
}

Todo.propTypes = {
  removeOnClick: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo;