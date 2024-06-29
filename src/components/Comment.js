import React from 'react';
import { BiUser } from 'react-icons/bi';

const Comment = ({ comment }) => {
  const handleClick = () => {
    if (comment.link) {
      window.open(`https://sepolia.easscan.org/attestation/view/${comment.link}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className='flex shadow-md my-2 p-4 items-center border-l-2 gap-4 cursor-pointer hover:bg-gray-100 transition-colors'
      onClick={handleClick}
    >
      <BiUser className='p-2 border-2 rounded-full mx-2 w-10 h-10 text-gray-300'/>
      <span className='flex flex-col'>
        <h1 className='font-semibold'>{comment.name}</h1>
        <p>{comment.Comment}</p>
      </span>
    </div>
  );
};

export default Comment;

