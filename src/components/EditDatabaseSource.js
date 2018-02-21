import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Dropdown, Modal, Button } from 'semantic-ui-react'

class EditDatabaseSource extends Component {
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
    tableName: '',
    tableDescription: '',
    tags: [],
    columns: [],
    columnID: 0,
    columnName: '',
    columnType: '',
    columnDescription: '',
    isSubmit: false,
    isOpen: false,
  }

  componentDidMount = () => {
    this.setState({
      tableName: this.props.name,
      tableDescription: this.props.description,
      columns: this.props.columns.map(row => (
        row.split(',')
      )),
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/source/edit/`, {
      id: this.props.id,
      tableName: this.state.tableName,
      tableDescription: this.state.tableDescription,
      columns: this.state.columns,
      tags: this.state.tags,
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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDropdownChange = (value) => {
    this.setState({ columnType: value })
  }

  handleAddColumn = () => {
    this.setState({
      columns: [...this.state.columns,
        [this.state.columnName, this.state.columnType, this.state.columnDescription],
      ],
    })
    this.setState({
      columnName: '',
      columnDescription: '',
    })
  }

  handleDeleteColumn = (itemDel) => {
    this.setState({ columns: this.state.columns.filter(item => item !== itemDel) })
  }

  listColumns = () => (
    this.state.columns.map((item, id) => (
      <div className='three fields' key={item}>
        <div className='field disabled'>
          <input
            type='text'
            name='columnName'
            value={item[0]}
          />
        </div>
        <div className='field disabled'>
          <input
            type='text'
            name='columnType'
            value={item[1]}
          />
        </div>
        <div className='field disabled'>
          <textarea type='text' name='columnDescription' rows='1' value={item[2]} />
        </div>
        <Button.Group size='large'>
          <div className='ui primary icon button' role='presentation' onClick={() => this.handleShow(item, id)}>
            <i className='edit icon' />
          </div>
          <div className='ui red icon button' role='presentation' onClick={() => this.handleDeleteColumn(item)}>
            <i className='trash icon' />
          </div>
        </Button.Group>
      </div>
    ))
  )

  handleModal = () => (
    <Modal dimmer='blurring' open={this.state.isOpen} onClose={this.handleClose} closeIcon>
      <Modal.Header>Edit Column</Modal.Header>
      <Modal.Content>
        <form className='ui form'>
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
                placeholder='Column Type'
                name='columnType'
                defaultValue={this.state.columnType}
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
          </div>
        </form>
      </Modal.Content>
      <Modal.Actions>
        <button className='ui primary button' onClick={this.updateColumn} >Save</button>
      </Modal.Actions>
    </Modal>
  )

  handleShow = (itemEdit, id) => {
    this.setState({
      isOpen: true,
      columnID: id,
      columnName: itemEdit[0],
      columnType: itemEdit[1],
      columnDescription: itemEdit[2],
    })
  }

  handleClose = () => this.setState({ isOpen: false, columnName: '', columnDescription: '' })

  updateColumn = () => {
    const newColumns = this.state.columns
    newColumns.splice(this.state.columnID, 1, [
      this.state.columnName,
      this.state.columnType,
      this.state.columnDescription])
    this.setState({
      columns: newColumns,
      isOpen: false,
      columnName: '',
      columnDescription: '',
    })
  }

  render() {
    return (
      <div className='ui main container'>
        <h1>Edit Resource</h1>
        <div className='ui segment'>
          <div className='ui stackable grid'>
            <div className='ten wide column'>
              <form className='ui form' onSubmit={this.handleSubmit} >
                {this.handleModal()}
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
                <div className='field'>
                  <label htmlFor='name'>Table Description
                    <textarea
                      type='text'
                      name='tableDescription'
                      value={this.state.tableDescription}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className='field'>
                  <label htmlFor='name'>Tag
                    <input type='text' name='tags' />
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
                        placeholder='Column Type'
                        name='columnType'
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
                    <div className='ui primary icon button' role='presentation' onClick={this.handleAddColumn}>
                      <i className='add icon' />
                    </div>
                  </div>
                </div>
                <hr />
                <button className='ui primary button' type='submit' >Save Table</button>
              </form>
              {this.state.isSubmit && (<Redirect to={`/resources/${this.state.id}/`} />)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EditDatabaseSource.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default EditDatabaseSource
