import axios from 'axios'
import store from '../store/index'
import { logout } from '../store/slices/authSlice'
import { toast } from 'react-toastify'

const axiosInstance = axios.create({
  baseURL: '/api/v1',
})

axiosInstance.interceptors.request.use(config => {
  const token = store.getState().auth.user?.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error('Сессия истекла. Пожалуйста, войдите снова.')
      store.dispatch(logout())
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
