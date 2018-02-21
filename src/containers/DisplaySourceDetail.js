import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import moment from 'moment'
import DisplaySourceDetailComponent from './../components/DisplaySourceDetail'
import DisplayDatabaseSource from './../components/DisplayDatabaseSource'

class DisplaySourceDetail extends Component {
  state = {
    name: '',
    description: '',
    type: '',
    createdDate: '',
    url: '',
    columns: ['', '', ''],
    tags: [],
  }

  componentDidMount() {
    const id = +this.props.match.params.id
    const path = `${process.env.REACT_APP_API_URL}/source/${id}/`
    axios
      .get(path)
      .then((result) => {
        let { createdDate } = result.data.source
        createdDate = moment(createdDate).format('MMMM Do YYYY')
        const { name, type } = result.data.source
        const { tags } = result.data
        if (type === 'Database') {
          const { columns, description } = result.data.source
          this.setState({
            name, columns, description, createdDate, type, tags,
          })
        } else {
          const { url } = result.data.source
          this.setState({
            name, createdDate, type, url, tags,
          })
        }
      })
      .catch(() => {
      })
  }
  render() {
    const {
      name, description, createdDate, type, columns, tags, url,
    } = this.state
    return (
      <div>
        {
          this.state.type === 'Database' &&
          <DisplayDatabaseSource
            name={name}
            columns={columns}
            description={description}
            createdDate={createdDate}
            type={type}
            tags={tags}
          />
        }
        { this.state.type === 'Superset Dashboard' &&
          <DisplaySourceDetailComponent
            name={name}
            createdDate={createdDate}
            type={type}
            url={url}
            tags={tags}
          />
        }
        { this.state.type === 'Knowledge Post' &&
          <DisplaySourceDetailComponent
            name={name}
            createdDate={createdDate}
            type={type}
            url={url}
            tags={tags}
          />
        }
      </div>
    )
  }
}

DisplaySourceDetail.propTypes = {
  id: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,
}

export default DisplaySourceDetail
