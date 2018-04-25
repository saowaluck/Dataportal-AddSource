import React, { Component } from 'react'
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

  handleColor = type => {
    if (type === 'Database') {
      return 'ui right floated database label'
    } else if (type === 'Superset Dashboard') {
      return 'ui right floated superset label'
    } return 'ui right floated knowledge label'
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
                  <a className='content' href={`/resources/${item.id}/`}>{item.name}</a>
                  <span className={this.handleColor(item.type)}>{item.type}</span>
                </div>
              </div>
          ))}
          </div>
        </div>
      </div>
    )
  }
}

export default RecommentData
