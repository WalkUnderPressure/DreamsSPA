import { withRouter } from 'next/router'
import React, { Component } from 'react'
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
      item: {} as DreanItem
    }
  }

  componentDidMount () {
    const { router: { query } } = this.props
    if (query.id !== 'add') {
      const url = `/api/dreans/redact/${query.id}`
      xRead(url, {})
        .then(res => {
          const answer: ServerResponse = res;
          this.setState({ item: answer.data });
        })
    }
  }

  render () {
    const element = this.state.item;
    // console.log('id element : ',element);
    return (
      <Layout>
        <div>
          {element && element._id ? 'Redact' : 'Add New'}
          <RedactForm data={element} handlerOnSubmit={this.handleOnSubmit} handlerDeleteSubListItem={this.handleOnDelete}/>
        </div>
      </Layout>
    )
  }

  handleOnSubmit = (changedData: DreanItem) => {
      const url = '/api/dreans/redact'
      
      xSave(url, changedData)
          .then(
              res => {
          const answer: ServerResponse = res;
          if(!answer.error){
            this.setState({ item: answer.data });
          }
          alert(answer.message)
        }
      )
  }
}

export default withRouter(Redact)
