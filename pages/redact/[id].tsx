import { withRouter } from 'next/router'
import React, { Component } from 'react'
import Layout from '../../Layout'
import RedactForm from '../../components/RedactForm'
import { WithRouterProps } from 'next/dist/client/with-router'
import { connect } from 'react-redux'
import { redactDrean } from 'redux/entities/MyDreanEntity'
import { saveDreanChanges } from '../../redux/entities/MyDreanEntity';

interface IRedactProps extends WithRouterProps {
  drean: any;
  dreanSaveChanges: (values: any) => void;
}
interface IRedactState {

}

class Redact extends Component<IRedactProps, IRedactState> {

  public static async getInitialProps(ctx: any) {
    let id: any = 'add';
    await ctx.store.execSagaTasks(ctx, (dispatch: any) => {
        id = ctx?.req?.params?.id ? ctx.req.params.id : ctx.query.id;
        console.log('id for redact => ', id);
        ctx.store.dispatch(redactDrean(id));
    })
    return {id}
  }

  render() {
    console.log('redact form props => ', this.props);
    const element = this.props.drean;
    console.log('id element: ', element);
    return (
      <Layout>
        <RedactForm data={this.props.drean} className='w-3/4' onSubmit={ values => this.props.dreanSaveChanges(values)} />
      </Layout>
    )
  }
}


const mapStateToProps = (state, props) => {
  const id = props.id;
  let drean: any = new Map();
  if(id !== 'add' || id !== null){
    try {
      drean = state.entities.get("myDreans").filter((item: Map<string, any> ) => {
        return item.get('id') === id
      })
    } catch (error) {
      
    }
  }
  return ({
    drean: drean.get(id)
  })
} 

const mapDispatchToProps = (dispatch) => ({
  dreanSaveChanges: (values: any) => dispatch(saveDreanChanges(values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Redact)

// export default withRouter(Redact)
