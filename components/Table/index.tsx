import React, { Component } from 'react'
import TableRow from '../TableRow'
import { List, Map } from 'immutable'
import Link from 'next/link'
import { FaPlusSquare } from 'react-icons/fa';

interface ITableProps {
  className: string;
  data: List<Map<string, any>>,
  tableName: string,
}
interface ITableState {

}

class Table extends Component<ITableProps, ITableState> {
  constructor(props: ITableProps) {
    super(props)
    this.state = {}
  }

  render() {
    const { data, className } = this.props;
    const items = data;

    let rows = null

    console.log('table items -> ', items);

    if(items && items.size > 0){
      rows = items.valueSeq().map((item, i) => {
        if(item.get('id')){
          const res = <TableRow key={'drean_item_' + i} data={item} />;
          return res;
        }
      })
    }else{
      rows = (<tr><td><h3>Table is empty!</h3></td></tr>);
    }

    return (
      <div className={className + ' bg-teal-100 rounded p-2'}>
        <div className='flex flex-row justify-between items-center'>
          <div className='text-left'>
            <h1 className='text-base font-semibold'>{this.props.tableName}</h1>
            <p className='mt-2 text-xs font-medium text-gray-500'> { items && items.size > 0 && `On the current time you have ${items.size} records` || 'You don\'t have any records yet!' } </p>
          </div>
          
          <Link href='/redact/[id]' as='/redact/add'>
            <button className='py-2 px-4 h-full flex flex-row justify-around items-center text-white font-semibold bg-blue-300 hover:bg-blue-400 rounded focus:outline-none focus:bg-blue-500'>
              <FaPlusSquare className='text-lg mr-2'/>
              Add New Drean
            </button>
          </Link>
        </div>
        <table className={'w-full'}>
          <thead className='text-xs uppercase font-medium text-gray-500'>
            <tr className=''>
              <th className={'py-3 pl-2 pr-0 text-left '}>Code Name</th>
              <th className='py-3'>Description</th>
              <th className='py-3'>Date</th>
              <th className='py-3'>Guests</th>
              <th className='py-3'>Need Things</th>
              <th className='py-3'>Access</th>
              <th className='text-right py-3 pl-0 pr-2'>ACTION</th>
            </tr>
          </thead>
          <tbody className={'text-sm font-bold'}>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table
