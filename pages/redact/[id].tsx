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
  // id: string;
  // drean: Map<string, any>;
  dreanSaveChanges: (values: any) => void;
}
interface IRedactState {

}

const dreanSaveChanges = (values) => {
  console.log('dreanSaveChanges is working!', values);
}

class Redact extends Component<IRedactProps, IRedactState> {

  public static async getInitialProps(ctx: any) {
    let id: any = null;
    await ctx.store.execSagaTasks(ctx, (dispatch: any) => {
        id = ctx?.req?.params?.id ? ctx.req.params.id : ctx.query.id;
        ctx.store.dispatch(redactDreanRequest(id));
    })
    return {id}
  }

  render() {
    const element = this.props;
    console.log('id element: ', element);
    return (
      <Layout>
        <div>
          {element && element.id !== 'add'? 'Redact' : 'Add New'}

          <RedactForm data={this.props.drean} onSubmit={ values => this.handleOnSubmit(values)} />
        </div>
      </Layout>
    )
  }

  handleOnSubmit = (changedData: DreanItem) => {
      console.log('dreanSaveChanges is working!', changedData);

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


const mapStateToProps = (state, props) => {
  const id = props.id;
  let drean = {}
  if(id !== 'add' || id !== null){
    try {
      drean = state.entity.get("dreans").filter(item => item.get("_id") === id).get(0)
    } catch (error) {
      drean = new Map()
    }
  }
  console.log('drean +> ', drean)
  return ({
    drean
  })
} 

const mapDispatchToProps = (dispatch) => ({
  dreanSaveChanges: (values: any) => dispatch(dreanSaveChanges(values))
})

export default connect(mapStateToProps, mapDispatchToProps)(Redact)

// export default withRouter(Redact)
