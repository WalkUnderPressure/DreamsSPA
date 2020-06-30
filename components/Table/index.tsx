import React, { Component } from 'react'
import TableRow from '../TableRow'
import DreanItem from '../../Templates/DreanItem'
import { List, fromJS } from 'immutable'

interface ITableProps{
    data : List<Map<string, any>>
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

    console.log('table items -> ', items);

    if (items && items.size > 0) {
      rows = items.map((item, i) => {
        return <TableRow key={'drean_item+' + i} data={item} />
      })
    }else {
      rows = <tr><td><h3>Table is empty!</h3></td></tr>
    }

    return (
      <div className={'text-center'}>
        <table className={'table-fixed'}>
          <thead>
            <tr>
              <th className={'w-1/6 px-4 py-2'}>Code Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Guests</th>
              <th>Need Things</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody className={''}>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table
