import { withRouter } from 'next/router'
import { Component } from 'react'
import Layout from '../../Layout';
import RedactForm from '../../components/RedactForm';
import { xRead, xSave } from '../../src';
import { WithRouterProps } from 'next/dist/client/with-router';
import Item from '../../Templates/Item';

interface IRedactProps extends WithRouterProps {

}
interface IRedactState {
    item: Item;
}

class Redact extends Component<IRedactProps, IRedactState> {
    constructor(props: IRedactProps) {
        super(props);
        this.state = {
            item: {
                id: 'add',
                codeName: '',
                description: '',
                dateOfEvent: null,
                guests: [],
                needThings: []
            }
        }
    }

    componentDidMount() {
        const { router: { query } } = this.props;
        if (query.id !== 'add') {
            const url = `/api/redact/${query.id}`;
            xRead(url, {})
                .then(res => {
                    this.setState({ item: res })
                })
        }
    }

    render() {
        const element = this.state.item;

        return (
            <Layout>
                <div>
                    {element != null && element.id!='add' ? 'Redact' : 'Add New'}
                    <RedactForm data={element} onSubmit={this.handleOnSubmit} />
                </div>
            </Layout>
        )
    }

    handleOnSubmit = (changedData) => {
        const url = "/api/redact";
        xSave(url, changedData)
            .then(
                res => {
                    const notification = `Item : ${res.data.codeName} ${res.message}`
                    alert(notification);
                }
            )
    }
}

export default withRouter(Redact)