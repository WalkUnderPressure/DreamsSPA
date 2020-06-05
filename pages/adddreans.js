import React, { Component } from 'react';
import Layout from '../Layout';
import RedactForm from '../components/RedactForm';

class AddDreans extends Component{

    render(){
        return(
        <Layout>
            <div>
                <h1>Add new Dreans</h1>
                <RedactForm onSubmit={this.handleOnSubmit} />
            </div>
        </Layout>
        )
    }

    handleOnSubmit = (changedData) => {
        const url = "/api/redact";
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(changedData)
        }).then(
            res => res.json()
        )
    }
}

export default AddDreans;