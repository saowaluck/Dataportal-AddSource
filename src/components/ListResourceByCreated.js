import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Accordion, Icon } from 'semantic-ui-react'
import PinnedResourceList from './PinnedResourceList'
import { fetchResourcesCreatedByTeam, handlePinnedResource, handleUnPinResource } from './../actions/togglePin'

class ListResourceByCreated extends Component {
  state = {
    activeIndex: 0,
  }

  componentWillMount() {
    this.props.fetchResourcesCreatedByTeam({
      id: this.props.id,
    })
  }

  fetchResourceByCreated = () => {
    this.props.fetchResourcesCreatedByTeam({
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
        <Icon.Group onClick={this.handleUnPinResource}>
          <i className='pin blue icon' id={id} />
        </Icon.Group>)
    } return (
      <Icon.Group onClick={this.handlePinnedResource} >
        <i className='pin icon' id={id} />
      </Icon.Group>
    )
  }

  handleColor = type => {
    if (type === 'Database') {
      return 'ui database label'
    } else if (type === 'Superset Dashboard') {
      return 'ui superset label'
    } return 'ui knowledge label'
  }

  render() {
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
                <Accordion.Content active={activeIndex === 0}>
                  <div className='ui three cards link'>
                    {this.props.thisResourceByTeam.resourceByCreated.map(item => (
                      <div key={item.createdResource.id} className='ui fluid card'>
                        { item.createdResource.type !== 'Database' &&
                          <iframe
                            src={item.createdResource.url}
                            frame-ancestors='none'
                            width='100%'
                            height='170px'
                            frameBorder='0'
                            title={item.name}
                          />
                        }
                        <div className='content'>
                          <div className='meta'>
                            <span className={this.handleColor(item.createdResource.type)}>
                              {item.createdResource.type}
                            </span>
                            {this.props.actionsDisplay &&
                              this.handleCheckAuth(item.isPinned, item.createdResource.id)}
                          </div>
                          <div className='header'>
                            <a href={`/resources/${item.createdResource.id}/`}><h3>{item.createdResource.name}</h3></a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Accordion.Content>
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
  fetchResourcesCreatedByTeam: item => dispatch(fetchResourcesCreatedByTeam(item)),
  handlePinnedResource: item => dispatch(handlePinnedResource(item)),
  handleUnPinResource: item => dispatch(handleUnPinResource(item)),
})


ListResourceByCreated.propTypes = {
  fetchResourcesCreatedByTeam: PropTypes.func.isRequired,
  handlePinnedResource: PropTypes.func.isRequired,
  handleUnPinResource: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  actionsDisplay: PropTypes.bool.isRequired,
  thisResourceByTeam: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListResourceByCreated)
