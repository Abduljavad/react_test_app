import { routes } from '../services/routes'
import toast from 'react-hot-toast'
import axios from 'axios'

// Set config defaults when creating the instance
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export const axiosInstance = axios.create({
  baseURL
})

// Change request data/error here
axiosInstance.interceptors.request.use(
  (config: any) => {
    let token

    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token')

      if (config.url === routes.refresh) {
        token = localStorage.getItem('refresh_token')
      }
    }

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ''}`,
      x_app_type: 'super_admin',
      Accept: 'application/json'
    }

    return config
  },
  error => {
    console.log(error, 'the error')

    return Promise.reject(error)
  }
)

function createAxiosResponseInterceptor() {
  // Add a response interceptor
  const interceptor = axiosInstance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response
    },
    async function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      //  401 -> Unauthorized error
      if (error?.response?.status === 401) {
        // Even though error message is Unauthorized, this is only for refresh token case
        // For request having no token or expired, message will be => Forbidden resource

        // Refresh token case
        if (error.response.data.message === 'Unauthenticated.') {
          axios.interceptors.response.eject(interceptor)

          // return axiosInstance
          //   .post(routes.refresh)
          //   .then(response => {
          //     const newToken = response.data.data.accessToken
          //     const newRefreshToken = response.data.data.refreshToken
          //     localStorage.setItem('token', newToken)
          //     localStorage.setItem('refresh_token', newRefreshToken)

          //     error.response.config.headers['Authorization'] = 'Bearer ' + response.data.data.accessToken

          //     return axios(error.response.config)
          //   })
          // .catch(err => {
          //   // check if refresh api failed
          //   toast.error('token refresh failed')
          //   // localStorage.clear()

          //   if (window.location.pathname !== '/') {
          //     window.location.href = '/login'
          //   }

          //   return Promise.reject(err)
          // })
          // .finally(createAxiosResponseInterceptor)
        }
        // }

        localStorage.clear()

        if (window.location.pathname !== '/' && window.location.pathname !== '/login/') {
          window.location.href = '/login/'
        }
      }

      return Promise.reject(error)
    }
  )
}

createAxiosResponseInterceptor() // Execute the method once during start
