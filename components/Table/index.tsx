import React, { Component } from 'react'
import TableRow from '../TableRow'
import DreanItem from '../../Templates/DreanItem'
import { List } from 'immutable'

interface ITableProps{
    handleItemDelete : Function;
    data : Array<DreanItem>
}
interface ITableState{

}

class Table extends Component<ITableProps, ITableState> {
  constructor (props:ITableProps) {
    super(props)
    this.state = {}
  }

  render () {
    const items = this.props.data
    let rows = null

    console.log('items -> ', items);

    if (items && items.length > 0) {
      rows = items.map((item, i) => {
        return <TableRow key={'drean_item+' + i} data={item} handleItemDelete={this.props.handleItemDelete}/>
      })
    } else {
      rows = <tr><td><h3>Table is empty!</h3></td></tr>
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
