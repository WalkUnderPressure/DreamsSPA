import React, { Component } from 'react'
import Layout from '../Layout'

class Error extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <Layout>
        <div>
          <h1>Error</h1>
        </div>
      </Layout>
    )
  }
}

export default Error
