import React, { Component } from 'react';
import Layout from '../Layout';
import RedactForm from '../components/RedactForm';
import {xSave} from "../src";

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
        xSave(url,changedData);
    }
}

export default AddDreans;