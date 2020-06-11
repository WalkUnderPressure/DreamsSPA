import React, { Component } from 'react'
import Layout from '../Layout'
import Table from '../components/Table'
import Link from 'next/link'
import { xRead, xDelete } from '../src'
import DreanItem from '../Templates/DreanItem'
import ServerResponse from '../Templates/ServerResponse'

interface IDreansProps{

}
interface IDreansState{
    tableItems : Array<DreanItem>;
}

class Dreans extends Component<IDreansProps, IDreansState> {
  constructor (props : any) {
    super(props)
    this.state = {
      tableItems: []
    }
  }

  componentDidMount () {
    const url = '/api/alldreans'
    xRead(url, {})
      .then(res => {
        const answer: ServerResponse = res;
        console.log(answer.message);
        this.setState({ tableItems: answer.data });
      })
  }

    handleItemDelete = (id : string) => {
      const url = '/api/remove'
      xDelete(url, { _id: id })
        .then(res => {
          const answer: ServerResponse = res;
          alert(answer.message);
          if(!answer.error){
            const id = answer.data._id;
            const data = this.state.tableItems.filter(item => item._id !== id);
            this.setState({ tableItems: data });
          }
        })
    }

    render () {
      return (
        <Layout>
          <Table data={this.state.tableItems} handleItemDelete={this.handleItemDelete}/>
          <Link href='/redact/[id]' as='/redact/add'><a>Add</a></Link>
        </Layout>
      )
    }
}

export default Dreans
