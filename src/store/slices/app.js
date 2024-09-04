import { createSelector, createSlice } from '@reduxjs/toolkit'

const sliceName = 'app'

const appSlice = createSlice({
    name: sliceName,
    initialState: {
        theme: 'light',
        banner: {
            message: null,
            title: null,
            variant: 'fail',
            visible: false,
        },
        isSubscriptionModalOpen: false,
        isUnsubscribeModalOpen: false,
        subscriptionModalUser: null,
    },
    reducers: {
        setAlertMessage: (state, action) => {
            state.banner.message = action.payload.message
            state.banner.title = action.payload.title
            state.banner.variant = action.payload.variant ?? 'fail'
            state.banner.visible = true
        },
        toggleAlert: (state, action) => {
            state.banner.visible = action.payload.visible
        },
    },
})

// Selectors
const selectSelf = (state) => state[sliceName]
export const selectTheme = createSelector(selectSelf, (state) => state.theme)
export const selectAlertMessage = createSelector(selectSelf, (state) => state?.banner)
export const {
    setAlertMessage,
    toggleAlert,
} = appSlice.actions

export default appSlice.reducer
