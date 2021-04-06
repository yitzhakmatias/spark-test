import { combineReducers } from 'redux'

// Reducers
import charges from './charges-reducers'

export default combineReducers({
    charges,
    // Here you can registering another reducers.
})
