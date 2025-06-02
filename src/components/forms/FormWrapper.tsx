import React from 'react'

const FormWrapper = ({children}:{children: React.ReactNode }) => {
  return (
    <div className='bg-white shadow-md py-8 px-5 rounded-md'>{children}</div>
  )
}

export default FormWrapper