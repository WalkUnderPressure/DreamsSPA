import React, { Component } from 'react'
import ItemsList from '../ItemsList'
import Link from 'next/link'
import DreanItem from '../../Templates/DreanItem';

interface ITableRowProps {
  data: DreanItem;
  handleItemDelete: Function;
}

// Todo.propTypes = {
//   removeOnClick: PropTypes.func.isRequired,
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

class TableRow extends Component<ITableRowProps> {
  render() {
    const element = this.props.data;
    const dateTime = element && new Date(element.dateOfEvent).toLocaleDateString();
    return (
      <tr>
        <td>{element && element.codeName}</td>
        <td>{element && element.description}</td>
        <td>{dateTime}</td>
        <td>{element && element.guests.length || 'empty'}</td>
        <td>{element && element.needThings.length || 'empty'}</td>
        <td>
          <div>
            <Link href={'/redact/[id]'} as={`/redact/${this.props.data._id}`}><a>Redact</a></Link>
            <button onClick={this.handleDelete}>Delete</button>
          </div>
        </td>
      </tr>
    )
  }

  handleDelete = () => {
    this.props.handleItemDelete(this.props.data._id)
  }
}

export default TableRow
