import React from 'react'
interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  children: React.ReactNode
}

const Button = ({
    onClick,
    children
}:ButtonProps) => {
  return (
    <button onClick={onClick} type="button" className="text-white cursor-pointer flex gap-1 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-2 py-1.5 dark:bg-blue-400 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{children}</button>
  )
}

export default Button