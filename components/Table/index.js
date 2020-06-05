import React, { Component } from 'react';
import styles from './Table.module.css';
import TableRow from '../TableRow';

class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const items = this.props.data;
        let rows = null;
        
        if (items && items.length > 0) {
            rows = items.map(item => {
                return <TableRow id={item.id} codeName={item.codeName} description={item.description} date={item.date} handleItemDelete={this.props.handleItemDelete}/>
            })
        } else {
            rows = <tr><td><h1>Table is empty!</h1></td></tr>;
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

export default Table;