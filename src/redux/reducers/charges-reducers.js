import {
    SET_LOADING,
    GET_COMMENTS,
    SET_TODO_TITLE,
    CREATE_COMMENT,
    DELETE_TODO,
    CLEAR_TODO_TITLE
} from '../actions/charges-actions.js'
import {GET_POSTS} from "../actions/charges-actions";

// Define your state here
const initialState = {
    loading: false,
    posts: [],
    comments: [],
    title: ''
}

// This export default will control your state for your application
const postsReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        // Set loading
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        // Get todos
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case GET_COMMENTS:
            return {
                ...state,
                comments: payload,
                loading: false
            }
        // Set todo title from user that gonna input a title in form
        case SET_TODO_TITLE:
            return {
                ...state,
                title: payload
            }
        // Create new todo
        case CREATE_COMMENT:
            return {
                ...state,
                comments: [payload, ...state.comments],
                loading: false
            }
        // Clear todo title in form after creating a new one
        case CLEAR_TODO_TITLE:
            return {
                ...state,
                title: ''
            }

        // Return default state if you didn't match any case
        default:
            return state
    }
}
export default postsReducer;
