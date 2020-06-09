import React, { Component } from 'react';
import Layout from '../Layout';
import Table from '../components/Table';
import Link from 'next/link';
import {xRead,xDelete} from '../src';
import Item from '../Templates/Item';

interface IDreansProps{

}
interface IDreansState{
    tableItems : Array<Item>;
}

class Dreans extends Component<IDreansProps,IDreansState> {
    constructor(props : any) {
        super(props);
        this.state = {
            tableItems: []
        }
    }

    componentDidMount() {
        const url = '/api/alldreans';
        xRead(url,{})
            .then(res => {
                this.setState({ tableItems: res });
            })
    }

    handleItemDelete = (id : string)=>{
        const url = "/api/remove";
        xDelete(url,{id : id })
            .then(res => {
                this.setState({tableItems : res.data})
            })
    }

    render() {
        return (
            <Layout>
                <Table data={this.state.tableItems} handleItemDelete={this.handleItemDelete}/>
                <Link href='/redact/[id]' as="/redact/add"><a>Add</a></Link>
            </Layout>
        )
    }
}

export default Dreans;