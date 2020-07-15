import React, { Component } from 'react';
import Link from 'next/link';
import { deleteDrean } from '../../redux/entities/MyDreanEntity';
import { connect } from 'react-redux';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Map } from 'immutable';

interface ITableRowProps {
  data: Map<string, any>;
  deleteDrean: (id: string) => void;
}

class TableRow extends Component<ITableRowProps> {
  render() {
    const element = this.props.data;
    console.log('table row item -> ', element);

    const countOfOutWords: number = 4;
    const description = element.get("description");
    let shortDescription: string = '';
    if(element && description){
      const wordsArray = description.split(' ');
      const minLen = wordsArray.length < countOfOutWords? wordsArray.length : countOfOutWords; 
      console.log('min length => ', minLen);
      for (let index = 0; index < minLen; index++) {
        const element = wordsArray[index];
        shortDescription += element+' ';
      }
    }
    // console.log('short description => ', shortDescription);

    const dateTime = element && new Date(element.get("dateOfEvent")).toLocaleDateString();
    const publicAccess = element && element.get("publicAccess") || 'Undefine';
    return (
      <tr className='text-center'>
        <td className='w-1/5 text-left py-3 pl-2 pr-0'>{element && element.get("codeName")}</td>
        <td className='pl-4 text-justify'>{ shortDescription }</td>
        <td className='px-3'>{dateTime}</td>
        <td className='font-medium text-base text-gray-500'>{element && element.get("guests").size}</td>
        <td className='font-medium text-base text-gray-500'>{element && element.get("needThings").size}</td>
        <td className='font-medium text-base text-gray-500'>{publicAccess}</td>
        <td className='align-middle'>
          <div className='flex flex-row justify-end items-center'>
            <Link href={'/redact/[id]'} as={`/redact/${element.get("id")}`}>
                <button className={'h-full mx-1 p-2 bg-transparent hover:bg-purple-700 ' +
                    'text-purple-700 hover:text-white text-base border border-gray-400 hover:border-white ' +
                    'rounded focus:outline-none focus:bg-purple-800'}>
                <FaEdit />
                </button>
            </Link>
            <button onClick={ this.handleDelete } className={'h-full mx-1 p-2 bg-transparent hover:bg-purple-700 ' +
                    'text-purple-700 hover:text-white text-base  border border-gray-400 hover:border-white ' +
                    'rounded focus:outline-none focus:bg-purple-800'}>
                <FaTrash/>
            </button>
          </div>
        </td>
      </tr>
    )
  }

  handleDelete = () => {
    const id: string = this.props.data.get("id");
    console.log('id for delete -> ', id);
    this.props.deleteDrean(id);
  }
}

const mapStateToProps = (state: any) => {
  return ({
    tableItems: state.entities.get(['dreans']),
  })
}

const mapDispatchToProps = (dispatch: any) => ({
  deleteDrean: (id: string) => dispatch(deleteDrean(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TableRow) 
