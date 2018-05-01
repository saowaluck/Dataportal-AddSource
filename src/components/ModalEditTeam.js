import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Button, Modal, Form, Dropdown, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class ModalEditTeam extends Component {
  state = {
    open: false,
    name: '',
    description: '',
    isSubmit: false,
    options: [],
    currentValues: [],
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/teams/${this.props.id}/?memberEmail=${this.props.email}`)
      .then(res => {
        const { team, members } = res.data
        this.setState({
          name: team.name,
          description: team.description,
        })
        members.map(member => this.setState({
          currentValues: [member.name],
        }))
      })
    axios.get(`${process.env.REACT_APP_API_URL}/members/all`)
      .then(res => {
        res.data.map(member => (
          this.setState({
            options: [
              {
                text: member.name,
                value: member.name,
                image: { avatar: true, src: member.avatar },
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
    axios.post(`${process.env.REACT_APP_API_URL}/teams/${this.props.id}/edit`, {
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

  allTagOption = e => { this.dropdown = e }

  render() {
    const { open, dimmer } = this.state
    return (
      <div>
        <Button onClick={this.show('blurring')} className='ui circular primary icon button'>
          <Icon name='edit' />
        </Button>
        <Modal dimmer={dimmer} open={open} onClose={this.close} size='small'>
          <Modal.Header>Edit Team</Modal.Header>
          <Modal.Content>
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
              <Form.Field required>
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
              <Form.Field>
                <label htmlFor='members'>Members
                  <Dropdown
                    ref={this.allTagOption}
                    options={this.state.options}
                    placeholder='Choose Member'
                    search
                    inline
                    selection
                    fluid
                    multiple
                    name='members'
                    allowAdditions
                    value={this.state.currentValues}
                    onAddItem={this.handleAddition}
                    onChange={this.handleOptionChange}
                  />
                </label>
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

ModalEditTeam.propTypes = {
  id: PropTypes.number.isRequired,
  email: PropTypes.number.isRequired,
}

export default ModalEditTeam
