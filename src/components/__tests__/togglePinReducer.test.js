import togglePinReducer from '../../reducers/togglePinReducer'
import { FETCH_RESOURCE } from '../../actions/types'


describe('<togglePinReducer />', () => {
  it('should initial state', () => {
    const action = {
      type: 'Not Defined',
      payload: {},
    }
    const expected = {
      resourceBySelected: [
        {
          selectedResource: [{
            id: '',
            name: '',
            type: '',
            url: '',
          }],
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
    const result = togglePinReducer(undefined, action)
    expect(result).toEqual(expected)
  })

  it('should handle FETCHRESOURCE', () => {
    const action = {
      type: FETCH_RESOURCE,
      payload: {
        thisResourceByTeam: {
          resourceBySelected: [
            {
              selectedResource: [{
                id: '0',
                name: 'test',
                type: 'Database',
                url: '',
              }],
              isPinned: true,
            },
          ],
          pinnedResources: [
            {
              id: '1',
              name: 'test pin',
              type: 'Knowlege post',
              url: 'www.prontotools.io',
            },
          ],
        },
      },
    }
    const expected = {
      resourceBySelected: [
        {
          selectedResource: [{
            id: '0',
            name: 'test',
            type: 'Database',
            url: '',
          }],
          isPinned: true,
        },
      ],
      pinnedResources: [
        {
          id: '1',
          name: 'test pin',
          type: 'Knowlege post',
          url: 'www.prontotools.io',
        },
      ],
    }
    const result = togglePinReducer(FETCH_RESOURCE, action)
    expect(result).toEqual(expected)
  })
})
