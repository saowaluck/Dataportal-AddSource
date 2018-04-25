
import { combineReducers } from 'redux'
import toggleFavoriteReducer from './toggleFavoriteReducer'
import togglePinReducer from './togglePinReducer'

const rootReducer = combineReducers({
  thisResource: toggleFavoriteReducer,
  thisResourceByTeam: togglePinReducer,
})

export default rootReducer
