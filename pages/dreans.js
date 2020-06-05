import React, { Component } from 'react';
import Layout from '../Layout'
import Table from '../components/Table';

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
                this.setState({ tableItems: res }, () => {
                    console.log('dreans init', this.state.tableItems);
                });
            })
    }

    render() {
        return (
            <Layout>
                <Table data={this.state.tableItems} />
            </Layout>
        )
    }
}

export default Dreans;