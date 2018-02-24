import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import moment from 'moment'
import DisplaySourceDetailComponent from './../components/DisplaySourceDetail'
import DisplayDatabaseSource from './../components/DisplayDatabaseSource'

class DisplaySourceDetail extends Component {
  state = {
    id: 0,
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
        this.setState({ id: +this.props.match.params.id })
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
    return (
      <div>
        {
          this.state.type === 'Database' &&
          <DisplayDatabaseSource
            id={this.state.id}
            name={this.state.name}
            columns={this.state.columns}
            description={this.state.description}
            createdDate={this.state.createdDate}
            type={this.state.type}
            tags={this.state.tags}
          />
        }
        { this.state.type === 'Superset Dashboard' &&
          <DisplaySourceDetailComponent
            id={this.state.id}
            name={this.state.name}
            createdDate={this.state.createdDate}
            type={this.state.type}
            url={this.state.url}
            tags={this.state.tags}
          />
        }
        { this.state.type === 'Knowledge Post' &&
          <DisplaySourceDetailComponent
            id={this.state.id}
            name={this.state.name}
            createdDate={this.state.createdDate}
            type={this.state.type}
            url={this.state.url}
            tags={this.state.tags}
          />
        }
      </div>
    )
  }
}

DisplaySourceDetail.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default DisplaySourceDetail
