import { withRouter } from 'next/router';
import React, { Component } from 'react';
import Layout from '../../Layout';
import RedactForm from '../../components/RedactDreanForm';
import { WithRouterProps } from 'next/dist/client/with-router';
import { connect } from 'react-redux';
import { redactDrean, saveDreanChanges } from 'redux/entities/MyDreanEntity';
import { ENTITIES } from 'COMMON';

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
