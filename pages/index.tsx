import React, { Component } from 'react'
import Layout from '../Layout'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <Layout>
        <div>
          <h1>Welcome to Dreams And plans Manager</h1>
        </div>
      </Layout>
    )
  }
}

export default Home
