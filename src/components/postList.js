import React, {memo, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GET_POST_REQUESTED} from '../redux/actions/post-comments-actions';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const PostList = () => {

  const [postList, setPostList] = useState([]);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.charges.posts);
  const loading = useSelector((state) => state.charges.loading);
  const callPosts = useCallback(
      () =>
        dispatch({
          type: GET_POST_REQUESTED,
        }),
      [dispatch],
  );

  useEffect(() => {
    if (posts.length === 0) {
      const getPosts = () => callPosts();
      getPosts();
    }
  }, [posts.length, callPosts]);
  useEffect(() => {
    setPostList(posts);
  }, [posts]);
  return (
    <div>

      <section className="section">

        <h1 className="title">Posts</h1>
        {loading && 'Loading...'}

        <table className="table">
          <thead>
          <tr>

            <th>Title</th>
            <th><abbr title="Played">Body</abbr></th>
          </tr>
          </thead>
          <tbody>
          {postList && postList.map((post, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/comments/${post.id}`}>{post.title}</Link>
                </td>
                <td>{post.body}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </section>

    </div>
  );
};

PostList.propTypes = {
  loading: PropTypes.bool,
  posts: PropTypes.array,

};
export default memo((PostList));
