// @flow
import * as actions from './post-comments-api.js';

describe('user actions', () => {
    test('getAllComments', () => {
        expect(actions.getAllComments()).toMatchSnapshot();
    });

    test('getAllPosts', () => {
        expect(actions.getAllPosts()).toMatchSnapshot();
    });


    test('createNewComment', () => {
        const payload = {
            postId: 2,
            name: 'Czechmademan',
            body: 'testsetsetset'
        }
        expect(actions.createNewComment(payload)).toMatchSnapshot();
    });

});
