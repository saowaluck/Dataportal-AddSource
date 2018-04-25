import axios from 'axios'
import { TOGGLE_FAVORITE } from './types'

const toggleFavoriteSuccess = thisResource => ({
  type: TOGGLE_FAVORITE,
  payload: {
    thisResource,
  },
})

const toggleFavorite = item => dispatch => {
  const { id, memberEmail, isClick } = item
  if (isClick) {
    const path = `${process.env.REACT_APP_API_URL}/resources/${id}/favorites/`
    axios
      .post(path, {
        memberEmail,
      })
      .then(res => {
        const thisResource = {
          isFavorite: res.data.isFavorite,
          members: res.data.members,
        }
        dispatch(toggleFavoriteSuccess(thisResource))
      })
  } else {
    const path = `${process.env.REACT_APP_API_URL}/resources/${id}/favorites/?memberEmail=${memberEmail}`
    axios
      .get(path)
      .then(res => {
        const thisResource = {
          isFavorite: res.data.isFavorite,
          members: res.data.members,
        }
        dispatch(toggleFavoriteSuccess(thisResource))
      })
  }
}
export default toggleFavorite
