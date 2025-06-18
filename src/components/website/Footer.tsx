import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
   <footer className="bg-gray-900 text-white py-10 px-5">
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
        <li><Link href="/about" className="hover:text-white">About Us</Link></li>
        <li><Link href="/packages" className="hover:text-white">Gym Packages</Link></li>
        <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
      </ul>
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-4">Our Services</h3>
      <ul className="space-y-2 text-sm text-gray-300">
        <li><Link href="/workouts" className="hover:text-white">Workout Plans</Link></li>
        <li><Link href="/diet" className="hover:text-white">Diet Plans</Link></li>
        <li><Link href="/trainers" className="hover:text-white">Personal Training</Link></li>
        <li><Link href="/enquiry" className="hover:text-white">Book a Session</Link></li>
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
      <p className="text-sm text-gray-300">123 Fit Street, Jalna, MH</p>
      <p className="text-sm text-gray-300">Email: contact@trainzofitness.com</p>
      <p className="text-sm text-gray-300">Phone: +91 98765 43210</p>
      <div className="mt-4 flex space-x-4">
        <Link href="#" className="hover:text-blue-400">Facebook</Link>
        <Link href="#" className="hover:text-pink-400">Instagram</Link>
        <Link href="#" className="hover:text-sky-400">Twitter</Link>
      </div>
    </div>
  </div>

  <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
    © 2025 Trainzo Fitness. All rights reserved.
  </div>
</footer>
  )
}

export default Footer