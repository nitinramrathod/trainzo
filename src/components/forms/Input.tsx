import React from 'react'

interface InputProps {
    label?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
    value?: string | number ,
    name?: string,
    type?: string,
    error?: string
    noLabel?: boolean
}

const Input:React.FC<InputProps> = ({
    name= 'name',
    placeholder="Placeholder",
    value="",
    type="text",
    onChange,
    label = "Enter Name",
    error,
    noLabel = false

}) => {
  return (
    <div className={`${noLabel ?'':'mb-5'}`}>
    {!noLabel && <label htmlFor={`${name}-input-id`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
    <input  name={name} onChange={onChange} type={type} id={`${name}-input-id`} value={value} placeholder={placeholder}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
     {error && <p className='text-red-400 text-[13px]'>{error}</p>}
  </div>
  )
}

export default Input