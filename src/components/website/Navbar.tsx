import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className=' backdrop-blur-[20px] backdrop-saturate-150 backdrop-invert-[.1] border-1 backdrop-blend-multiply border-indigo-100/30 bg-white/10  fixed p-5 md:w-[70%] left-[50%] translate-x-[-50%] rounded-[40px] items-center flex justify-between mt-4 px-10'>
        <h2 className='text-xl font-bold text-indigo-800'>Trainzo</h2>
        <menu>
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
    </nav>
  )
}

export default Navbar