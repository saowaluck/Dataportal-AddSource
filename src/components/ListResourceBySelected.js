import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Accordion, Icon } from 'semantic-ui-react'
import PinnedResourceList from './PinnedResourceList'
import { fetchResourcesSelectedByTeam, handlePinnedResource, handleUnPinResource } from './../actions/togglePin'

class ListResourceBySelected extends Component {
  state = {
    activeIndex: 0,
  }

  componentWillMount() {
    this.props.fetchResourcesSelectedByTeam({
      id: this.props.id,
    })
  }

  fetchresourceBySelected = () => {
    this.props.fetchResourcesSelectedByTeam({
      id: this.props.id,
    })
  }

  handlePinnedResource = e => {
    this.props.handlePinnedResource({
      id: this.props.id,
      resourceId: e.target.id,
    })
  }

  handleUnPinResource = e => {
    this.props.handleUnPinResource({
      id: this.props.id,
      resourceId: e.target.id,
    })
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }

  handleCheckAuth = (isPinned, id) => {
    if (isPinned) {
      return (
        <span className='ui corner label'>
          <Icon.Group onClick={this.handleUnPinResource}>
            <i className='pin blue icon' id={id} />
          </Icon.Group>
        </span>)
    } return (
      <span className='ui corner label'>
        <Icon.Group onClick={this.handlePinnedResource} >
          <i className='pin icon' id={id} />
        </Icon.Group>
      </span>
    )
  }

  handleIcon = type => {
    if (type === 'Database') {
      return 'database icon'
    } else if (type === 'Superset Dashboard') {
      return 'chart bar outline icon'
    } return 'wpforms icon'
  }

  render() {
    console.log(this.props.thisResourceByTeam)
    const { activeIndex } = this.state
    return (
      <div className='ui row vertical segment'>
        <PinnedResourceList
          id={this.props.id}
          actionsDisplay={this.props.actionsDisplay}
          pinnedResources={this.props.thisResourceByTeam.pinnedResources}
        />
        <div className='ui row vertical segment'>
          <div className='ui basic accordion'>
            <Accordion>
              <div className='ui divider item' />
              <div className='title'>
                <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                  <h3 className='ui header'>All Resources
                    <Icon.Group position='right'>
                      <Icon name='angle down' />
                    </Icon.Group>
                  </h3>
                </Accordion.Title>
                {this.props.thisResourceByTeam.resourceBySelected !== '' &&
                  <Accordion.Content active={activeIndex === 0}>
                    <div className='ui three cards link'>
                      {this.props.thisResourceByTeam.resourceBySelected.map(item => (
                        <div key={item.selectedResource[0].id} className='ui fluid card'>
                          {this.props.actionsDisplay &&
                            this.handleCheckAuth(item.isPinned, item.selectedResource[0].id)}
                          { item.selectedResource[0].type !== 'Database' &&
                            <iframe
                              src={item.selectedResource[0].url}
                              frame-ancestors='none'
                              width='100%'
                              height='170px'
                              frameBorder='0'
                              title={item.selectedResource[0].name}
                            />
                          }
                          <div className='content'>
                            <div className='header'>
                              <a href={`/resources/${item.selectedResource[0].id}/`}><h3>{item.selectedResource[0].name}</h3></a>
                            </div>
                            <span className='meta'><i className={this.handleIcon(item.selectedResource[0].type)} />
                              {item.selectedResource[0].type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Accordion.Content>
                }
                <div className='ui divider item' />
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  thisResourceByTeam: state.thisResourceByTeam,
  thisPinByTeam: state.thisPinByTeam,
})

const mapDispatchToProps = dispatch => ({
  fetchResourcesSelectedByTeam: item => dispatch(fetchResourcesSelectedByTeam(item)),
  handlePinnedResource: item => dispatch(handlePinnedResource(item)),
  handleUnPinResource: item => dispatch(handleUnPinResource(item)),
})


ListResourceBySelected.propTypes = {
  fetchResourcesSelectedByTeam: PropTypes.func.isRequired,
  handlePinnedResource: PropTypes.func.isRequired,
  handleUnPinResource: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  actionsDisplay: PropTypes.bool.isRequired,
  thisResourceByTeam: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListResourceBySelected)
