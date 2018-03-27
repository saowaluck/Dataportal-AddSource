import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class DisplayListOfUserFavoriteResource extends Component {
  state = {
    activeIndex: null,
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
          <Icon className='large heart icon' />
          favorited by {this.props.members.length} protons
          <Icon className='angle down icon' />
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 0}>
          <div className='ui horizontal list'>
            { this.props.members.map(member => (
              <div className='item' key={member.id}>
                <a href={`/members/${member.id}/`}><img className='ui mini circular image' src={member.avatar} alt='' /></a>
              </div>
            ))}
          </div>
        </Accordion.Content>
      </Accordion>
    )
  }
}

DisplayListOfUserFavoriteResource.propTypes = {
  members: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default DisplayListOfUserFavoriteResource
