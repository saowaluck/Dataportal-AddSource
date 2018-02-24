import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import AddSupersetSource from './AddSupersetSource'
import AddDatabaseSource from './AddDatabaseSource'
import AddKnowledgePostSource from './AddKnowledgePostSource'

class AddSourceForm extends Component {
  state = {
    type: '',
    types: [
      { key: '0', text: 'Database', value: 'Database' },
      { key: '1', text: 'Superset Dashboard', value: 'Superset Dashboard' },
      { key: '2', text: 'Knowledge Post', value: 'Knowledge Post' },
    ],
  }

  handleDropdownChange(value) {
    this.setState({ type: value })
  }

  render() {
    return (
      <div className='ui main container'>
        <div className='ui centered grid'>
          <div className='twelve wide column'>
            <div className='ui segment'>
              <h1>Add New Resource</h1>
              <form className='ui form'>
                <div className='field'>
                  <label htmlFor='name'>
                    <p>Resource Type</p>
                  </label>
                  <Dropdown
                    selection
                    name='type'
                    options={this.state.types}
                    onChange={(e, { value }) => {
                    this.handleDropdownChange(value)
                  }}
                  />
                </div>
                {this.state.type === 'Database' &&
                  <AddDatabaseSource type={this.state.type} />
                }
                {this.state.type === 'Superset Dashboard' &&
                  <AddSupersetSource type={this.state.type} />
                }
                {this.state.type === 'Knowledge Post' &&
                  <AddKnowledgePostSource type={this.state.type} />
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddSourceForm
