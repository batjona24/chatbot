import axios from './index'
import LocalStorageManager from '../localStorage'
import store from '../../store'

const endpointToIgnore = ['/auth/refresh', '/auth/login']

export const axiosAttachInterceptors = () => {
    const requestInterceptor = axios.interceptors.request.use((request) => {
        const token = LocalStorageManager.accessToken.get()
        if (token) request.headers['Authorization'] = `Bearer ${token}`
        return request
    })
    // enable global response handling
    const responseInterceptor = axios.interceptors.response.use(
        (response) => {
            // pass response without change
            return response
        },
        async (error) => {
            // get error info
            let statusCode = error?.response?.status
            let originalRequest = error.config

            switch (statusCode) {
                default:
                    return Promise.reject(error)
            }
        }
    )

    return { requestInterceptor, responseInterceptor }
}

// define function which updates axios authorization header
export const setTokenToAxios = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const removeTokenFromAxios = () => {
    axios.defaults.headers.common['Authorization'] = null
}
