import { withRouter } from 'next/router';
import React, { Component } from 'react';
import Layout from '../../Layout';
import RedactForm from '../../components/RedactDreanForm';
import { WithRouterProps } from 'next/dist/client/with-router';
import { connect } from 'react-redux';
import { ENTITIES } from 'COMMON';
import Entity from 'redux/entities/Entity';
// import { redactDrean, saveDreanChanges } from 'redux/entities/DreanEntity';
const redactDrean = Entity.getSagaAction('DreansEntity', 'redactDrean');
const saveDreanChanges = Entity.getSagaAction('DreansEntity', 'saveDreanChanges');



interface IRedactProps extends WithRouterProps {
  drean: any;
  dreanSaveChanges: (values: any) => void;
}
interface IRedactState {

}

class RedactDrean extends Component<IRedactProps, IRedactState> {

  public static async getInitialProps(ctx: any) {
    let id: any = 'add';
    await ctx.store.execSagaTasks(ctx, (dispatch: any) => {
        id = ctx?.req?.params?.id ? ctx.req.params.id : ctx.query.id;
        ctx.store.dispatch(redactDrean(id));
    })
    return {id}
  }

  render() {
    const element = this.props.drean;
    return (
      <Layout>
        <div className='w-full p-4'>
          <RedactForm data={this.props.drean} className='w-full ' onSubmit={ values => this.props.dreanSaveChanges(values)} />
        </div>
      </Layout>
    )
  }
}


const mapStateToProps = (state, props) => {
  const id = props.id;
  let drean: any = new Map();
  if(id !== 'add' || id !== null){
    try {
      drean = state.entities.get(ENTITIES.DREANS).filter((item: Map<string, any> ) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(RedactDrean)

// export default withRouter(Redact)
