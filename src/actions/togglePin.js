import axios from 'axios'
import { FETCH_RESOURCE } from './types'

const fetchResourcesSelectedByTeamSuccess = thisResourceByTeam => ({
  type: FETCH_RESOURCE,
  payload: {
    thisResourceByTeam,
  },
})

export const fetchResourcesSelectedByTeam = item => dispatch => {
  const { id } = item
  const path = `${process.env.REACT_APP_API_URL}/teams/${id}/resources/`
  axios
    .get(path)
    .then(team => {
      const thisResourceByTeam = team.data
      dispatch(fetchResourcesSelectedByTeamSuccess(thisResourceByTeam))
    })
    .catch(() => {
    })
}

export const handlePinnedResource = item => dispatch => {
  const { id, resourceId } = item
  const path = `${process.env.REACT_APP_API_URL}/teams/${id}/resources/${resourceId}/pinned/`
  axios
    .post(path)
    .then(team => {
      const thisResourceByTeam = team.data
      dispatch(fetchResourcesSelectedByTeamSuccess(thisResourceByTeam))
    })
    .catch(() => {
    })
}

export const handleUnPinResource = item => dispatch => {
  const { id, resourceId } = item
  const path = `${process.env.REACT_APP_API_URL}/teams/${id}/resources/${resourceId}/unpinned/`
  axios
    .post(path)
    .then(team => {
      const thisResourceByTeam = team.data
      dispatch(fetchResourcesSelectedByTeamSuccess(thisResourceByTeam))
    })
    .catch(() => {
    })
}
