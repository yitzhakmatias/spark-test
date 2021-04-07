import React, {memo, useCallback, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import PropTypes from "prop-types";
import {CREATE_COMMENT_REQUESTED, GET_COMMENT_REQUESTED} from "../redux/actions/charges-actions";
import {connect, useDispatch} from "react-redux";


const CommentList = (props) => {
    const {id} = useParams();
    const {comments, loading, getComments, createComment} = props;
    const [commentList, setCommentList] = useState([]);
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [body, setBody] = useState();
    const dispatch = useDispatch();
    const callComments = useCallback(
        () =>
            dispatch({type: GET_COMMENT_REQUESTED, payload: id}),
        [dispatch, id],
    )

    useEffect(() => {
        const getComments =()=>callComments()
        getComments(id)
    }, [getComments, id,callComments]);
    useEffect(() => {

        setCommentList(comments)
    }, [comments]);
    const handleSubmit = (e) => {
        e.preventDefault();
        // ???
        let newElement={
            postId: id,
            id: Math.floor(Math.random() * 100),
            name:  name,
            email: email,
            body: body
        }
       // const createComment =()=>callComments()
        createComment(newElement);
        setCommentList( [...comments, newElement])

    }
    const form = () => {
        return (
            <>
                <form onSubmit={e => {
                    handleSubmit(e)
                }} className="">


                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="e.g Alex Smith"
                                   value={name}
                                   onChange={e => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email :</label>
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="email" placeholder="Email"
                                   value={email}
                                   onChange={e => setEmail(e.target.value)} />
                            <span className="icon is-small is-left">
                            <i className="fas fa-envelope"/>
                            </span>
                            <span className="icon is-small is-right">
                            <i className="fas fa-check"/>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <label className="label">Body :</label>
                        <div className="control">
                            <textarea className="textarea" placeholder="Textarea"
                                      onChange={e => setBody(e.target.value)} value={body}/>
                        </div>
                    </div>
                    <br/>
                    <div className="control">
                        <button className="button is-primary">Submit</button>
                    </div>

                </form>
            </>
        );
    }
    return (
        <div>
            <h1 className="title">Add Comment</h1>
            {form()}
            {loading && 'Loading...'}
            <br/>
            <h1 className="title">Comments</h1>
            <Link to={`/`}>Back to Post List</Link>
            <table className="table">
                <thead>
                <tr>

                    <th>Title</th>
                    <th>Email</th>
                    <th><abbr title="Played">Body</abbr></th>
                </tr>
                </thead>
                <tbody>
                {commentList && commentList.map((post, index) => (
                    <tr key={index}>

                        <td>
                           {post.name}
                        </td>
                        <td>{post.email}</td>
                        <td>{post.body}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
};
CommentList.propTypes = {
    loading: PropTypes.bool,
    comments: PropTypes.array,

}
// Get state to props
const mapStateToProps = (state) => ({
    comments: state.charges.comments,
    loading: state.charges.loading
})

// Get dispatch / function to props
const mapDispatchToProps = (dispatch) => ({

    createComment: (comment) => dispatch({type: CREATE_COMMENT_REQUESTED, payload: comment})

})
export default memo(connect(mapStateToProps, mapDispatchToProps)(CommentList));
