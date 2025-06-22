import React from 'react';
import { SectionHeading } from './Plans';
import Image from 'next/image';
import image from "@/assets/images/gym-trainer-1.png";

const Testimonials = () => {
  return (
    <section id='testimonials' className='bg-gray-200 px-4 md:px-14'>
    <div className='mx-auto py-[7rem] mb-[6rem] max-w-[1140px]'>
      <SectionHeading>Testimonials</SectionHeading>

      <div className='flex justify-center'>
        <div className='flex flex-col justify-center items-center max-w-[500px]'>
           <Image src={image} className='w-[160px] rounded-full border-3 border-orange-400 aspect-[1] object-cover' alt="Coach Image"></Image>
           <p className='text-gray-900 text-2xl font-medium mb-4 mt-4'>Sandesh Jadhav</p>
           <p className='text-gray-700 text-center'> &quot; Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam 
            nulla earum doloribus saepe modi nihil, necessitatibus libero repellendus non 
            corporis facilis soluta excepturi dolor, quasi tempore quas perspiciatis sapiente vitae.
            &quot;
            </p>
        </div>
      </div>
    </div>
    </section>
  )
}

export default Testimonials