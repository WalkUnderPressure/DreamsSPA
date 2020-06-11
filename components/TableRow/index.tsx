import React, { Component } from 'react'
import ItemsList from '../ItemsList'
import Link from 'next/link'
import DreanItem from '../../Templates/DreanItem';

interface ITableRowProps{
    data : DreanItem;
    handleItemDelete : Function;
}

class TableRow extends Component<ITableRowProps> {
  render () {
    const element = this.props.data
    return (
      <tr>
        <td>{element && element.codeName}</td>
        <td>{element && element.description}</td>
        <td>{element && element.dateOfEvent}</td>
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
