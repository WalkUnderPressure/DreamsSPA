import { withRouter } from 'next/router'
import { Component } from 'react'
import Layout from '../../Layout';
import RedactForm from '../../components/RedactForm';

import {xRead,xSave} from '../../src';

class Redact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {}
        }
    }

    componentDidMount(){
        const { router: { query } } = this.props;
        if (query.id) {
            const url = `/api/redact/${query.id}`;
            xRead(url,{})
                .then(res => {
                    this.setState({ item: res })
                })
        }
    }

    render() {
        const element = this.state.item;

        console.log('redact id element : ',element);

        return (
            <Layout>
                <div>
                    Redact
                    <RedactForm data={element} onSubmit={this.handleOnSubmit} />
                </div>
            </Layout>
        )
    }

    handleOnSubmit = (changedData) => {
        const url = "/api/redact";
        xSave(url,changedData)
            .then(
                res => console.log(res)
            )
    }
}

export default withRouter(Redact)