import Image from 'next/image'
import React from 'react'
import { SectionHeading } from './Plans'

const Equipments = () => {
  return (
    <section className='bg-gray-100'>
    <section className='mx-auto max-w-[1140px]  py-[8rem] mb-[8rem]'>
        <SectionHeading>Equipments</SectionHeading>
        <div className='grid gap-2 md:gap-5 lg:grid-cols-2'>
            <div className='grid grid-cols-3 gap-2 md:gap-5'>
                <Image className='w-full row-start-1 col-span-3' src={'/images/equipments/equipment-1.jpg'} alt='Equipment One' width={200} height={150} />

                <Image className='w-full h-full object-cover' src={'/images/equipments/equipment-1.jpg'} alt='Equipment One' width={200} height={150} />
                <Image className='w-full h-full col-span-2 object-cover' src={'/images/equipments/equipment-1.jpg'} alt='Equipment One' width={200} height={150} />
                
            </div>
            <div className='grid grid-cols-3 gap-2 md:gap-5'>
                <Image className='w-full h-full col-span-2 object-cover' src={'/images/equipments/equipment-1.jpg'} alt='Equipment One' width={200} height={150} />
                <Image className='w-full h-full object-cover' src={'/images/equipments/equipment-1.jpg'} alt='Equipment One' width={200} height={150} />
                
                <div className='col-span-3 grid grid-cols-2 gap-2 md:gap-5'>
                    <Image className='w-full aspect-[1/1.3] object-cover' src={'/images/equipments/equipment-1.jpg'} alt='Equipment One' width={200} height={150} />
                    <Image className='w-full aspect-[1/1.3] object-cover' src={'/images/equipments/equipment-1.jpg'} alt='Equipment One' width={200} height={150} />
                </div>
            </div>
        </div>
    </section>
    </section>
  )
}

export default Equipments