import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

class SelectDropdown extends Component {
  state = {
    types: [
      { key: '0', text: 'Data Source', value: 'Data Source' },
      { key: '1', text: 'Superset Dashboard', value: 'Superset Dashboard' },
      { key: '2', text: 'Knowledge Post', value: 'Knowledge post' },
    ],
  }

  render() {
    return (
      <div className='ten wide column'>
        <form className='ui form' >
          <div className='field'>
            <Dropdown
              selection
              name='type'
              options={this.state.types}
              placeholder='Superset Dashboard'
            />
          </div>
        </form>
      </div>
    )
  }
}

export default SelectDropdown
