import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Button } from 'semantic-ui-react'

class NewsFeed extends Component {
  state = {
    resources: [],
    visible: 5,
  }

  componentDidMount() {
    const path = `${process.env.REACT_APP_API_URL}/resources/`
    axios(path)
      .then(result => {
        this.setState({
          resources: result.data.resources,
        })
      })
      .catch(() => {
      })
  }

  processAction = (createdDate, updatedDate) => {
    if (updatedDate > createdDate) {
      return ' update '
    }
    return ' create '
  }


  loadMore = () => {
    this.setState(prevState => ({
      visible: prevState.visible + 4,
    }))
  }

  render() {
    return (
      <div className='ui segments'>
        <div className='ui segment'>
          <h3 className='ui header'>News Feed</h3>
        </div>
        <div className='ui segment'>
          <div className='ui feed'>
            {this.state.resources.slice(0, this.state.visible).map(item => (
              <div className='event' key={item}>
                <div className='label'>
                  <a href={`/members/${item.resource.memberId}`}>
                    <img src={item.resource.memberAvatar} alt='' />
                  </a>
                </div>
                <div className='content'>
                  <div className='date'>
                    {moment(item.resource.updatedDate).toNow(true)}
                  </div>
                  <div className='summary'>
                    {this.processAction(item.resource.createdDate, item.resource.updatedDate)}
                    <a href={`/resources/${item.resource.resourceId}`}>
                      { item.resource.name.length > 24
                        ? `${item.resource.name.substring(0, 24)}...`
                        : item.resource.name
                      }
                    </a>
                  </div>
                </div>
              </div>
          ))}
          </div>
        </div>
        {this.state.visible < this.state.resources.length &&
          <Button size='tiny' onClick={this.loadMore} attached='bottom'>Load more ...</Button>}
      </div>
    )
  }
}

export default NewsFeed
