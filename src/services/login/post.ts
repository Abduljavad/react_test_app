import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '../../axios'
import { routes } from '../routes'

interface TypePostLogin {
  email: string
  password: string
}

const login = async (data: TypePostLogin) => {
  return axiosInstance.post(routes.login, data)
}

const usePostLogin = () => {
  return useMutation((data: TypePostLogin) => login(data), {
    onSuccess: res => {
      const { accessToken, refreshToken } = res.data.data.tokens
      localStorage.setItem('token', accessToken)
      localStorage.setItem('refresh_token', refreshToken)
    }
  })
}

export default usePostLogin
