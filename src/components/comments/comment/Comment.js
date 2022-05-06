import React from "react";
import moment from "moment";
import Filter from "bad-words";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./_comment.scss";

const Comment = ({ comment = {} }) => {
  const filter = new Filter();
  const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } =
    comment;
  const commentAuthor = filter.clean(authorDisplayName || "placeholder");
  const commentOutput = filter.clean(textDisplay || "placeholder");

  function createMarkup() {
    return { __html: filter.clean(commentOutput.trim()) };
  }

  return (
    <div className="comment p-2 d-flex">
      <LazyLoadImage
        src={authorProfileImageUrl ?? "/assets/images/avatar-1.jpg"}
        effect="blur"
        className="rounded-circle"
      />
      <div className="comment__body" style={{ marginInlineStart: 8 }}>
        <p className="comment__header">
          {commentAuthor} • {moment(publishedAt).fromNow()}
        </p>
        <p className="mb-0" dangerouslySetInnerHTML={createMarkup()} />
      </div>
    </div>
  );
};

export default Comment;
