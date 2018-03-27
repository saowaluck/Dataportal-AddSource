import toggleFavoriteReducer from '../../reducers/toggleFavoriteReducer'
import TOGGLE_FAVORITE from '../../actions/type'


describe('<toggleFavoriteReducer />', () => {
  it('should initial state', () => {
    const action = {
      type: 'Not Defined',
      payload: {},
    }
    const expected = {
      isFavorite: false,
      members: [{
        id: '',
        name: '',
        position: '',
        slack: '',
        avatar: '',
      }],
    }

    const result = toggleFavoriteReducer(undefined, action)

    expect(result).toEqual(expected)
  })

  it('should handle TOGGLE_FAVORITE', () => {
    const action = {
      type: TOGGLE_FAVORITE,
      payload: {
        thisResource: [{
          id: 1,
          name: 'test1',
          position: 'deverloper',
          slack: 'test1',
          avatar: 'test1.jpg',
        }],
      },
    }
    const expected = [{
      id: 1,
      name: 'test1',
      position: 'deverloper',
      slack: 'test1',
      avatar: 'test1.jpg',
    }]

    const result = toggleFavoriteReducer(TOGGLE_FAVORITE, action)

    expect(result).toEqual(expected)
  })
})
