import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { handleUnPinResource } from './../actions/togglePin'

class PinnedResourceList extends Component {
  handleUnPinResource = (e) => {
    this.props.handleUnPinResource({
      id: this.props.id,
      resourceId: e.target.id,
    })
  }

  handleColor = type => {
    if (type === 'Database') {
      return 'ui database label'
    } else if (type === 'Superset Dashboard') {
      return 'ui superset label'
    } return 'ui knowledge label'
  }

  render() {
    return (
      <div className='ui three cards link'>
        {this.props.pinnedResources.map(item => (
          <div key={item.id} className='ui fluid card'>
            { item.type !== 'Database' &&
              <iframe
                src={item.url}
                frame-ancestors='none'
                width='100%'
                height='170px'
                frameBorder='0'
                title={item.name}
              />
            }
            <div className='content'>
              <div className='meta'>
                <span className={this.handleColor(item.type)}>{item.type}</span>
                {this.props.actionsDisplay &&
                <Icon.Group onClick={this.handleUnPinResource}>
                  <i className='pin blue icon' id={item.id} />
                </Icon.Group>
              }
              </div>
              <div className='header'>
                <a href={`/resources/${item.id}/`}><h3>{item.name}</h3></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  thisPinByTeam: state.thisPinByTeam,
})

const mapDispatchToProps = dispatch => ({
  handleUnPinResource: item => dispatch(handleUnPinResource(item)),
})

PinnedResourceList.propTypes = {
  handleUnPinResource: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  actionsDisplay: PropTypes.bool.isRequired,
  pinnedResources: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(PinnedResourceList)

