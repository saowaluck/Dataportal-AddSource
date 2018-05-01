import React, { Component } from 'react'
import axios from 'axios'
import { Button, Icon, Confirm } from 'semantic-ui-react'

class DeleteTeam extends Component {
  state = {
    open: false,
  }

  show = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  handleDelete = e => {
    const { id } = this.props
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/teams/${id}/delete/`)
      .then(() => {
        document.location.reload()
        this.close()
      })
  }

  render() {
    return (
      <div>
        <Button onClick={this.show} className='ui circular negative icon button'>
          <Icon name='trash' />
        </Button>
        <Confirm
          open={this.state.open}
          content='Are you sure to delete this team ?'
          cancelButton='Not right now'
          confirmButton='Yes, delete team'
          onCancel={this.close}
          onConfirm={this.handleDelete}
        />
      </div>
    )
  }
}

export default DeleteTeam
