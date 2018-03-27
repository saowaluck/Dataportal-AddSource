import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import EditDatabaseResource from './../components/EditDatabaseResource'
import EditResourceComponents from './../components/EditResource'

class EditResource extends Component {
  state = {
    id: 0,
    name: '',
    description: '',
    type: '',
    url: '',
    columns: ['', '', ''],
    tags: [''],
    createdDate: '',
    updatedDate: '',
  }

  componentDidMount() {
    const id = +this.props.match.params.id
    const path = `${process.env.REACT_APP_API_URL}/resources/${id}/`
    axios
      .get(path)
      .then((result) => {
        this.setState({ id: +this.props.match.params.id })
        const {
          name, type, createdDate, updatedDate,
        } = result.data.resource
        const { tags } = result.data
        if (type === 'Database') {
          const { columns, description } = result.data.resource
          this.setState({
            name, columns, description, type, tags, createdDate, updatedDate,
          })
        } else {
          const { url } = result.data.resource
          this.setState({
            name, type, url, tags, createdDate, updatedDate,
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
          <EditDatabaseResource
            id={this.state.id}
            name={this.state.name}
            description={this.state.description}
            type={this.state.type}
            tags={this.state.tags}
            columns={this.state.columns}
            createdDate={this.state.createdDate}
            updatedDate={this.state.updatedDate}
          />
        }
        { this.state.type === 'Superset Dashboard' &&
          <EditResourceComponents
            id={this.state.id}
            name={this.state.name}
            type={this.state.type}
            url={this.state.url}
            tags={this.state.tags}
            createdDate={this.state.createdDate}
            updatedDate={this.state.updatedDate}
          />
        }
        { this.state.type === 'Knowledge Post' &&
          <EditResourceComponents
            id={this.state.id}
            name={this.state.name}
            type={this.state.type}
            url={this.state.url}
            tags={this.state.tags}
            createdDate={this.state.createdDate}
            updatedDate={this.state.updatedDate}
          />
        }
      </div>
    )
  }
}

EditResource.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default EditResource
