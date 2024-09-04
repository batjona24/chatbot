import { combineReducers, configureStore } from '@reduxjs/toolkit'
import appReducer from './slices/app'
import userReducer from './slices/user'

const combinedReducer = combineReducers({
    app: appReducer,
    user: userReducer,
})

const rootReducer = (state, action) => {
    if (
        action.type === 'user/logout/fulfilled' ||
        action.type === 'profile/delete/fulfilled'
    ) {
        // check for action type
        state = undefined
    }
    return combinedReducer(state, action)
}

const store = configureStore({
    reducer: rootReducer,
})

export default store
