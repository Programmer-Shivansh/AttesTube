import React, { useState } from "react";
import Commentlist from "./Commentlist";
import { IoIosArrowDropup, IoIosArrowDropdown } from "react-icons/io";

const CommentsContainer = ({ comments }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="w-full gap-4 h-96">
      <span className="flex items-center gap-2 text-xl">
        <h1 className="font-semibold text-md my-2">Comments</h1>
        {isVisible ? (
          <IoIosArrowDropdown onClick={() => setIsVisible(false)} />
        ) : (
          <IoIosArrowDropup onClick={() => setIsVisible(true)} />
        )}
      </span>
      {isVisible && <Commentlist comments={comments} />}
    </div>
  );
};

export default CommentsContainer;
