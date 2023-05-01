import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'

function Index() {
    const {fileName} = useParams();
    return (
        <section className='flex flex-col h-screen'>
            <div className='h-auto'>
                <Navbar />
            </div>
            <div className='flex-grow  h-full grid place-items-center '>
                <img src={`http://localhost:3000/video/${fileName}`} width="500" height="480" className='rounded overflow-hidden'/>
                   
            </div>
        </section>
    )
}

export default Index