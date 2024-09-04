import {localstorage, user as userconsts} from './constants'

const accessToken = {
    set: (value) => {
        localStorage.setItem(localstorage.ACCESS_TOKEN, value)
    },
    get: () => {
        return localStorage.getItem(localstorage.ACCESS_TOKEN)
    },
    remove: () => {
        localStorage.removeItem(localstorage.ACCESS_TOKEN)
    },
}

const refreshToken = {
    set: (value) => {
        localStorage.setItem(localstorage.REFRESH_TOKEN, value)
    },
    get: () => {
        return localStorage.getItem(localstorage.REFRESH_TOKEN)
    },
    remove: () => {
        localStorage.removeItem(localstorage.REFRESH_TOKEN)
    },
}

const user = {
    set: (value) => {
        localStorage.setItem(localstorage.USER, JSON.stringify(value))
    },
    get: () => {
        return JSON.parse(localStorage.getItem(localstorage.USER))
    },
    remove: () => {
        localStorage.removeItem(localstorage.USER)
    },
}

const setAuthData = (authData) => {
    accessToken.set(authData[userconsts.ACCESS_TOKEN])
    refreshToken.set(authData[userconsts.REFRESH_TOKEN])
    user.set(authData[userconsts.CURRENT_USER])
}

const removeAuthData = () => {
    accessToken.remove()
    refreshToken.remove()
    user.remove()
}

const LocalStorageManager = {
    accessToken,
    refreshToken,
    user,
    setAuthData,
    removeAuthData,
}

export default LocalStorageManager
