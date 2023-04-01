import React from 'react'
import {AiOutlineExclamationCircle} from "react-icons/ai";
import { IconContext } from "react-icons";


function NoPageFound() {
  return (
    <section className='h-screen w-full bg-red-300 grid place-items-center'>
      <div className='grid place-items-center'>
           <IconContext.Provider value = {{size: "8rem"}}>
               <AiOutlineExclamationCircle  />
            </IconContext.Provider>
            <p className='text-center text-6xl font-medium  mt-5'>Sorry No Page Found</p>

      </div>
    </section>
  )
}



export default NoPageFound