import React from 'react'

export const SectionHeading = ({children})=>{
 return   <h2 className='text-center text-gray-600 uppercase text-shadow-sm text-3xl mb-10 font-medium'>{children}</h2>
} 

const Plans = () => {
  return (
    <section className='my-[7rem]'>
        <SectionHeading>Our Gym Plans</SectionHeading>

    <div className='grid md:grid-cols-2 gap-6 max-w-[992px] mx-auto'>
        <div className='p-4 rounded-lg bg-white border-2 border-indigo-300 shadow-lg'>
            <h2 className='mb-3'>3 Month Plan</h2>
            <p className='text-3xl font-bold text-indigo-600'>1800/-</p>
            <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quo modi est labore magni ullam</p>
        </div>
        <div className='p-4 rounded-lg bg-white border-2 border-indigo-300 shadow-lg'>
            <h2 className='mb-3'>1 Month Plan</h2>
            <p className='text-3xl font-bold text-indigo-600'>700/-</p>
            <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quo modi est labore magni ullam</p>
        </div>
        <div className='p-4 rounded-lg bg-white border-2 border-indigo-300 shadow-lg'>
            <h2 className='mb-3'>6 Month Plan</h2>
            <p className='text-3xl font-bold text-indigo-600'>3600/-</p>
            <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quo modi est labore magni ullam</p>
        </div>
        <div className='p-4 rounded-lg bg-white border-2 border-indigo-300 shadow-lg'>
            <h2 className='mb-3'>12 Month Plan</h2>
            <p className='text-3xl font-bold text-indigo-600'>6500/-</p>
            <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quo modi est labore magni ullam</p>
        </div>
        
        
    </div>
    </section>
  )
}

export default Plans