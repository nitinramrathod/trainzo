"use client"

import React from 'react'
import Button from './forms/Button'
import { create_icon, left_icon } from '@/assets/icons/dashboard'

type TableProps = {
    title: string,
    value: string
}
interface HeaderProps {
    title?: string | TableProps[],
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    button_text?: React.ReactNode | string,
    detail?: boolean
}

const PageHeader: React.FC<HeaderProps> = ({
    title = "This is Title",
    onClick,
    button_text,
    detail = false

}) => {

    const [isOpen, setIsOpen] = React.useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className='flex mb-5 justify-between items-center'>
            {typeof title == 'string' ? <h2 className='text-xl '>{title}</h2> : (
                <div className='p-2 relative w-2xl'>
                    <h2 onClick={toggleDropdown} className='flex w-fit items-center gap-3 text-xl'>{title[0].title} <span className={`transition-all duration-200 p-1 border-t-2 border-l-2 border-indigo-500 ${isOpen ? 'rotate-50' : 'rotate-220'}`}></span></h2>
                    <div className={`flex flex-col top-[100% + 20px] absolute z-30 bg-white rounded-md overflow-hidden shadow-xl ${isOpen ? 'block' : 'hidden'}`}>
                        {title.map((item, index) => (
                            <span key={index} className='transition-all duration-200 cursor-pointer text-gray-600 py-2 px-4 hover:bg-indigo-500 hover:text-white'>{item.title}</span>
                        ))}
                    </div>
                </div>
            )}
           {button_text &&<Button onClick={onClick}>{detail ? left_icon : create_icon} <span className='hidden md:block'>{button_text}</span></Button>}
        </header>
    )
}

export default PageHeader