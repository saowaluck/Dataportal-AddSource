import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'
import AddSupersetResource from './AddSupersetResource'
import AddDatabaseResource from './AddDatabaseResource'
import AddKnowledgePostResource from './AddKnowledgePostResource'

class AddResourceForm extends Component {
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
                  <AddDatabaseResource type={this.state.type} auth={this.props.auth} />
                }
                {this.state.type === 'Superset Dashboard' &&
                  <AddSupersetResource type={this.state.type} auth={this.props.auth} />
                }
                {this.state.type === 'Knowledge Post' &&
                  <AddKnowledgePostResource type={this.state.type} auth={this.props.auth} />
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddResourceForm.propTypes = {
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default AddResourceForm
