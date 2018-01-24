import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import dotenv from 'dotenv'
import DisplaySourceDetailConmponent from './../components/DisplaySourceDetail'

dotenv.config({ path: './../../.env' })

class DisplaySourceDetail extends Component {
  state = {
    url: '',
    name: '',
    tag: '',
    dateofCreate: '',
    creator: '',
  }

  componentDidMount() {
    const id = Number(this.props.id)
    const url = `${process.env.REACT_APP_API_URL}/source/${id}/`
    axios
      .get(url)
      .then((data) => {
        this.setState({ url: data.data[0].url })
        this.setState({ name: data.data[0].name })
        this.setState({ tag: data.data[0].tag })
        this.setState({ dateofCreate: data.data[0].dateofCreate })
        this.setState({ creator: data.data[0].creator })
      })
      .catch(() => {
      })
  }

  render() {
    return (
      <div>
        <DisplaySourceDetailConmponent
          url={this.state.url}
          name={this.state.name}
          tag={this.state.tag}
          dateofCreate={this.state.dateofCreate}
          creator={this.state.creator}
        />
      </div>
    )
  }
}

DisplaySourceDetail.propTypes = {
  id: PropTypes.string.isRequired,
}

export default DisplaySourceDetail
