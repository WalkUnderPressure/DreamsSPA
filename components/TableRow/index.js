import React, { Component } from 'react';
import ItemsList from '../ItemsList'
import styles from './TableRow.module.css';
import Link from 'next/link'

class TableRow extends Component {
   
    render() {
        return (
            <tr>
                <td>{this.props.codeName}</td>
                <td>{this.props.description}</td>
                <td>{this.props.date}</td>
                <td><ItemsList itemsListHeader='Guests' /></td>
                <td><ItemsList itemsListHeader='Need Things' /></td>
                <td>
                    <div>
                        <Link href={'/redact/[id]'} as={`/redact/${this.props.id}`}><a>Redact</a></Link>
                        <Link href={'/delete/[id]'} as={`/delete/${this.props.id}`}><a>Delete</a></Link>
                    </div>
                </td>
            </tr>
        )
    }
}

export default TableRow;