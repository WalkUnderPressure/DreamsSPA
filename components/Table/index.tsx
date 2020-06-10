import React, { Component } from 'react'
import TableRow from '../TableRow'
import Item from '../../Templates/Item'

interface ITableProps{
    handleItemDelete : Function;
    data : Array<Item>;
}
interface ITableState{

}

class Table extends Component<ITableProps, ITableState> {
  constructor (props:ITableProps) {
    super(props)
  }

  render () {
    const items = this.props.data
    let rows = null

    if (items && items.length > 0) {
      rows = items.map(item => {
        return <TableRow data={item} handleItemDelete={this.props.handleItemDelete}/>
      })
    } else {
      rows = <tr><td><h1>Table is empty!</h1></td></tr>
    }

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Code Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Guests</th>
              <th>Need Things</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table
