import {
  put,
  call,
  takeLatest,
  takeEvery,
} from 'redux-saga/effects';

// Import all actions and api's
import {
  SET_LOADING,
  GET_COMMENTS,
  GET_POST_REQUESTED,
  CREATE_COMMENT,
  CREATE_COMMENT_REQUESTED,
  GET_POSTS, GET_COMMENT_REQUESTED,
} from '../actions/post-comments-actions';

// Import all api's
import {
  getAllPosts,
  createNewComment,
  getAllComments,
} from '../api/post-comments-api';

// Here's the unique part, generator function*, function with asterisk(*)

// getPosts
function* getPosts() {
  yield put({type: SET_LOADING});

  const posts = yield call(getAllPosts);

  yield put({type: GET_POSTS, payload: posts});
}

function* getComments({payload}) {
  yield put({type: SET_LOADING});

  const comments = yield call(getAllComments, payload);

  yield put({type: GET_COMMENTS, payload: comments});
}

// createComment
function* createComment({payload}) {
  yield put({type: SET_LOADING});

  const newComment = yield call(createNewComment, payload);

  yield put({type: CREATE_COMMENT, payload: newComment});
}


export default function* todoSaga() {
  yield takeEvery(GET_POST_REQUESTED, getPosts);
  yield takeEvery(GET_COMMENT_REQUESTED, getComments);
  yield takeLatest(CREATE_COMMENT_REQUESTED, createComment);
}
