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

  handleIcon = type => {
    if (type === 'Database') {
      return 'database icon'
    } else if (type === 'Superset Dashboard') {
      return 'chart bar outline icon'
    } return 'wpforms icon'
  }

  render() {
    return (
      <div className='ui three cards link'>
        {this.props.pinnedResources.map(item => (
          <div key={item.id} className='ui fluid card'>
            {this.props.actionsDisplay &&
            <span className='ui corner label'>
              <Icon.Group onClick={this.handleUnPinResource}>
                <i className='pin blue icon' id={item.id} />
              </Icon.Group>
            </span>
            }
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
              <div className='header'>
                <a href={`/resources/${item.id}/`}><h3>{item.name}</h3></a>
              </div>
              <span className='meta'><i className={this.handleIcon(item.type)} />
                {item.type}
              </span>
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

