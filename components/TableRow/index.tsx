import React, { Component } from 'react';
import Link from 'next/link';
import { deleteUserDrean } from '../../redux/actions/UsersDreansActions';
import { connect } from 'react-redux';

interface ITableRowProps {
  data: Map<string, any>;
  deleteUserDrean: (id: string) => void;
}

class TableRow extends Component<ITableRowProps> {
  render() {
    const element = this.props.data;
    console.log('table row item -> ', element);

    const dateTime = element && new Date(element.get("dateOfEvent")).toLocaleDateString();
    return (
      <tr>
        <td>{element && element.get("codeName")}</td>
        <td>{element && element.get("description")}</td>
        <td>{dateTime}</td>
        <td>{element && element.get("guests").size || 'empty'}</td>
        <td>{element && element.get("needThings").size || 'empty'}</td>
        <td>
          <div className={'flex flex-row justify-around'}>
            <Link href={'/redact/[id]'} as={`/redact/${element.get("_id")}`}>
                <button className={'my-2 bg-transparent hover:bg-blue-300 ' +
                    'text-red-600 font-semibold hover:text-white py-2 px-4 ' +
                    'border border-red-800 hover:border-transparent rounded'}>
                Redact
                </button>
            </Link>
            <button onClick={this.handleDelete} className={'my-2 bg-transparent hover:bg-red-700 ' +
                'text-red-600 font-semibold hover:text-white py-2 px-4 ' +
                'border border-red-800 hover:border-transparent rounded'}>
                Delete
            </button>
          </div>
        </td>
      </tr>
    )
  }

  handleDelete = () => {
    const id: string = this.props.data.get("_id");
    this.props.deleteUserDrean(id);
  }
}

const mapStateToProps = (state: any) => {
  return ({
    tableItems: state.entity.getIn(['dreans']),
  })
}

const mapDispatchToProps = (dispatch: any) => ({
  deleteUserDrean: (id: string) => dispatch(deleteUserDrean(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TableRow) 
