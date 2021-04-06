import React, {memo, useEffect} from 'react';
import {connect} from "react-redux";
import {GET_POST_REQUESTED} from "../redux/actions/charges-actions";
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";

const PostList = (props) => {



    const {posts, loading, getPosts} = props;
    useEffect(() => {
        getPosts()
        // eslint-disable-next-line
    }, []);
    return (
        <div>
            <h1 className="title">Posts</h1>
            {loading && 'Loading...'}

            <table className="table">
                <thead>
                <tr>
                    <th><abbr title="Position">Id</abbr></th>
                    <th>Title</th>
                    <th><abbr title="Played">Body</abbr></th>
                </tr>
                </thead>
                <tbody>
                {posts && posts.map((post, index) => (
                    <tr key={index}>
                        <th>{post.id}</th>
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
    posts: PropTypes.array,

}
// Get state to props
const mapStateToProps = (state) => ({
    posts: state.charges.posts,
    loading: state.charges.loading
})

// Get dispatch / function to props
const mapDispatchToProps = (dispatch) => ({
    getPosts: () => dispatch({type: GET_POST_REQUESTED}),
    //deleteTodo: (id) => dispatch({ type: DELETE_TODO_REQUESTED, payload: id })
})
export default memo(connect(mapStateToProps, mapDispatchToProps)(PostList));
