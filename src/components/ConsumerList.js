import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Accordion, Icon } from 'semantic-ui-react'

class ConsumerList extends Component {
  state = {
    activeIndex: null,
    consumed: [],
  }

  componentDidMount() {
    const { id } = this.props
    const path = `${process.env.REACT_APP_API_URL}/resources/${id}/consumers/`
    axios
      .get(path)
      .then(res => {
        this.setState({
          consumed: res.data.consumed,
        })
      })
      .catch(() => {
      })
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }

  render() {
    return (
      <Accordion>
        <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.handleClick}>
          <Icon className='user icon people' />
            recently comsumed by {this.state.consumed.length} protons
          <Icon className='angle down icon' />
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 0}>
          <div className='ui horizontal list'>
            { this.state.consumed.map(member => (
              <div className='item' key={member.id}>
                <a href={`/members/${member.id}/`}>
                  <img className='ui mini circular image' src={member.avatar} alt='' />
                </a>
              </div>
            ))}
          </div>
        </Accordion.Content>
      </Accordion>
    )
  }
}

ConsumerList.propTypes = {
  id: PropTypes.number.isRequired,
}

export default ConsumerList
