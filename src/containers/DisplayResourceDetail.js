import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import moment from 'moment'
import { Loader } from 'semantic-ui-react'
import DisplayResourceDetailComponent from './../components/DisplayResourceDetail'
import DisplayDatabaseDetail from './../components/DisplayDatabaseDetail'


class DisplayResourceDetail extends Component {
  state = {
    id: 0,
    name: '',
    description: '',
    type: '',
    createdDate: '',
    url: '',
    columns: ['', '', ''],
    tags: [],
    creator: [],
    relatedResources: [],
  }

  componentDidMount() {
    const id = +this.props.match.params.id
    const path = `${process.env.REACT_APP_API_URL}/resources/${id}/`
    axios
      .get(path)
      .then((result) => {
        this.setState({ id: +this.props.match.params.id })
        let { createdDate } = result.data.resource
        createdDate = moment(createdDate).format('MMM DD, YYYY')
        const { name, type, creator } = result.data.resource
        const { tags } = result.data
        this.setState({ relatedResources: result.data.relatedResources })
        if (type === 'Database') {
          const { columns, description } = result.data.resource
          this.setState({
            name, columns, description, createdDate, type, tags, creator,
          })
        } else {
          const { url } = result.data.resource
          this.setState({
            name, createdDate, type, url, tags, creator,
          })
        }
      })
      .catch(() => {
      })
  }

  render() {
    if (this.state.type === 'Database') {
      const data = {
        id: this.state.id,
        name: this.state.name,
        columns: this.state.columns,
        description: this.state.description,
        createdDate: this.state.createdDate,
        type: this.state.type,
        tags: this.state.tags,
        creator: this.state.creator,
        relatedResources: this.state.relatedResources,
        auth: this.props.auth,
      }
      return <DisplayDatabaseDetail data={data} />
    }
    if (this.state.type === 'Superset Dashboard' || this.state.type === 'Knowledge Post') {
      const data = {
        id: this.state.id,
        name: this.state.name,
        createdDate: this.state.createdDate,
        type: this.state.type,
        url: this.state.url,
        tags: this.state.tags,
        creator: this.state.creator,
        relatedResources: this.state.relatedResources,
        auth: this.props.auth,
      }
      return <DisplayResourceDetailComponent data={data} />
    }
    return <Loader active inline='centered' />
  }
}

DisplayResourceDetail.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  auth: PropTypes.objectOf(PropTypes.func).isRequired,
}

export default DisplayResourceDetail
