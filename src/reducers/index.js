
import { combineReducers } from 'redux'
import toggleFavoriteReducer from './toggleFavoriteReducer'

const rootReducer = combineReducers({
  thisResource: toggleFavoriteReducer,
})

export default rootReducer
