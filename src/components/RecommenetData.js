import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class RecommentData extends Component {
  state = {
    resources: [],
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_API_URL}/resources/recomment/?memberEmail=${this.props.email}`
    axios
      .get(url)
      .then((res) => {
        this.setState({
          resources: res.data,
        })
      })
      .catch(() => {
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
      <div className='ui segments'>
        <div className='ui segment'>
          <h3 className='ui header'>Recommented</h3>
        </div>
        <div className='ui segment'>
          <div className='ui middle aligned list'>
            {this.state.resources.map(item => (
              <div className='item' key={item.id}>
                <div className='header'>
                  <a className='content' href={`/resources/${item.id}/`}>
                    { item.name.length > 40
                      ? `${item.name.substring(0, 40)}...`
                      : item.name
                    }
                  </a>
                  <span className='ui mini right floated' ><i className={this.handleIcon(item.type)} /></span>
                </div>
              </div>
          ))}
          </div>
        </div>
      </div>
    )
  }
}

RecommentData.propTypes = {
  email: PropTypes.string.isRequired,
}

export default RecommentData
