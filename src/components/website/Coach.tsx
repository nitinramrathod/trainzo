import React from 'react'
import image from "@/assets/images/gym-trainer-1.png";
import Image from 'next/image';
import { SectionHeading } from './Plans';

const Coach = () => {
  return (
    <section className='mx-auto max-w-[1140px] mb-[8rem]'>
        <SectionHeading>Our Special Coach for you.</SectionHeading>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div>
                <p className='text-2xl'>We are trained by word class coaches here and we have special coaches for you.</p>
                <button className='mt-7 bg-orange-500 px-5 py-2 rounded-md text-white'>All Coach</button>
            </div>
            <div className='overflow-hidden relative bg-amber-50 w-full rounded-lg shadow-md'>
                <Image src={image} className='w-full aspect-[2/1.3] object-cover' alt="Coach Image"></Image>
                <h3 className='absolute bottom-3 left-4 font-bold text-2xl text-white'>Naresh Sarnobat</h3>
            </div>
            <div className=' overflow-hidden relative bg-amber-50 w-full rounded-lg shadow-md'>
                <Image src={image} className='w-full aspect-[2/1.3] object-cover' alt="Coach Image"></Image>
                <h3 className='absolute bottom-3 left-4 font-bold text-2xl text-white'>Naresh Sarnobat</h3>
            </div>
            <div className=' overflow-hidden relative bg-amber-50 w-full rounded-lg shadow-md'>
                <Image src={image} className='w-full aspect-[2/1.3] object-cover' alt="Coach Image"></Image>
                <h3 className='absolute bottom-3 left-4 font-bold text-2xl text-white'>Naresh Sarnobat</h3>
            </div>
            <div className=' overflow-hidden relative bg-amber-50 w-full rounded-lg shadow-md'>
                <Image src={image} className='w-full aspect-[2/1.3] object-cover' alt="Coach Image"></Image>
                <h3 className='absolute bottom-3 left-4 font-bold text-2xl text-white'>Naresh Sarnobat</h3>
            </div>
            <div className=' overflow-hidden relative bg-amber-50 w-full rounded-lg shadow-md'>
                <Image src={image} className='w-full aspect-[2/1.3] object-cover' alt="Coach Image"></Image>
                <h3 className='absolute bottom-3 left-4 font-bold text-2xl text-white'>Naresh Sarnobat</h3>
            </div>
        </div>

    </section>
  )
}

export default Coach