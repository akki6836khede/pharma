"use client"

import React from 'react'
import Form from 'next/form'
import { saveProduct } from '@/actions/saveProduct'
import SmallNav from '../components/smallNav'

const page = () => {
  return (
    <div className='w-[100vw] h-[100vh] bg-[url("/Main_bg.jpg")] bg-cover bg-center flex flex-col justify-evenly items-center relative'>
      <SmallNav></SmallNav>
      <div className='w-[90%] h-[50%] md:w-[60vw] lg:w-[40vw] md:h-[40vh] lg:h-[60vh] rounded-4xl bg-white/50 flex flex-col justify-evenly items-center'>
        <div className='w-full h-[20%] flex justify-center items-center text-3xl font-bold 
                bg-gradient-to-r from-blue-600 via-blue-800 to-red-600 
                bg-clip-text text-transparent'>
          Add a Product
        </div>
        <Form action={saveProduct} className='w-[100%] h-[80%] flex flex-col justify-evenly items-center'>
          <input type="text" name='productName' placeholder='Enter product name here' className='w-[70%] h-10 rounded-full bg-blue-300 text-black pl-2 font-bold flex justify-center items-center' />
          <input type="number" name='productPrice' placeholder='Enter product price here' className='w-[70%] h-10 rounded-full bg-blue-300 pl-2 text-black font-bold flex justify-center items-center' />
          <input type="number" name='productStock' placeholder='Enter product stock here' className='w-[70%] h-10 rounded-full bg-blue-300 pl-2 text-black font-bold flex justify-center items-center' />
          <button type='submit' className='w-30 h-10 bg-gradient-to-r from-blue-800 to-blue-500 hover:from-blue-900 hover:to-blue-600 text-white rounded-lg flex justify-center items-center font-bold'>Add product</button>
        </Form>
      </div>
    </div>
  )
}

export default page
