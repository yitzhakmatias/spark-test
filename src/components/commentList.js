import React, {memo, useCallback, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import {CREATE_COMMENT_REQUESTED, GET_COMMENT_REQUESTED} from '../redux/actions/post-comments-actions';
import {useDispatch, useSelector} from 'react-redux';


const CommentList = () => {
  const {id} = useParams();
  const [commentList, setCommentList] = useState([]);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [body, setBody] = useState();
  const dispatch = useDispatch();
  const commentLst = useSelector((state) => state.charges.comments);
  const loading = useSelector((state) => state.charges.loading);
  const callComments = useCallback(
      () =>
        dispatch({type: GET_COMMENT_REQUESTED, payload: id}),
      [dispatch, id],
  );


  useEffect(() => {
    const getComments = () => callComments();
    getComments(id);
  }, [id, callComments]);
  useEffect(() => {
    setCommentList(commentLst);
  }, [commentLst]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const newElement = {
      postId: id,
      id: Math.floor(Math.random() * 100),
      name: name,
      email: email,
      body: body,
    };
    dispatch({type: CREATE_COMMENT_REQUESTED, payload: newElement});
    setCommentList([...commentLst, newElement]);
  };
  const Form = () => {
    return (
      <>
        <form onSubmit={(e) => {
          handleSubmit(e);
        }} className="">


          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="e.g Alex Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}/>
            </div>
          </div>
          <div className="field">
            <label className="label">Email :</label>
            <p className="control">
              <input className="input" type="email" placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </p>
          </div>
          <div className="field">
            <label className="label">Body :</label>
            <div className="control">
              <textarea className="textarea" placeholder="Textarea"
                onChange={(e) => setBody(e.target.value)} value={body}/>
            </div>
          </div>
          <br/>
          <div className="control">
            <button className="button is-primary">Submit</button>
          </div>

        </form>
      </>
    );
  };
  return (
    <div>
      <section className="section">
        <h1 className="title">Add Comment</h1>
        <Form/>
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
          {commentList && !loading && commentList.map((post, index) => (
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
      </section>


    </div>
  );
};
CommentList.propTypes = {
  loading: PropTypes.bool,
  comments: PropTypes.array,

};

export default memo((CommentList));
