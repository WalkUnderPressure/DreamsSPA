import React, { Component } from 'react';
import Layout from '../Layout'
import Table from '../components/Table';
import Link from 'next/link';

class Dreans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableItems: []
        }
    }

    componentDidMount() {
        fetch('/api/alldreans')
            .then(res => res.json())
            .then(res => {
                this.setState({ tableItems: res });
            })
    }

    handleItemDelete = (id)=>{
        const url = "/api/remove";
        fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id : id })
        }).then(
            res => {return res.json()})
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