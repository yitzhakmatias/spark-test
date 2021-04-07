import React, {memo, useCallback, useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {GET_POST_REQUESTED} from "../redux/actions/charges-actions";
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";

const PostList = (props) => {

    const {posts, loading, getPosts} = props;
    const [postList, setPostList] = useState([]);
    const dispatch = useDispatch();

    const callPosts = useCallback(
        () =>
            dispatch({
                type: GET_POST_REQUESTED
            }),
        [dispatch],
    )

    useEffect(() => {
        if (posts.length === 0){
            const getPosts = () => callPosts();
            getPosts()
        }

    }, [getPosts, posts.length, callPosts]);
    useEffect(() => {
        setPostList(posts)
    }, [posts]);
    return (
        <div>
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
        </div>
    );
};

PostList.propTypes = {
    loading: PropTypes.bool,
    posts: PropTypes.array

}
// Get state to props
const mapStateToProps = (state) => ({
    posts: state.charges.posts,
    loading: state.charges.loading
})

export default memo(connect(mapStateToProps)(PostList));
