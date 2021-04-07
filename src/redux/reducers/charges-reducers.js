import {
    SET_LOADING,
    GET_COMMENTS,
    SET_TODO_TITLE,
    CREATE_COMMENT,
    GET_POSTS

} from '../actions/charges-actions.js'

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
        // Get posts
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

        case SET_TODO_TITLE:
            return {
                ...state,
                title: payload
            }
        // Create new comment
        case CREATE_COMMENT:
            return {
                ...state,
                comments: [payload, ...state.comments],
                loading: false
            }


        default:
            return state
    }
}
export default postsReducer;
