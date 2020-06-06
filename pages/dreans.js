import React, { Component } from 'react';
import Layout from '../Layout'
import Table from '../components/Table';
import Link from 'next/link';
import {xRead,xDelete} from '../src'

class Dreans extends Component {
    constructor(props) {
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

    handleItemDelete = (id)=>{
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
                <Link href='/adddreans' as="/adddreans"><a>Add</a></Link>
            </Layout>
        )
    }
}

export default Dreans;