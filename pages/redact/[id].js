import { withRouter } from 'next/router'
import { Component } from 'react'
import Layout from '../../Layout';
import RedactForm from '../../components/RedactForm';

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
            fetch(`/api/redact/${query.id}`)
                .then(res => res.json())
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
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changedData)
        }).then(
            res => res.json()
        )
    }
}

export default withRouter(Redact)