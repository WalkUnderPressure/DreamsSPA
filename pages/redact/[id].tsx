import { withRouter } from 'next/router'
import { Component } from 'react'
import React from 'react'
import Layout from '../../Layout'
import RedactForm from '../../components/RedactForm'
import { xRead, xSave } from '../../src'
import { WithRouterProps } from 'next/dist/client/with-router'
import DreanItem from '../../Templates/DreanItem';
import ServerResponse from '../../Templates/ServerResponse'

interface IRedactProps extends WithRouterProps {

}
interface IRedactState {
    item: DreanItem;
}

class Redact extends Component<IRedactProps, IRedactState> {
  constructor (props: IRedactProps) {
    super(props)
    this.state = {
      item: {}
    }
  }

  componentDidMount () {
    const { router: { query } } = this.props
    if (query.id !== 'add') {
      const url = `/api/redact/${query.id}`
      xRead(url, {})
        .then(res => {
          const answer: ServerResponse = res;
          console.log(answer.message);
          this.setState({ item: answer.data });
        })
    }
  }

  render () {
    const element = this.state.item;
    console.log('id[] :', element);
    return (
      <Layout>
        <div>
          {element && element._id ? 'Redact' : 'Add New'}
          <RedactForm data={element} onSubmit={this.handleOnSubmit} />
        </div>
      </Layout>
    )
  }

    handleOnSubmit = (changedData) => {
      const url = '/api/redact'
      xSave(url, changedData as DreanItem)
        .then(
          res => {
            const notification = `Item : ${res.data.codeName} ${res.message}`
            alert(notification)
          }
        )
    }
}

export default withRouter(Redact)
