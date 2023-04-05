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
                <video width="640" height="480" className='rounded overflow-hidden' controls autoPlay={true}>
                    <source src={`http://localhost:3000/video/${fileName}`} type="video/mp4" />

                    Your browser does not support the video tag.
                </video>
            </div>
        </section>
    )
}

export default Index