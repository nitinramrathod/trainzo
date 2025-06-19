"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Navbar = () => {
    const [navVisible, setNavVisible] = useState<boolean>(false)
  return (
    <>
    <nav className=' min-w-[80%] z-40 xl:min-w-[992px] max-w-[992px] backdrop-blur-[20px] backdrop-saturate-150 backdrop-invert-[.1] border-1 border-indigo-100/30 bg-white/10 fixed p-5 md:w-[70%] left-[50%] translate-x-[-50%] rounded-[40px] items-center flex justify-between mt-4 px-10'>
        <h2 className='text-xl font-bold text-indigo-800'>Trainzo</h2>
        <menu className={`hidden lg:block`}>
            <ul className='flex gap-5'>
                <li>
                    <Link className='text-white font-medium ' href={'#'}>Home</Link>
                </li>
                <li>
                    <Link className='text-slate-100 font-medium' href={'#'}>Equipment</Link>
                </li>
                <li>
                    <Link className='text-slate-100 font-medium' href={'#'}>Plans</Link>
                </li>
                <li>
                    <Link className='text-slate-100 font-medium' href={'#'}>Testimonials</Link>
                </li>
                <li>
                    <Link className='text-slate-100 font-medium' href={'#'}>Contact Us</Link>
                </li>
                <li>
                    <Link className='text-slate-100 font-medium' href={'/dashboard'}>Dashboard</Link>
                </li>
                <li>
                    <Link className='text-slate-100 font-medium' href={'/login'}>Login</Link>
                </li>
            </ul>
        </menu>
        {!navVisible ?
        <button className='lg:hidden' onClick={()=>setNavVisible(true)}>Show</button> :
        <button className='lg:hidden' onClick={()=>setNavVisible(false)}>Hide</button> 
    }
    </nav>

    <menu className={`bg-indigo-400 p-5 flex fixed pt-[8rem] h-[100vh] w-[100vw] left-0 top-0 transition-all duration-100 ease-in ${navVisible ? 'translate-x-0':'translate-x-[-100%]'}`}>
            <ul className='flex flex-col gap-5'>
                <li>
                    <Link className='text-white text-2xl ' href={'#'}>Home</Link>
                </li>
                <li>
                    <Link className='text-slate-100 text-2xl font-medium' href={'#'}>Equipment</Link>
                </li>
                <li>
                    <Link className='text-slate-100 text-2xl font-medium' href={'#'}>Plans</Link>
                </li>
                <li>
                    <Link className='text-slate-100 text-2xl font-medium' href={'#'}>Testimonials</Link>
                </li>
                <li>
                    <Link className='text-slate-100 text-2xl font-medium' href={'#'}>Contact Us</Link>
                </li>
                <li>
                    <Link className='text-slate-100 text-2xl font-medium' href={'/dashboard'}>Dashboard</Link>
                </li>
                <li>
                    <Link className='text-slate-100 text-2xl font-medium' href={'/login'}>Login</Link>
                </li>
            </ul>
        </menu>
    </>
  )
}

export default Navbar