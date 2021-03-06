import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Button, Modal, Form, Dropdown, Icon } from 'semantic-ui-react'

class ModalAddTeam extends Component {
  state = {
    open: false,
    name: '',
    description: '',
    isSubmit: false,
    options: [],
    currentValues: [],
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/members/all`)
      .then(res => {
        res.data.map(member => (
          this.setState({
            options: [
              {
                text: member.name,
                value: member.name,
                image: { avatar: true, src: member.avatar },
                key: member.id,
              },
              ...this.state.options,
            ],
          })
        ))
      })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/teams/`, {
      name: this.state.name,
      description: this.state.description,
      members: this.state.currentValues,
    }).then(() => {
      document.location.reload()
      this.close()
    })
  }

  show = dimmer => () => this.setState({ dimmer, open: true })

  close = () => this.setState({ open: false })


  handleAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options],
    })
  }

  handleOptionChange = (e, { value }) => {
    this.setState({ currentValues: value })
  }

  render() {
    const { open, dimmer } = this.state
    return (
      <div>
        <Button onClick={this.show('blurring')} className='button primary bright floated'>
          <Icon name='plus' />
          Create Team
        </Button>
        <Modal dimmer={dimmer} open={open} onClose={this.close} size='small'>
          <Modal.Header>Create Team</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field required>
                <label htmlFor='name'>Name</label>
                <input
                  placeholder='team name'
                  name='name'
                  type='text'
                  value={this.state.name}
                  required
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field required>
                <label htmlFor='description'>Description</label>
                <textarea
                  name='description'
                  rows='3'
                  type='text'
                  placeholder='description of team'
                  value={this.state.description}
                  required
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field required>
                <label htmlFor='members'>Members</label>
                <Dropdown
                  options={this.state.options}
                  placeholder='Choose Member'
                  search
                  inline
                  selection
                  fluid
                  required
                  multiple
                  name='members'
                  allowAdditions
                  value={this.state.currentValues}
                  onAddItem={this.handleAddition}
                  onChange={this.handleOptionChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button className='ui basic button' onClick={this.close}>
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
