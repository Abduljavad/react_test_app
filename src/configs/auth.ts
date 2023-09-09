export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/api/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'token',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
