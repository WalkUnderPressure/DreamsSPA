import React, { Component } from 'react';
import Link from 'next/link';
import { deleteUser } from '../../redux/entities/UserEntity';
import { connect } from 'react-redux';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Map } from 'immutable';

interface ITableRowProps {
  data: Map<string, any>;
  deleteUser: (id: string) => void;
}

class UserTableRow extends Component<ITableRowProps> {
  render() {
    const element = this.props.data;
    console.log('user table row item -> ', element);

    // const description = element.get("description");
    // const shortDescription: string = element && shortContent(description, 4);
    
    // const dateTime = element && new Date(element.get("dateOfEvent")).toLocaleDateString();
    // const publicAccess = element && element.get("publicAccess") || 'Undefine';


    return (
      <tr className='text-center'>
        {/* <td className='w-1/5 text-left py-3 pl-2 pr-0'>{element && element.get("id")}</td> */}
        
        <td className='w-1/5 text-left py-3 pl-2 pr-0'>{element && element.get("firstName")}</td>
        <td className='w-1/5 text-left py-3 pl-2 pr-0'>{element && element.get("lastName")}</td>
        
        <td className='w-1/5 text-left py-3 pl-2 pr-0'>{element && element.get("role")}</td>
        <td className='w-1/5 text-left py-3 pl-2 pr-0'>{element && element.get("email")}</td>

        <td className='align-middle'>
          <div className='flex flex-row justify-end items-center'>
            <Link href={'/redactUser/[id]'} as={`/redactUser/${element.get("id")}`}>
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
    this.props.deleteUser(id);
  }
}

const mapStateToProps = (state: any) => {
  return state
}

const mapDispatchToProps = (dispatch: any) => ({
  deleteUser: (id: string) => dispatch(deleteUser(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserTableRow) 
