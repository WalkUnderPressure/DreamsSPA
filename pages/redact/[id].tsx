import { withRouter } from 'next/router'
import React, { Component } from 'react'
import Layout from '../../Layout'
import RedactForm from '../../components/RedactForm'
import { xRead, xSave } from '../../src'
import { WithRouterProps } from 'next/dist/client/with-router'
import DreanItem from '../../Templates/DreanItem';
import ServerResponse from '../../Templates/ServerResponse'
import { redactDreanRequest } from '../../redux/actions/redactAddFormActions';
import { connect } from 'react-redux'

interface IRedactProps extends WithRouterProps {
  redactDrean: DreanItem;
}
interface IRedactState {
  item: DreanItem;
}

class Redact extends Component<IRedactProps, IRedactState> {
  constructor(props: IRedactProps) {
    super(props)
    this.state = {
      item: {} as DreanItem
    }
  }

  static getInitialProps(ctx) {
    const id = ctx.query.id;
    console.log('id => ', id);
    if (id !== 'add') {
      ctx.store.dispatch(redactDreanRequest(id));
    }
  }

  render() {
    const element = this.props.redactDrean;
    console.log('id element : ', element);
    return (
      <Layout>
        <div>
          {element && element._id ? 'Redact' : 'Add New'}
          <RedactForm data={element} handlerOnSubmit={this.handleOnSubmit} />
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
          if (!answer.error) {
            this.setState({ item: answer.data });
          }
          alert(answer.message)
        }
      )
  }
}


const mapStateToProps = (state) => ({
  redactDrean: state.editingItem
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Redact)

// export default withRouter(Redact)
