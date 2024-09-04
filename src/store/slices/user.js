import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit'
import {
    httpLoginUser,
    httpLogoutUser,
} from '../../http-requests'
import LocalStorageManager from '../../utilities/localStorage'
import {user as userconsts} from '../../utilities/constants'
import { SIGNUP_STATUSES } from '../../pages/auth/signup/signup-form/signupModel'

const sliceName = 'user'

export const login = createAsyncThunk(
    `${sliceName}/login`,
    async (authData, { rejectWithValue }) => {
        try {
            const { data: userData } = await httpLoginUser(authData)
            LocalStorageManager.accessToken.set(userData[userconsts.ACCESS_TOKEN]);
            LocalStorageManager.user.set({
                email: userData.email,
                email_confirmed: userData.email_confirmed,
                first_name: userData.first_name, 
                id: userData.id,
                last_name: userData.last_name,
                password: userData.password
            })
            return userData
        } catch (err) {
            return rejectWithValue(err?.response?.data)
        }
    }
)

export const logout = createAsyncThunk(
    `${sliceName}/logout`,
    async (authData, { rejectWithValue }) => {
        try {
            const response = await httpLogoutUser()
            LocalStorageManager.removeAuthData()
            return response.data
        } catch (err) {
            return rejectWithValue(err?.response?.data)
        }
    }
)



const user = createSlice({
    name: sliceName,
    initialState: {
        user: LocalStorageManager.user.get() || null,
        accessToken: LocalStorageManager.accessToken.get() || null,
        refreshToken: LocalStorageManager.refreshToken.get() || null,
        updatingUserData: false,
        signupStatus: SIGNUP_STATUSES.initial,
        activities: {
            grouped: [],
            currentPage: 0,
            lastPage: 0,
            total: 0,
            perPage: 12,
        },
    },
    reducers: {
        setNewAccessToken: (state, action) => {
            state.accessToken = action.payload[userconsts.ACCESS_TOKEN]
        },
        setNewRefreshToken: (state, action) => {
            state.refreshToken = action.payload[userconsts.REFRESH_TOKEN]
        },
    },
    extraReducers: {
        [logout.fulfilled]: (state, action) => {
            state.accessToken = null
            state.refreshToken = null
            state.user = null
        },
        [login.fulfilled]: (state, action) => {
            state.accessToken = action.payload[userconsts.ACCESS_TOKEN]
            state.refreshToken = action.payload[userconsts.REFRESH_TOKEN]
            state.user = action.payload[userconsts.CURRENT_USER]
        },
    },
})

// Selectors
const selectSelf = (state) => state[sliceName]
export const selectUser = createSelector(selectSelf, (state) => state.user)
export const selectAccessToken = createSelector(
    selectSelf,
    (state) => state.accessToken
)
export const selectIsUpdatingUserData = createSelector(
    selectSelf,
    (state) => state.updatingUserData
)

export const selectSignupStatus = createSelector(
    selectSelf,
    (state) => state.signupStatus
)

export const {
    updateUser,
    setSignupStatus,
} = user.actions
export default user.reducer
