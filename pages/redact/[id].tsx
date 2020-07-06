import { withRouter } from 'next/router'
import React, { Component } from 'react'
import Layout from '../../Layout'
import RedactForm from '../../components/RedactForm'
import { xRead, xSave } from '../../src'
import { WithRouterProps } from 'next/dist/client/with-router'
import DreanItem from '../../Templates/DreanItem';
import ServerResponse from '../../Templates/ServerResponse'
import { redactDreanRequest, saveDreanChanges } from '../../redux/actions/redactAddFormActions';
import { connect } from 'react-redux'

interface IRedactProps extends WithRouterProps {
  dreanSaveChanges: (values: any) => void;
}
interface IRedactState {

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
        <RedactForm data={this.props.drean}  onSubmit={ values => this.props.dreanSaveChanges(values)} />
      </Layout>
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
  dreanSaveChanges: (values: any) => dispatch(saveDreanChanges(values))
})

export default connect(mapStateToProps, mapDispatchToProps)(Redact)

// export default withRouter(Redact)
