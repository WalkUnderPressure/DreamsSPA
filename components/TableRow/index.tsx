import React, { Component } from 'react';
import ItemsList from '../ItemsList';
import Link from 'next/link';
import Item from '../../Templates/Item';

interface ITableRowProps{
    data : Item;
    handleItemDelete : Function;
}

class TableRow extends Component<ITableRowProps> {
   
    render() {
        const element = this.props.data;
        return (
            <tr>
                <td>{element && element.codeName}</td>
                <td>{element && element.description}</td>
                <td>{element && element.dateOfEvent}</td>
                {/* <td><ItemsList items={this.props.guests} itemsListHeader='Guests' /></td> */}
                {/* <td><ItemsList items={this.props.needThings} itemsListHeader='Need Things' /></td> */}
                <td>
                    <div>
                        <Link href={'/redact/[id]'} as={`/redact/${this.props.data.id}`}><a>Redact</a></Link>
                        <button onClick={this.handleDelete}>Delete</button>
                    </div>
                </td>
            </tr>
        )
    }

    handleDelete = ()=>{
        this.props.handleItemDelete(this.props.data.id);
    }
}

export default TableRow;