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
    disabled?: boolean
    optional?: boolean
}

const Input:React.FC<InputProps> = ({
    name= 'name',
    placeholder="Placeholder",
    value="",
    type="text",
    onChange,
    label = "Enter Name",
    error,
    noLabel = false,
    disabled = false,
    optional = false

}) => {
  return (
    <div className={`${noLabel ?'':'mb-5'} w-full min-w-[170px]`}>
    {!noLabel && (
      
        <label htmlFor={`${name}-input-id`} className="flex items-center gap-1 mb-2 text-sm font-medium text-gray-900 dark:text-white">{label} {optional && (<span className='text-indigo-600 text-xs'>(optional)</span>)}</label>
        
    
    )}
    <input min='0' disabled={disabled} name={name} onChange={onChange} type={type} id={`${name}-input-id`} value={value} placeholder={placeholder} className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-md  focus:border-blue-500 block w-full py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
     {error && <p className='text-red-400 text-[13px]'>{error}</p>}
  </div>
  )
}

export default Input