import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import dotenv from 'dotenv'
import DisplaySourceDetailConmponent from './../components/DisplaySourceDetail'
import DisplayDatabaseSource from './../components/DisplayDatabaseSource'


dotenv.config({ path: './../../.env' })

class DisplaySourceDetail extends Component {
  state = {
    name: '',
    type: '',
    url: '',
    columns: ['', ''],
    tag: '',
  }

  componentDidMount() {
    const id = Number(this.props.id)
    const path = `${process.env.REACT_APP_API_URL}/source/${id}/`
    axios
      .get(path)
      .then((data) => {
        const { type } = data.data
        if (type === 'Database') {
          const { name, columns } = data.data
          this.setState({ name, type, columns })
        } else {
          const {
            name, url, tag,
          } = data.data
          this.setState({
            name, type, url, tag,
          })
        }
      })
      .catch(() => {
      })
  }
  render() {
    const {
      name, type, columns, tag, url,
    } = this.state
    return (
      <div>
        {
          this.state.type === 'Database' &&
          <DisplayDatabaseSource
            name={name}
            type={type}
            columns={columns}
          />
        }
        { this.state.type === 'Superset Dashboard' &&
          <DisplaySourceDetailConmponent
            name={name}
            type={type}
            url={url}
            tag={tag}
          />
        }
      </div>
    )
  }
}

DisplaySourceDetail.propTypes = {
  id: PropTypes.string.isRequired,
}

export default DisplaySourceDetail
