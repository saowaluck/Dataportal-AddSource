import { TOGGLE_FAVORITE } from './../actions/types'

const initailState = {
  isFavorite: false,
  members: [{
    id: '',
    name: '',
    position: '',
    slack: '',
    avatar: '',
  }],
}

const toggleFavoriteReducer = (state = initailState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      return action.payload.thisResource
    default:
      return state
  }
}

export default toggleFavoriteReducer
