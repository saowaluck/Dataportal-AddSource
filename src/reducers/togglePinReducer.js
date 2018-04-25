import { FETCH_RESOURCE } from './../actions/types'

const initailState = {
  resourceByCreated: [
    {
      createdResource: {
        id: '',
        name: '',
        type: '',
        url: '',
      },
      isPinned: true,
    },
  ],
  pinnedResources: [
    {
      id: '',
      name: '',
      type: '',
      url: '',
    },
  ],
}

const togglePinReducer = (state = initailState, action) => {
  switch (action.type) {
    case FETCH_RESOURCE:
      return action.payload.thisResourceByTeam
    default:
      return state
  }
}

export default togglePinReducer
