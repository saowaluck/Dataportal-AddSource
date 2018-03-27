import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import toggleFavorite from './../actions/toggleFavorite'

class Favorite extends Component {
  componentWillMount() {
    this.props.toggleFavorite({
      id: this.props.id,
      memberEmail: this.props.memberEmail,
      isClick: false,
    })
  }

  toggleFavorite = () => {
    this.props.toggleFavorite({
      id: this.props.id,
      memberEmail: this.props.memberEmail,
      isClick: true,
    })
  }

  render() {
    if (this.props.thisResource.isFavorite) {
      return <Icon onClick={this.toggleFavorite} className='ui heart icon large' />
    }
    return <Icon onClick={this.toggleFavorite} className='ui heart outline icon large' />
  }
}

const mapStateToProps = state => ({
  thisResource: state.thisResource,
})

const mapDispatchToProps = dispatch => ({
  toggleFavorite: item => dispatch(toggleFavorite(item)),
})

Favorite.propTypes = {
  toggleFavorite: PropTypes.func.isRequired,
  memberEmail: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  thisResource: PropTypes.arrayOf(PropTypes.objectOf.any).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite)
