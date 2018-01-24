import dotenv from 'dotenv'
import React, { Component } from 'react'
import axios from 'axios'
import ListAllSourceComponent from './../components/ListAllSource'

dotenv.config({ path: './../../.env' })

class ListAllSource extends Component {
  state = {
    resource: [],
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_API_URL}/api/source/`
    axios
      .get(url)
      .then((res) => {
        this.setState({ resource: res.data })
      })
      .catch(() => {
      })
  }

  render() {
    return (
      <div>
        <ListAllSourceComponent resource={this.state.resource} />
      </div>
    )
  }
}

export default ListAllSource
