import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Accordion, Icon } from 'semantic-ui-react'

class DisplayFavorite extends Component {
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
          <Icon className='ui heart icon' />
          favorited by {this.props.thisResource.members.length} {this.props.thisResource.members.length > 1 ? 'protons' : 'proton'}
          {this.props.thisResource.members.length > 0 && <Icon className='angle down icon' />}
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 0}>
          <div className='ui horizontal list'>
            { this.props.thisResource.members.map(member => (
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
const mapStateToProps = (state) => ({
  thisResource: state.thisResource,
})

DisplayFavorite.propTypes = {
  thisResource: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default connect(mapStateToProps)(DisplayFavorite)
