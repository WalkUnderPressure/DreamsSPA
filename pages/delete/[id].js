import { withRouter } from 'next/router'
import { Component } from 'react'
import Layout from '../../Layout';

class Delete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {}
        }
    }

    // componentDidMount() {
    //     const { router: { query }} = this.props;
    //     if (query) {
    //         fetch(`/api/redact/${query.id}`)
    //             .then(res => {
    //                 res.json()
    //             })
    //             .then(res => {
    //                 this.setState({ item : res })
    //             })
    //     }
    // }
    render() {
        return (
            <Layout>
                <div>
                    Delete
                </div>
            </Layout>
        )
    }
}

export default withRouter(Delete)