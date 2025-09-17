import React from 'react'
import Image from 'next/image'

const UserProfile = (props) => {
  const handleClick = () => {
    props.setShow(prev => !prev)
  }
  return (
    <div className='absolute z-10 top-2 left-2 rounded-2xl bg-white text-black h-38 border-2 w-[95%] md:w-110 flex flex-col justify-evenly items-center'>
      <div className='w-[95%] md:w-100 flex justify-between items-center'><div className='bg-gradient-to-r from-blue-600 via-blue-800 to-red-600 
                bg-clip-text text-transparent text-xl font-bold'>Profile</div>
        <button onClick={handleClick} className='w-15 h-8 rounded-lg bg-red-600 hover:bg-red-800 text-white flex justify-center items-center'>close</button>
      </div>
      <div className='w-[95%] md:w-100'>
        <div className="mainBox flex justify-between items-center w-[100%] h-25 overflow-x-scroll scrollbar-hide">
          <Image src={props.image} width={50} height={50} alt='image here' className='rounded-full mr-4 md:mr-0 border-2 border-gray-900'></Image>
          <div>
            <div className='text-nowrap overflow-x-scroll scrollbar-hide'>User name: <b>{props.name}</b></div>
            <div className='text-nowrap overflow-x-scroll scrollbar-hide'>Email address: <b>{props.email}</b></div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
