"use client"

import React from 'react'
import { changePrice } from '@/actions/changePrice'
import Form from 'next/form'
import { useSWRConfig } from 'swr'

const PriceChanger = ({ _id, setShowPriceAdder, email}) => {
  const { mutate } = useSWRConfig()
  const handleSubmit = async (formData) => {
    const result = await changePrice(formData); 
    if (result.succes) {
      await mutate('medicines');
      setShowPriceAdder(false); 
    }
  }
  return (
    <Form
      action={handleSubmit}
      className='w-70 h-50 rounded-2xl bg-gradient-to-r from-white to-blue-400 absolute 
                 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2
                 flex flex-col justify-evenly items-center'
    >
      <input type="hidden" name="_id" value={_id} />
      <input type="hidden" name="email" value={email} />

      <input type="number" name="price" placeholder='Enter price here' className='w-[70%] h-10 rounded-md bg-gray-800 text-gray-300 border-1 flex justify-center items-center px-2'/>

      <button type='submit' className='w-30 h-10 flex justify-center items-center rounded-lg bg-blue-700 text-white font-bold'>
        Change price
      </button>
      <button
        type="button"
        onClick={() => setShowPriceAdder(prev => !prev)}
        className='w-16 h-8 flex justify-center items-center rounded-lg bg-red-500 font-bold text-white'
      >
        Close
      </button>
    </Form>
  )
}

export default PriceChanger
