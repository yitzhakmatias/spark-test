import {
    SET_LOADING,
    GET_COMMENTS,
    CREATE_COMMENT,
    GET_POSTS
} from '../actions/post-comments-actions';
import reducer from './post-comments-reducers';

describe('post comments reducer', () => {
    test('SET_LOADING', () => {
        const action = { type: SET_LOADING };
        expect(reducer(undefined, action)).toMatchSnapshot();
    });
    test('GET_POSTS', () => {
        const action = { type: GET_POSTS };
        expect(reducer(undefined, action)).toMatchSnapshot();
    });
    test('GET_COMMENTS', () => {
        const action = { type: GET_COMMENTS };
        expect(reducer(undefined, action)).toMatchSnapshot();
    });
    test('CREATE_COMMENT', () => {
        const action = {
            type: CREATE_COMMENT,
            payload: {
                postId: 2,
                name: 'Czechmademan',
                body: 'testsetsetset'
                 },
        };
        expect(reducer(undefined, action)).toMatchSnapshot();
    });


});
