import React from 'react';

const ChatResponse = ({ response }) => {
  // Assuming the response is an Axios response object containing text data
  const responseData = response && response.data;

  return (
    <div className='mt-6'>
      {/* Render the response data */}
      <p className='text-md font-semibold whitespace-pre-wrap overflow-y-scroll'>
        {responseData}
      </p>
    </div>
  );
};

export default ChatResponse;
