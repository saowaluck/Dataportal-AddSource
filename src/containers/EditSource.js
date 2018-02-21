import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import dotenv from 'dotenv'
import EditDatabaseSource from './../components/EditDatabaseSource'
import EditSupersetSource from './../components/EditSupersetSource'
import EditKnowledgePostSource from './../components/EditKnowledgePostSource'

dotenv.config({ path: './../../.env' })

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
      .then((data) => {
        const { type } = data.data
        if (type === 'Database') {
          const {
            name, description, columns,
          } = data.data
          this.setState({
            id, name, description, type, columns,
          })
        } else {
          const {
            name, url, tags,
          } = data.data
          this.setState({
            id, name, type, url, tags,
          })
        }
      })
      .catch(() => {
      })
  }
  render() {
    const {
      id, name, description, type, columns, tags, url,
    } = this.state
    return (
      <div>
        {
          this.state.type === 'Database' &&
          <EditDatabaseSource
            id={id}
            name={name}
            description={description}
            type={type}
            columns={columns}
          />
        }
        { this.state.type === 'Superset Dashboard' &&
          <EditSupersetSource
            id={id}
            name={name}
            type={type}
            url={url}
            tags={tags}
          />
        }
        { this.state.type === 'Knowledge Post' &&
          <EditKnowledgePostSource
            id={id}
            name={name}
            type={type}
            url={url}
            tags={tags}
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
