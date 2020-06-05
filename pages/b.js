import React, { Component } from 'react';
import Layout from '../Layout';
import RedactForm from '../components/RedactForm';

class B extends Component{

    render(){
        return(
            <Layout>
            <div>
                <RedactForm onSubmit={this.handle}></RedactForm>
            </div>
        </Layout>
        )
    }
}

// const arr = {
//     id : 2,
//     name : 'www'
// }
// let obj = {...arr};
// console.log('obj',obj)

export default B;