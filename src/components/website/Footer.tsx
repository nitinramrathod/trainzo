import { phone_icon } from '@/assets/icons/website'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
   <footer className="bg-gray-900 relative text-white py-10 px-5">
    <div className='bg-slate-100/60 backdrop-blur-lg border-1 border-orange-500 flex items-center min-w-[340px] gap-3 md:min-w-[40%] ps-3 text-gray-800 absolute top-[-25px] right-[50%] translate-x-[50%] py-2 px-2 rounded-3xl mb-6 '>
     <span className='text-green-700 bg-green-200 p-[7px] rounded-full'>{phone_icon}</span> <input type="text" className='flex-1 focus:outline-none' /> <button className='bg-green-500 px-4 py-1 rounded-3xl text-amber-50'>Call<span className='hidden md:inline'> me back</span></button>
    </div>
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
    
    <div>
      <h2 className="text-xl font-bold mb-4">Trainzo Fitness</h2>
      <p className="text-sm text-gray-300">
        Transform your body and mind with expert trainers, personalized plans, and world-class facilities.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-2 text-sm text-gray-300">
        <li><Link href="/" className="hover:text-white">Home</Link></li>
        <li><Link href="#contact-us" className="hover:text-white">About Us</Link></li>
        <li><Link href="#plans" className="hover:text-white">Gym Packages</Link></li>
        <li><Link href="#contact-us" className="hover:text-white">Contact</Link></li>
      </ul>
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-4">Our Services</h3>
      <ul className="space-y-2 text-sm text-gray-300">
        <li><Link href="/" className="hover:text-white">Workout Plans</Link></li>
        <li><Link href="/" className="hover:text-white">Diet Plans</Link></li>
        <li><Link href="#trainers" className="hover:text-white">Personal Training</Link></li>
        <li><Link href="#contact-us" className="hover:text-white">Book a Session</Link></li>
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
      <p className="text-sm text-gray-300">Dawdigaon, Dombivli East, Thane MH</p>
      <p className="text-sm text-gray-300">Email: contact@trainzo.com</p>
      <p className="text-sm text-gray-300">Phone: +91 98765 43210</p>
      <div className="mt-4 flex space-x-4">
        <Link href="#" className="hover:text-blue-400">Facebook</Link>
        <Link href="#" className="hover:text-pink-400">Instagram</Link>
        <Link href="#" className="hover:text-sky-400">Twitter</Link>
      </div>
    </div>
  </div>

  <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
    © 2025 Trainzo Fitness. All rights reserved. Made with ❤️ by Protonity
  </div>
</footer>
  )
}

export default Footer