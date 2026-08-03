import reducer, { loginSuccess, logout } from '../authSlice'

describe('authSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual({
      identifier: null,
      isAuthenticated: false,
    })
  })

  it('should set identifier and isAuthenticated on loginSuccess', () => {
    const state = reducer(undefined, loginSuccess({ identifier: '0812345678' }))
    expect(state).toEqual({ identifier: '0812345678', isAuthenticated: true })
  })

  it('should clear identifier and isAuthenticated on logout', () => {
    const loggedIn = reducer(
      undefined,
      loginSuccess({ identifier: '0812345678' }),
    )
    const state = reducer(loggedIn, logout())
    expect(state).toEqual({ identifier: null, isAuthenticated: false })
  })
})
