import React from 'react'
import Button from './forms/Button'
import { create_icon } from '@/assets/icons/dashboard'

interface HeaderProps {
    title?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    button_text?: React.ReactNode | string
}

const PageHeader: React.FC<HeaderProps> = ({
    title = "This is Title",
    onClick,
    button_text

}) => {
    return (
        <header className='flex mb-9 justify-between items-center'>
            <h2 className='text-xl '>{title}</h2>
            <Button onClick={onClick}>{create_icon}{button_text}</Button>
        </header>
    )
}

export default PageHeader