import {
    put,
    call,
    takeLatest,
    takeEvery
} from 'redux-saga/effects'

// Import all actions and api's
import {
    SET_LOADING,
    GET_COMMENTS,
    GET_POST_REQUESTED,
    SET_TODO_TITLE,
    SET_TODO_TITLE_REQUESTED,
    CLEAR_TODO_TITLE,
    CREATE_COMMENT,
    CREATE_COMMENT_REQUESTED,
    GET_POSTS, GET_COMMENT_REQUESTED
} from '../actions/charges-actions'

// Import all api's
import {
    getAllPosts,
    createNewComment,
    getAllComments
} from '../api/charges-api'

// Here's the unique part, generator function*, function with asterisk(*)

// Get Todos
function* getPosts() {
    yield put({ type: SET_LOADING })

    const posts = yield call(getAllPosts)

yield put({ type: GET_POSTS, payload: posts })
}
function* getComments({ payload }) {
    yield put({ type: SET_LOADING })

    const comments = yield call(getAllComments, payload)

    yield put({ type: GET_COMMENTS, payload: comments })
}
// Set the title of todo
function* setTodoTitle({ payload }) {
    yield put({ type: SET_TODO_TITLE, payload })
}

// Create Todo
function* createComment({ payload }) {
    yield put({ type: SET_LOADING })

    const newComment = yield call(createNewComment, payload)

    yield put({ type: CREATE_COMMENT, payload: newComment })

    // Clear todo after creating
    yield put({ type: CLEAR_TODO_TITLE })
}



// Export the saga (todo-saga)
export default function* todoSaga() {
    yield takeEvery(GET_POST_REQUESTED, getPosts)
    yield takeEvery(GET_COMMENT_REQUESTED, getComments)
    yield takeEvery(SET_TODO_TITLE_REQUESTED, setTodoTitle)
    yield takeLatest(CREATE_COMMENT_REQUESTED, createComment)
}
