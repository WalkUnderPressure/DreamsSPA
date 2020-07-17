import { withRouter } from 'next/router'
import React, { Component } from 'react'
import Layout from '../../Layout'
import RedactUserForm from '../../components/RedactUserForm';
import { WithRouterProps } from 'next/dist/client/with-router'
import { connect } from 'react-redux'
import { redactUser, saveUserChanges } from '../../redux/entities/UserEntity';
import { ENTITIES } from 'COMMON'

interface IRedactProps extends WithRouterProps {
  user: any;
  saveUserChanges: (values: any) => void;
}
interface IRedactState {

}

class RedactUser extends Component<IRedactProps, IRedactState> {

  public static async getInitialProps(ctx: any) {
    let id: any = 'add';
    await ctx.store.execSagaTasks(ctx, (dispatch: any) => {
        id = ctx?.req?.params?.id ? ctx.req.params.id : ctx.query.id;
        console.log('id for redact => ', id);
        ctx.store.dispatch(redactUser(id));
    })
    return {id}
  }

  render() {
    console.log('redact form props => ', this.props);
    const element = this.props.user;
    console.log('id element: ', element);
    return (
      <Layout>
        <div className='w-full p-4'>
          <RedactUserForm data={element} className='w-full ' onSubmit={ values => this.props.saveUserChanges(values)} />
        </div>
      </Layout>
    )
  }
}


const mapStateToProps = (state, props) => {
  const id = props.id;
  let user: any = new Map();
  if(id !== 'add' || id !== null){
    try {
      user = state.entities.get(ENTITIES.USERS).filter((item: Map<string, any> ) => {
        return item.get('id') === id
      })
    } catch (error) {
      
    }
  }
  return ({
    user: user.get(id)
  })
} 

const mapDispatchToProps = (dispatch) => ({
  saveUserChanges: (values: any) => dispatch(saveUserChanges(values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RedactUser)

// export default withRouter(Redact)
