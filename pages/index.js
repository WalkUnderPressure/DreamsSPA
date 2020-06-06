import React, { Component } from 'react';
import Layout from '../Layout'
import {xRead} from '../src'

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            users : []
        }
    }

    componentDidMount() {
        const api_query = '/api/items';
        xRead(api_query,{})
            .then(items => {
                this.setState({users : items.users});
            })
    }

    render() {
        const { users } = this.state;
        return (
            <Layout>
                <div>
                    <form method="post">
                        <input type="text" />
                        <button type="submit">Get</button>
                    </form>
                    <h1>Recepies</h1>
                    <ul>
                        {
                            users && users.map((item,i) => <li key={"item_" + i}>{item.name}</li>)
                        }
                    </ul>
                </div>
            </Layout>
        )
    }
}

export default Home;