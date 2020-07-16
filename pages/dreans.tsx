import React, { Component } from 'react'
import Layout from '../Layout'
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import { getAllDreans } from 'redux/entities/MyDreanEntity';
import { ENTITIES } from '../COMMON';
import DreanBox from 'components/DreanBox';

interface IDreansProps {
  dreans: List<Map<string, any>>;
  users: List<Map<string, any>>;
}
interface IDreansState {
  dreans: List<Map<string, any>>;
  users: List<Map<string, any>>;
}

class Dreans extends Component<IDreansProps, IDreansState> {
  constructor(props: any) {
    super(props)
    this.state = {
      dreans: List(),
      users: List(),
    }
  }

  static async getInitialProps(ctx) {
    console.log('getInitialProps all dreans call!', ctx);
    ctx.store.execSagaTasks(ctx, (dispatch: any) => {
      ctx.store.dispatch(getAllDreans());
    })
  }

  render() {
    const { dreans, users } = this.props;
    
    let allDreansBoxes = null;
    if(dreans && users){
      allDreansBoxes = dreans.valueSeq().map(drean => {
        return <DreanBox key={drean.get('id')} drean={drean} owner={users.get(drean.get('owner'))} />
      })
    }

    return (
      <Layout>
        <div className='w-full'>
          {allDreansBoxes}
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    dreans: state.entities.get(ENTITIES.DREANS),
    users: state.entities.get(ENTITIES.USERS),
  })
}

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Dreans)
