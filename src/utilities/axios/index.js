import axios from 'axios'
import LocalStorageManager from '../localStorage'

const config = {
    baseURL: process.env.REACT_APP_ENDPOINT,
    headers: {
        common: {
            Authorization: LocalStorageManager.accessToken.get()
                ? `Bearer ${LocalStorageManager.accessToken.get()}`
                : false,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        post: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    },
}
// create axios custom instance with custom config
export default axios.create(config)
