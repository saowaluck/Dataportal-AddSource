import React, { Component } from 'react'
import axios from 'axios'

class CategoryTeam extends Component {
  state = {
    teams: [],
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_API_URL}/teams/`
    axios
      .get(url)
      .then((res) => {
        this.setState({
          teams: res.data,
        })
      })
      .catch(() => {
      })
  }

  render() {
    return (
      <div className='ui row vertical segment'>
        {this.state.teams.map(item => (
          <div className='ui segment' key={item.team.id}>
            <div className='ui row vertical segment'>
              <div className='ui item'>
                <h3 className='ui header'>
                  <a href={`/teams/${item.team.id}/`}>{item.team.name}</a>
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default CategoryTeam
