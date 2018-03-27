import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListAllResource extends Component {
  handleColor = type => {
    if (type === 'Database') {
      return 'ui right floated blue large button disabled'
    } else if (type === 'Superset Dashboard') {
      return 'ui right floated teal large button disabled'
    } return 'ui right floated green large button disabled'
  }
  render() {
    return (
      <div className='ui row vertical segment'>
        <div className='ui divided items'>
          {this.props.resource.map(item => (
            <div className='item' key={item.resource.resourceID}>
              <div className='content'>
                <div className='ui row vertical'>
                  <h3 className='ui header'>
                    <a href={`/resources/${item.resource.resourceID}/`}>{item.resource.name}</a>
                    <div className={this.handleColor(item.resource.type)}>
                      <div className='visible content'>{item.resource.type}</div>
                    </div>
                  </h3>
                </div>
                <br />
                <p>
                  <span><i className='empty heart icon' />{item.favorite}</span>&nbsp;&nbsp;
                  <span>
                    <a href={`/members/${item.resource.memberID}/`}>
                      <i className='user icon people' />{item.resource.member}
                    </a>
                  </span>&nbsp;&nbsp;
                  <span><i className='wait icon' />{item.resource.createdDate}</span>&nbsp;&nbsp;
                  <span><i className='history icon' />{item.resource.updatedDate}</span>&nbsp;&nbsp;
                </p>
              </div>
            </div>
            ))}
        </div>
      </div>
    )
  }
}

ListAllResource.propTypes = {
  resource: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default ListAllResource

