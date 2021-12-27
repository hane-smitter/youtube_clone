import React, { useEffect, useState } from "react";

import "./_comments.scss";
import Comment from "./comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommentOfVideoById,
  addComment,
} from "../../redux/actions/comments.action";

const Comments = ({ video, videoId }) => {
  const dispatch = useDispatch();
  const [commentTxt, setCommentTxt] = useState("");
  const { comments, loading } = useSelector((state) => state.commentsList);
  const { photoURL, name } = useSelector((state) => state.auth?.user);
  const _comments = comments?.map(
    (comment) => comment?.snippet?.topLevelComment?.snippet
  );

  useEffect(() => {
    dispatch(getCommentOfVideoById(videoId));
  }, [dispatch, videoId]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (commentTxt.length < 1) return;
    dispatch(addComment(videoId, commentTxt));
    setCommentTxt("");
  };

  return (
    <div className="comments">
      <p>{video?.statistics?.commentCount} comments</p>
      <div className="comments__form d-flex w-100 my-2">
        <img src={photoURL} className="rounded-circle mr-3" alt={name} />
        <form onSubmit={handleSubmitComment} className="d-flex flex-grow-1">
          <input
            type="text"
            className="flex-grow-1"
            placeholder="Write a comment..."
            value={commentTxt}
            onChange={(e) => setCommentTxt(e.target.value)}
          />
          <button className="border-0 p-2">Comment</button>
        </form>
      </div>
      <div className="comments__list">
        {loading && <div className="spinner-box"> <div className="spinner-border text-danger"></div></div>}
        {_comments?.map((comment, index) => {
          return <Comment comment={comment} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Comments;
