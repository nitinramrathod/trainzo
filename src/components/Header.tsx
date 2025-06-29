'use client'
import { left_panel_close, left_panel_open } from '@/assets/icons/dashboard';
import { useSidebar } from '@/utils/context/SidebarContext';
import Image from 'next/image'
import React from 'react'

const Header = () => {
    const { toggleSidebar, collapsed} = useSidebar();
    return (<nav className="bg-white dark:bg-gray-800">
        <div className="mx-auto px-2 sm:pe-6 lg:pe-8">
            <div className="relative flex h-11 items-center justify-between">
                <button onClick={toggleSidebar} className='bg-indigo-200 p-1 rounded-sm text-indigo-800 text-2xl hover:bg-indigo-300 transition-all duration-300 ease cursor-pointer'>{collapsed ? left_panel_open : left_panel_close}</button>

                <div className="inset-y-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button type="button" className="relative rounded-full bg-indigo-100 p-1 text-indigo-700 hover:bg-indigo-200 hover:text-indigo-900 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                        <span className="absolute -inset-1.5"></span>
                        <span className="sr-only">View notifications</span>
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                        </svg>
                    </button>

                    <div className="relative ml-3">
                        <div>
                            <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">Open user menu</span>
                                <Image width={'100'} height={"100"} className="size-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    )
}

export default Header