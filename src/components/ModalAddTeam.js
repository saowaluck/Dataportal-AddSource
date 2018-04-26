import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Button, Modal, Form } from 'semantic-ui-react'

class ModalAddTeam extends Component {
  state = {
    open: false,
    name: '',
    description: '',
    isSubmit: false,
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/teams/`, {
      name: this.state.name,
      description: this.state.description,
    }).then(() => {
      document.location.reload()
      this.close()
    })
  }

  show = dimmer => () => this.setState({ dimmer, open: true })

  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state
    return (
      <div>
        <Button onClick={this.show('blurring')} className='button bright floated'>Create Team</Button>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Create Team</Modal.Header>
          <Modal.Content image>
            <div>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <label htmlFor='name'>Name
                    <input
                      placeholder='team name'
                      name='name'
                      value={this.state.name}
                      required
                      onChange={this.handleChange}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label htmlFor='description'>Description
                    <textarea
                      name='description'
                      rows='3'
                      placeholder='description of team'
                      value={this.state.description}
                      required
                      onChange={this.handleChange}
                    />
                  </label>
                </Form.Field>
              </Form>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
                Close
            </Button>
            <Button className='ui primary button' type='submit' onClick={this.handleSubmit}>
                Save Team
            </Button>
            {this.state.isSubmit && (<Redirect to='teams/management' />)}
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ModalAddTeam
