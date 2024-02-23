 import React from 'react'
 
 const ChatResponse = ({response}) => {
    const res = response.data;
   return (
     <div className='mt-6'>
        <p className='text-md font-semibold whitespace-pre-wrap'>{res}</p>
     </div>
   )
 }
 
 export default ChatResponse