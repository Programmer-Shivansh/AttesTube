import React from "react";
import Comment from "./Comment";

const Commentlist = ({ comments = [] }) => {
  return (
    <div className="flex flex-col space-y-4 p-2">
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <Comment key={index} comment={comment}  />
        ))
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}
    </div>
  );
};

export default Commentlist;
