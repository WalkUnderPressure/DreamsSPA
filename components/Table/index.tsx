import React, { Component } from 'react'
import TableRow from '../TableRow'
import { List, Map } from 'immutable'
import Link from 'next/link'
import { FaPlusSquare } from 'react-icons/fa';
import UserTableRow from 'components/TableRow/UserTableRow';

interface ITableProps {
  className: string;
  data: List<Map<string, any>>;
  tableName: string;
  tableFields: Array<string>;
  createItemLink: string;
}
interface ITableState {

}

class Table extends Component<ITableProps, ITableState> {
  constructor(props: ITableProps) {
    super(props)
    this.state = {}
  }

  render() {
    const { data, tableName, tableFields, createItemLink, className } = this.props;
    const items = data;

    let rows = null
    if(items && items.size > 0){
      rows = items.valueSeq().map((item, i) => {
        if(item.get('id')){
          if(tableName === 'Users'){
            return <UserTableRow key={`user_item_${i}`} data={item} />
          }else{
            return <TableRow key={`drean_item_${i}`} data={item} />;
          }
        }
      })
    }else{
      rows = (<tr><td><h3>Table is empty!</h3></td></tr>);
    }

    let tableHeaders = tableFields.map((head: string, i: number) => {
      switch (i) {
        case 0:
          return <th key={`table_head_${i}`} className={'py-3 pl-2 pr-0 text-left '}>{head}</th> 
        case tableFields.length-1:
          return <th key={`table_head_${i}`} className='text-right py-3 pl-0 pr-2'>{head}</th>
        default:
          return <th key={`table_head_${i}`} className='py-3'>{head}</th>
      }
    })

    return (
      <div className={className + ' bg-teal-100 rounded p-2'}>
        <div className='flex flex-row justify-between items-center'>
          <div className='text-left'>
            <h1 className='text-base font-semibold'>{tableName}</h1>
            <p className='mt-2 text-xs font-medium text-gray-500'> { items && items.size > 0 && `On the current time you have ${items.size} records` || 'You don\'t have any records yet!' } </p>
          </div>
          
          <Link href={`/${createItemLink}/[id]`} as={`/${createItemLink}/add`}>
            <button className='py-2 px-4 h-full flex flex-row justify-around items-center text-white font-semibold bg-blue-300 hover:bg-blue-400 rounded focus:outline-none focus:bg-blue-500'>
              <FaPlusSquare className='text-lg mr-2'/>
              Add New Item
            </button>
          </Link>
        </div>
        <table className={'w-full'}>
          <thead className='text-xs uppercase font-medium text-gray-500'>
            <tr className=''>
              {tableHeaders || 'Table Header'}
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
