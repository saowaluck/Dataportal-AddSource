import auth0 from 'auth0-js'
import dotenv from 'dotenv'
import history from './history'

dotenv.config()

export default class Auth {
  constructor() {
    this.status = 'loading'
  }

  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH_DOMAIN,
    clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
    redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI,
    audience: process.env.REACT_APP_AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid profile email phone',
  })


  login = () => {
    this.auth0.authorize({
      connection: 'google-oauth2',
    })
  }

  userProfile

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        history.replace('/')
      } else if (err.error === 'unauthorized') {
        history.replace('/')
      } else {
        history.replace('/login')
      }
    })
  }

  setSession = authResult => {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    localStorage.setItem('name', authResult.idTokenPayload.nickname)
    localStorage.setItem('avatar', authResult.idTokenPayload.picture)
    localStorage.setItem('email', authResult.idTokenPayload.email)
  }

  logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('name')
    localStorage.removeItem('avatar')
    localStorage.removeItem('email')
    history.replace('/login')
  }

  isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      throw new Error('No access token found')
    }
    return accessToken
  }

  getAvatar = () => {
    const avatar = localStorage.getItem('avatar')
    return avatar
  }

  getEmail = () => {
    const email = localStorage.getItem('email')
    return email
  }

  getName = () => {
    const name = localStorage.getItem('name')
    return name
  }

  getProfile = cb => {
    const accessToken = this.getAccessToken()
    return this.auth0.client.userInfo(accessToken, (err, profile, email) => {
      if (profile) {
        this.userProfile = profile
      }
      cb(err, profile, email)
      return profile
    })
  }
}
