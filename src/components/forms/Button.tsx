import React from 'react'
interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  children: React.ReactNode,
  className?: string
}

const Button = ({
    onClick,
    children,
    className
}:ButtonProps) => {
  return (
    <button onClick={onClick}  type="button" className={`text-white items-center justify-center cursor-pointer flex gap-1 bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-3 py-1.5 dark:bg-blue-400 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${className}`}>{children}</button>
  )
}

const CancelButton = ({
    onClick,
    children,
    className
}:ButtonProps)=>{
  return(
    <button onClick={onClick} className={`text-red-400 text-sm font-medium transition-all duration-300 ease-in-out hover:bg-red-100 rounded-sm px-4 ${className}`}>{children}</button>
  )
}
export {
  CancelButton
}

export default Button