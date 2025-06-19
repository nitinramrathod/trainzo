// import Image from 'next/image'
import React from 'react'
import landingImage from '@/assets/images/landing-image.jpg'

const Landing = () => {
  return (
    <section className={`h-[100vh] bg-cover bg-center bg-fixed`}  style={{ backgroundImage: `url(${landingImage.src})` }}>
        <div className='pt-[33vh] text-center'>
            <p className='text-5xl text-yellow-50 font-bold mb-3'>Welcome to</p>
            <h1 ><strong className='text-indigo-400 text-7xl'>Trainzo fitness Zone</strong> </h1>
        </div>
    </section>
  )
}

export default Landing