import axios from '../utilities/axios'

export const httpLoginUser = (data) => {
    const url = 'http://localhost:80/api/login'
    return axios.post(url, data)
}
export const httpSignupUser = (data) => {
    const url = 'http://localhost:80/api/signup'
    return axios.post(url, data)
}

export const httpLogoutUser = () => {
    const url = '/auth/logout'
    return axios.get(url)
}

