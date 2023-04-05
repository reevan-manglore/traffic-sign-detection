import React from 'react'
import {AiFillFile} from "react-icons/ai";

function FileInfo({fileName}) {
  return (
    <div className='flex flex-col space-y-4 my-2 justify-center items-center'>
        <AiFillFile className='text-8xl'/>
        <p className='text-center text-lg'> {fileName}</p>
    </div>
  )
}

export default FileInfo