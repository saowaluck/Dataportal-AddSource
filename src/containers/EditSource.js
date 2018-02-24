import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import EditDatabaseSource from './../components/EditDatabaseSource'
import EditSupersetSource from './../components/EditSupersetSource'
import EditKnowledgePostSource from './../components/EditKnowledgePostSource'

class EditSource extends Component {
  state = {
    id: 0,
    name: '',
    description: '',
    type: '',
    url: '',
    columns: ['', '', ''],
    tags: [''],
  }

  componentDidMount() {
    const id = +this.props.match.params.id
    const path = `${process.env.REACT_APP_API_URL}/source/${id}/`
    axios
      .get(path)
      .then((result) => {
        this.setState({ id: +this.props.match.params.id })
        const { name, type } = result.data.source
        const { tags } = result.data
        if (type === 'Database') {
          const { columns, description } = result.data.source
          this.setState({
            name, columns, description, type, tags,
          })
        } else {
          const { url } = result.data.source
          this.setState({
            name, type, url, tags,
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
          <EditDatabaseSource
            id={this.state.id}
            name={this.state.name}
            description={this.state.description}
            type={this.state.type}
            tags={this.state.tags}
            columns={this.state.columns}
          />
        }
        { this.state.type === 'Superset Dashboard' &&
          <EditSupersetSource
            id={this.state.id}
            name={this.state.name}
            type={this.state.type}
            url={this.state.url}
            tags={this.state.tags}
          />
        }
        { this.state.type === 'Knowledge Post' &&
          <EditKnowledgePostSource
            id={this.state.id}
            name={this.state.name}
            type={this.state.type}
            url={this.state.url}
            tags={this.state.tags}
          />
        }
      </div>
    )
  }
}

EditSource.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default EditSource
