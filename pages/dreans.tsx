import React, { Component } from 'react'
import Layout from '../Layout'
import Table from '../components/Table'
import Link from 'next/link'
import { connect } from 'react-redux';
import { getAllUserDreans } from '../redux/actions/UsersDreansActions';
import { List } from 'immutable';

interface IDreansProps {
  tableItems: List<Map<string, any>>;
}
interface IDreansState {
  tableItems: List<Map<string, any>>;
}

class Dreans extends Component<IDreansProps, IDreansState> {
  constructor(props: any) {
    super(props)
    this.state = {
      tableItems: List()
    }
  }

  static getInitialProps(ctx) {
    // console.log('getInitialProps!', ctx);
    
    ctx.store.execSagaTasks(ctx, dispatch => {
      dispatch(getAllUserDreans());
    });
  }

  render() {
    console.log('dreans items : ', this.props.tableItems);
    const element = this.props;
    return (
      <Layout>
        <div className={'h-full p-5 bg-white rounded-lg'}>
          <Table data={element.tableItems} />
          <Link href='/redact/[id]' as='/redact/add'>
            <button className={'my-2 bg-transparent hover:bg-blue-400 ' +
            '   text-red-600 font-semibold hover:text-white py-2 px-4 ' +
            '   border border-red-800 hover:border-transparent rounded'}>
              Add
            </button>
          </Link>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    tableItems: state.entity.get('dreans'),
  })
}

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Dreans)
