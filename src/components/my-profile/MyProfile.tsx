'use client'
import React, { useState } from 'react';
import FormWrapper from '../forms/FormWrapper';
import Input from '../forms/Input';
import Textarea from '../forms/Textarea';
import Button from '../forms/Button';
import { save_icon } from '@/assets/icons/dashboard';
import Image from 'next/image';

interface UserProfile {
  name: string;
  email: string;
  mobile: string;
  address: string;
  profileImage: string;
  bannerImage: string;
}

const MyProfile: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    name: '',
    email: '',
    mobile: '',
    address: '',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', // URL or base64
    bannerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', // URL or base64
  });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   setUser(prev => ({ ...prev, [name]: value }));
  // };

  // const handleSave = () => {
  //   console.log('Saved Data:', user);
  //   // TODO: Save logic
  // };

  return (
      <FormWrapper>
    <div className=" px-4 py-6">
      {/* Banner Image */}
      <div className="relative">
        <div className='h-40 w-full overflow-hidden rounded-lg'>

        {user.bannerImage && (
          <Image
          width={100}
          height={100}
          src={user.bannerImage}
          alt="Banner"
          className="object-cover w-full h-full"
          />
        )}
        </div>
        {/* Profile Image */}
        <div className="absolute -bottom-11 left-4">
          <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white bg-gray-100">
            {user.profileImage ? (
              <Image
          width={100}
          height={100}
                src={user.profileImage}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Upload
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className='flex gap-3 flex-col md:flex-row'>

      <div className="mt-16 bg-white flex-3 p-4 space-y-4">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5'>

        <Input 
        label='Name'
        placeholder='Enter your name'
        />
        <Input 
        label='Mobile'
        placeholder='Enter your mobile'
        />
        <Input 
        label='Email'
        placeholder='Enter your email'
        />
        <Input 
        label='Role'
        placeholder='Enter your name'
        />
        <Input 
        label='Gym Plan'
        placeholder='Enter your Gym Plan'
        />
        <Input 
        label='Workout Plan'
        placeholder='Enter your name'
        />
        
        </div>
        <Textarea 
        label='Address'
        placeholder='Enter your address'
        />

       

        <div className="flex justify-end">
          <Button>{save_icon}Update</Button>
        </div>
      </div>
      <div className='bg-indigo-400 max-h-[400px] shadow rounded-lg p-5 pe-3 mt-16 flex-1'>
          <h2 className='text-white text-xl font-bold mb-4'>Activity</h2>
        <div className='flex flex-col pe-2 gap-2 max-h-[315px] overflow-y-auto'>

            <div className='bg-amber-100 px-2 py-1 rounded-sm'>
              <h3 className='text-slate-800'>Last logged in to system</h3>
              <p className='text-xs text-slate-600'>10 Oct 2025 Wed, 05:00 pm</p>
            </div>
            <div className='bg-amber-100 px-2 py-1 rounded-sm'>
              <h3 className='text-slate-800'>Last logged in to system</h3>
              <p className='text-xs text-slate-600'>10 Oct 2025 Wed, 05:00 pm</p>
            </div>
            <div className='bg-amber-100 px-2 py-1 rounded-sm'>
              <h3 className='text-slate-800'>Last logged in to system</h3>
              <p className='text-xs text-slate-600'>10 Oct 2025 Wed, 05:00 pm</p>
            </div>
            <div className='bg-amber-100 px-2 py-1 rounded-sm'>
              <h3 className='text-slate-800'>Last logged in to system</h3>
              <p className='text-xs text-slate-600'>10 Oct 2025 Wed, 05:00 pm</p>
            </div>
            <div className='bg-amber-100 px-2 py-1 rounded-sm'>
              <h3 className='text-slate-800'>Last logged in to system</h3>
              <p className='text-xs text-slate-600'>10 Oct 2025 Wed, 05:00 pm</p>
            </div>
            <div className='bg-amber-100 px-2 py-1 rounded-sm'>
              <h3 className='text-slate-800'>Last logged in to system</h3>
              <p className='text-xs text-slate-600'>10 Oct 2025 Wed, 05:00 pm</p>
            </div>
            <div className='bg-amber-100 px-2 py-1 rounded-sm'>
              <h3 className='text-slate-800'>Last logged in to system</h3>
              <p className='text-xs text-slate-600'>10 Oct 2025 Wed, 05:00 pm</p>
            </div>
            <div className='bg-amber-100 px-2 py-1 rounded-sm'>
              <h3 className='text-slate-800'>Last logged in to system</h3>
              <p className='text-xs text-slate-600'>10 Oct 2025 Wed, 05:00 pm</p>
            </div>
            <div className='bg-amber-100 px-2 py-1 rounded-sm'>
              <h3 className='text-slate-800'>Last logged in to system</h3>
              <p className='text-xs text-slate-600'>10 Oct 2025 Wed, 05:00 pm</p>
            </div>

        </div>

      </div>
      </div>
    </div>
    </FormWrapper>
  );
};

export default MyProfile;
