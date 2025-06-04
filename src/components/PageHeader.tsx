"use client"

import React from 'react'
import Button from './forms/Button'
import { create_icon, left_icon } from '@/assets/icons/dashboard'

interface HeaderProps {
    title?: string,
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
    return (
        <header className='flex mb-9 justify-between items-center'>
            <h2 className='text-xl '>{title}</h2>
            <Button onClick={onClick}>{detail ? left_icon : create_icon} <span className='hidden md:block'>{button_text}</span></Button>
        </header>
    )
}

export default PageHeader