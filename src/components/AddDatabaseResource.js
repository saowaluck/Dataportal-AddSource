import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Dropdown, Button } from 'semantic-ui-react'

class AddDatabaseResource extends Component {
  state = {
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
    name: '',
    description: '',
    tags: [],
    columns: [],
    columnName: '',
    columnType: '',
    columnDescription: '',
    isSubmit: false,
    options: [],
    editId: '',
    editName: '',
    editType: '',
    editDescription: '',
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/tags/`)
      .then(res => {
        res.data.tags.map(tag => (
          this.setState({
            options: [
              { text: tag, value: tag },
              ...this.state.options,
            ],
          })
        ))
      })
  }

  onSearchChange = (e, { searchQuery }) => {
    if (searchQuery.match(',')) {
      const tag = searchQuery.substring(0, searchQuery.length - 1)
      if (this.state.tags.every(currentTags => currentTags !== tag)) {
        this.setState({
          options: [{ text: tag, value: tag }, ...this.state.options],
          tags: [
            ...this.state.tags,
            tag,
          ],
        }, () => {
          this.dropdown.clearSearchQuery()
        })
      } else {
        this.setState(() => {
          this.dropdown.clearSearchQuery()
        })
      }
    }
  }

  handleAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options],
    })
  }

  handleTagsChange = (e, { value }) => {
    this.setState({
      tags: value,
    })
  }

  allTagOption = s => { this.dropdown = s }

  handleSubmit = e => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/resources/`, {
      name: this.state.name,
      description: this.state.description,
      columns: this.state.columns,
      tags: this.state.tags,
      type: this.props.type,
      email: this.props.auth.getEmail(),
    })
      .then((res) => {
        this.setState({
          isSubmit: true,
          id: res.data.id,
        })
      })
      .catch(() => {
      })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDropdownChange = (value) => (
    this.setState({ columnType: value })
  )

  handleEditDropdownChange = (value) => (
    this.setState({ editType: value })
  )

  handleAddColumn = () => {
    this.setState({
      columns: [...this.state.columns,
        [this.state.columnName, this.state.columnType, this.state.columnDescription],
      ],
    })
    this.setState({
      columnName: '',
      columnDescription: '',
      columnType: '',
    })
  }

  handleDeleteColumn = (itemDel) => {
    this.setState({ columns: this.state.columns.filter(item => item !== itemDel) })
  }

  listColumns = () => (
    this.state.columns.map((item, id) => (
      this.state.editId === id ? (
        this.handleShowEditColumn()
      ) : (
        <div
          className='three fields'
          key={item}
        >
          <div
            className='field'
            role='presentation'
            onClick={() => this.handleEditColumn(item, id)}
          >
            <input
              disabled
              type='text'
              name='columnName'
              defaultValue={item[0]}
            />
          </div>
          <div
            className='field'
            role='presentation'
            onClick={() => this.handleEditColumn(item, id)}
          >
            <input
              disabled
              className='disabled'
              type='text'
              name='columnType'
              defaultValue={item[1]}
            />
          </div>
          <div
            className='field'
            role='presentation'
            onClick={() => this.handleEditColumn(item, id)}
          >
            <textarea
              disabled
              className='disabled'
              type='text'
              name='columnDescription'
              rows='1'
              defaultValue={item[2]}
            />
          </div>
          <Button.Group size='large'>
            <div className='ui red icon button' role='presentation' onClick={() => this.handleDeleteColumn(item)}>
              <i className='trash icon' />
            </div>
          </Button.Group>
        </div>
      )
    ))
  )

  handleShowEditColumn = () => (
    <div className='three fields' >
      <div className='field'>
        <input
          placeholder='Column Name'
          type='text'
          name='editName'
          value={this.state.editName}
          onChange={this.handleChange}
        />
      </div>
      <div className='field'>
        <Dropdown
          selection
          placeholder='Column Type'
          name='columnType'
          defaultValue={this.state.editType}
          options={this.state.types}
          onChange={(e, { value }) => {
              this.handleEditDropdownChange(value)
            }}
        />
      </div>
      <div className='field'>
        <textarea
          placeholder='Column Description'
          type='text'
          name='editDescription'
          rows='1'
          value={this.state.editDescription}
          onChange={this.handleChange}
        />
      </div>
      <Button.Group size='large'>
        <div className='ui primary icon button' role='presentation' onClick={this.updateColumn} >
          <i className='save icon' />
        </div>
      </Button.Group>
    </div>
  )

  handleEditColumn = (itemEdit, id) => {
    this.setState({
      editId: id,
      editName: itemEdit[0],
      editType: itemEdit[1],
      editDescription: itemEdit[2],
    })
  }

  handleClose = () => this.setState({ columnName: '', columnDescription: '' })

  updateColumn = () => {
    const newColumns = this.state.columns
    newColumns.splice(this.state.editId, 1, [
      this.state.editName,
      this.state.editType,
      this.state.editDescription])
    this.setState({
      columns: newColumns,
      editId: '',
      editName: '',
      editType: '',
      editDescription: '',
    })
  }

  render() {
    return (
      <div>
        <form name='table' onSubmit={this.handleSubmit}>
          <div className='required field'>
            <label htmlFor='name'>Table Name</label>
            <input
              type='text'
              name='name'
              placeholder='Table Name'
              value={this.state.name}
              required
              onChange={this.handleChange}
            />
          </div>
          <div className='required field'>
            <label htmlFor='name'>Table Description</label>
            <textarea
              type='textarea'
              required
              name='description'
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div className='field'>
            <label htmlFor='name'>Tags
              <Dropdown
                name='tags'
                ref={this.allTagOption}
                options={this.state.options}
                multiple
                placeholder='Insert Tags'
                search
                selection
                fluid
                allowAdditions
                value={this.state.tags}
                onSearchChange={this.onSearchChange}
                onAddItem={this.handleAddition}
                onChange={this.handleTagsChange}
              />
            </label>
          </div>
          <div className='field'>
            { this.listColumns().length !== 0 && <h4 className='ui horizontal divider header'>Columns</h4>}
            { this.listColumns()}
            <h4 className='ui horizontal divider header'>Add Columns</h4>
            <div className='three fields'>
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
                  value={this.state.columnType}
                  options={this.state.types}
                  onChange={(e, { value }) => {
                    this.handleDropdownChange(value)
                  }}
                />
              </div>
              <div className='field'>
                <textarea
                  placeholder='Column Description'
                  type='text'
                  name='columnDescription'
                  rows='1'
                  value={this.state.columnDescription}
                  onChange={this.handleChange}
                />
              </div>
              <div className='ui primary icon button' role='presentation' onClick={this.handleAddColumn} >
                <i className='add icon' />
              </div>
            </div>
          </div>
          <hr />
          <button className='ui primary button' type='submit'>Save Table</button>
        </form>
        {this.state.isSubmit && (<Redirect to={`/resources/${this.state.id}/`} />)}
      </div>
    )
  }
}

AddDatabaseResource.propTypes = {
  type: PropTypes.string.isRequired,
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default AddDatabaseResource
