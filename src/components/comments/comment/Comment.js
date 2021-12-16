import React from "react";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./_comment.scss";

const Comment = ({ comment = {} }) => {
  function createMarkup() {
    return { __html: textDisplay.trim() };
  }

  const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } =
    comment;
  return (
    <div className="comment p-2 d-flex">
      <LazyLoadImage
        src={authorProfileImageUrl ?? "/assets/images/avatar-1.jpg"}
        effect="blur"
        className="rounded-circle"
      />
      <div className="comment__body" style={{ marginInlineStart: 8 }}>
        <p className="comment__header">
          {authorDisplayName} • {moment(publishedAt).fromNow()}
        </p>
        <p className="mb-0" dangerouslySetInnerHTML={createMarkup()} />
      </div>
    </div>
  );
};

export default Comment;
