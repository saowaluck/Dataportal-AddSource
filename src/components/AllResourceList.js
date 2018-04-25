import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Pagination } from 'semantic-ui-react'

class AllResourceList extends Component {
  state = {
    beginList: 0,
    endList: 7,
    activePage: 1,
    listPerPage: 7,
  }

  onPageChange =(e, { activePage }) => {
    this.setState(({
      endList: activePage * this.state.listPerPage,
      activePage,
    }))
    if (activePage === 1) {
      this.setState(({
        beginList: 0,
      }))
    } else {
      this.setState(({
        beginList: ((activePage * this.state.listPerPage) - this.state.listPerPage),
      }))
    }
  }

  handleColor = type => {
    if (type === 'Database') {
      return 'ui right floated database big label'
    } else if (type === 'Superset Dashboard') {
      return 'ui right floated superset big label'
    } return 'ui right floated knowledge big label'
  }

  render() {
    return (
      <div>
        <div className='ui row vertical segment'>
          <p>{this.props.resources.length} results found for {this.props.searchText}</p>
          <div className='ui divided items'>
            {this.props.resources.slice(this.state.beginList, this.state.endList).map(item => (
              <div className='item' key={item.resource.resourceId}>
                <div className='content'>
                  <div className='ui row vertical'>
                    <h3 className='ui header'>
                      <a href={`/resources/${item.resource.resourceId}/`}>{item.resource.name}</a>
                      <div className={this.handleColor(item.resource.type)}>
                        <div className='visible content'>{item.resource.type}</div>
                      </div>
                    </h3>
                  </div>
                  <br />
                  <p>
                    <span><i className='heart icon' />{item.favorite}</span>&nbsp;&nbsp;
                    <span>
                      <a href={`/members/${item.resource.memberId}/`}>
                        <i className='user icon people' />{item.resource.member}
                      </a>
                    </span>&nbsp;&nbsp;
                    <span><i className='wait icon' />{moment(new Date(item.resource.createdDate)).format('MMM DD, YYYY')}</span>&nbsp;&nbsp;
                    <span><i className='history icon' />{moment(new Date(item.resource.updatedDate)).format('MMM DD, YYYY')}</span>&nbsp;&nbsp;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {this.props.resources.length !== 0 &&
          <div className='ui center aligned basic segment'>
            <Pagination
              activePage={this.state.activePage}
              totalPages={Math.ceil(this.props.resources.length / this.state.listPerPage)}
              onPageChange={this.onPageChange}
            />
          </div>
        }
      </div>
    )
  }
}

AllResourceList.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.any).isRequired,
  searchText: PropTypes.string.isRequired,
}

export default AllResourceList
