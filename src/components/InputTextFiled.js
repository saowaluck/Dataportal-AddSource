import React, { Component } from 'react'
import PropTypes from 'prop-types'

class InputTextFiled extends Component {
  state = {
    value: '',
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    return (
      <div className='field'>
        <div className='ui left icon input'>
          <i className={this.props.icon} />
          <input type='text' name={this.props.name} placeholder={this.props.placeholder} value={this.state.value} onChange={this.onChange} />
        </div>
      </div>
    )
  }
}

InputTextFiled.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default InputTextFiled
