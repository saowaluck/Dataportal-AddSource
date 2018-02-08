import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Dropdown } from 'semantic-ui-react'
import dotenv from 'dotenv'
import PropTypes from 'prop-types'

dotenv.config({ path: './../../.env' })

class ApddDatabaseSource extends Component {
  state = {
    column: [],
    types: [
      { key: '0', text: 'int', value: 'int' },
      { key: '1', text: 'double', value: 'double' },
      { key: '2', text: 'float', value: 'float' },
      { key: '3', text: 'bigint', value: 'bigint' },
      { key: '4', text: 'string', value: 'string' },
      { key: '5', text: 'boolean', value: 'boolean' },
      { key: '6', text: 'timestamp', value: 'timestamp' },
      { key: '7', text: 'date', value: 'date' },
    ],
    columnName: '',
    columnType: '',
    tableName: '',
    isSubmit: false,
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/source/`, {
      tableName: this.state.tableName,
      column: this.state.column,
      type: this.props.type,
    })
      .then((res) => {
        this.setState({
          isSubmit: true,
          id: res.data.identity.low,
        })
      })
      .catch(() => {
      })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDropdownChange = (value) => {
    this.setState({ columnType: value })
  }

  handleAddColumn = () => {
    this.setState({
      column: [...this.state.column,
        [this.state.columnName, this.state.columnType],
      ],
    })
    this.setState({ columnName: '' })
  }

  handleDeleteColumn = (itemDel) => {
    this.setState({ column: this.state.column.filter(item => item !== itemDel) })
  }

  listColumns = () => (
    this.state.column.map(item => (
      <div className='two fields' key={item}>
        <div className='field disabled'>
          <input
            placeholder='Column Name'
            type='text'
            name='columnName'
            value={item[0]}
          />
        </div>
        <div className='field disabled'>
          <input
            placeholder='Column Type'
            type='text'
            name='columnType'
            value={item[1]}
          />
        </div>
        <button className='ui icon button' onClick={() => this.handleDeleteColumn(item)} >
          <i className='remove icon' />
        </button>
      </div>
    ))
  )

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='name'>Table Name
              <input
                type='text'
                name='tableName'
                placeholder='Table Name'
                value={this.state.tableName}
                required
                onChange={this.handleChange}
              />
            </label>
          </div>
          <h4 className='ui horizontal divider header'>Column</h4>
          <div className='field'>
            {this.listColumns()}
            <div className='two fields'>
              <div className='field'>
                <input
                  placeholder='Column Name'
                  type='text'
                  name='columnName'
                  value={this.state.columnName}
                  onChange={this.handleChange}
                />
              </div>
              <div className='field'>
                <Dropdown
                  selection
                  name='columnType'
                  options={this.state.types}
                  onChange={(e, { value }) => {
                    this.handleDropdownChange(value)
                  }}
                />
              </div>
              <div className='ui primary icon button' role='presentation' onClick={this.handleAddColumn} >
                <i className='add icon' />
              </div>
            </div>
          </div>
          <hr />
          <button className='ui primary button' type='submit'>Add</button>
        </form>
        {this.state.isSubmit && (<Redirect to={`/resources/${this.state.id}/`} />)}
      </div>
    )
  }
}

ApddDatabaseSource.propTypes = {
  type: PropTypes.string.isRequired,
}

export default ApddDatabaseSource
