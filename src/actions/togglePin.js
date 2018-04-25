import axios from 'axios'
import { FETCH_RESOURCE } from './types'

const fetchResourcesCreatedByTeamSuccess = thisResourceByTeam => ({
  type: FETCH_RESOURCE,
  payload: {
    thisResourceByTeam,
  },
})

export const fetchResourcesCreatedByTeam = item => dispatch => {
  const { id } = item
  const path = `${process.env.REACT_APP_API_URL}/teams/${id}/resources/`
  axios
    .get(path)
    .then(team => {
      const thisResourceByTeam = team.data
      dispatch(fetchResourcesCreatedByTeamSuccess(thisResourceByTeam))
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
      dispatch(fetchResourcesCreatedByTeamSuccess(thisResourceByTeam))
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
      dispatch(fetchResourcesCreatedByTeamSuccess(thisResourceByTeam))
    })
    .catch(() => {
    })
}
