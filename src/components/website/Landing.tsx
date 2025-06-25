"use client"

// import Image from 'next/image'
import React from 'react'
import landingImage from '@/assets/images/landing-image-1.png'


const Landing = () => {

   

  return (
    <section className={`px-2 h-[100vh] bg-cover bg-center bg-fixed`}  style={{ backgroundImage: `url(${landingImage.src})` }}>
        <div className='pt-[33vh] text-center'>
            <p className='text-4xl md:text-5xl text-yellow-50 font-bold mb-3'>Welcome to</p>
            <h1 ><strong className='text-indigo-400 text-6xl md:text-7xl'>Trainzo fitness Zone</strong> </h1>
            <div className='flex flex-col md:flex-row items-center justify-center gap-8 mt-14'>
              <button className='transition-all duration-300 border-2 px-8 py-2 rounded-lg text-white font-medium text-lg w-[200px] hover:border-indigo-600 hover:bg-indigo-600'>Join Us</button>
              <button className='transition-all duration-300 border-2 border-indigo-600 px-8 py-2 bg-indigo-600 rounded-lg w-[200px] text-white font-medium text-lg hover:bg-transparent hover:border-white'>Send Message</button>
              
            </div>
        </div>
    </section>
  )
}

export default Landing