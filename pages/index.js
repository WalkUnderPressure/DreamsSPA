import React, { Component } from 'react';
import Layout from '../Layout'

const API = 'http://localhost:3000/api';
const DEFAULT_QUERY = '/items';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            users : []
        }
    }

    componentDidMount() {
        fetch('/api/items')
            .then(res => {
                return res.json();
             })
            .then(items => {
                console.log("ITEMS : ",items.users);
                this.setState({users : items.users});
             });
    }



    render() {
        console.log("render users : ",this.state.users)
        // let items= null;
        // if (this.state.users) {
        //     items = this.state.users.map(item => {
        //         return <li key={item.id}>{item}</li>
        //     })
        // }else{
        //     items = <p>Loading . . .</p>;
        // }

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