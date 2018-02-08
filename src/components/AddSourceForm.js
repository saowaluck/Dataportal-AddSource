import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import dotenv from 'dotenv'
import AddSupersetSource from './AddSupersetSource'
import AddDatabaseSource from './AddDatabaseSource'

dotenv.config({ path: './../../.env' })

class AddSourceForm extends Component {
  state = {
    type: '',
    types: [
      { key: '0', text: 'Database', value: 'Database' },
      { key: '1', text: 'Superset Dashboard', value: 'Superset Dashboard' },
      { key: '2', text: 'Knowledge Post', value: 'Knowledge post' },
    ],
  }

  handleDropdownChange(value) {
    this.setState({ type: value })
  }

  render() {
    return (
      <div className='ui main container'>
        <h1>Add New Resource</h1>
        <div className='ui segment'>
          <div className='ui stackable grid'>
            <div className='ten wide column'>
              <form className='ui form'>
                <div className='field'>Resource Type
                  <Dropdown
                    selection
                    name='type'
                    options={this.state.types}
                    onChange={(e, { value }) => {
                      this.handleDropdownChange(value)
                    }}
                  />
                  {this.state.type === 'Database' &&
                    <AddDatabaseSource type={this.state.type} />
                  }
                  {this.state.type === 'Superset Dashboard' &&
                    <AddSupersetSource type={this.state.type} />
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddSourceForm
