import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import dotenv from 'dotenv'
import DisplaySourceDetailConmponent from './../components/DisplaySourceDetail'

dotenv.config({ path: './../../.env' })

class DisplaySourceDetail extends Component {
  state = {
    name: '',
    type: '',
    url: '',
  }

  componentDidMount() {
    const id = Number(this.props.id)
    const url = `${process.env.REACT_APP_API_URL}/source/${id}/`
    axios
      .get(url)
      .then((data) => {
        this.setState({ name: data.data[0].name })
        this.setState({ type: data.data[0].type })
        this.setState({ url: data.data[0].url })
      })
      .catch(() => {
      })
  }

  render() {
    return (
      <div>
        <DisplaySourceDetailConmponent
          name={this.state.name}
          type={this.state.type}
          url={this.state.url}
        />
      </div>
    )
  }
}

DisplaySourceDetail.propTypes = {
  id: PropTypes.string.isRequired,
}

export default DisplaySourceDetail
