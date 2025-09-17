"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react";
import Image from 'next/image';
import UserProfile from '@/app/components/userProfile';
import { useState } from 'react';


const SmallNav = ({ children }) => {
    const [show, setShow] = useState(false)
    const router = useRouter()
    const { data: session, status } = useSession()
    const handleLogout = async () => {
        await signOut({ redirect: false })
        router.push("/login")
    }
    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (!session) {
        return <p>Not signed in</p>
    }

    let email = session.user.email
    let name = session.user.name
    let image = session.user.image
    const handleProfile = () => {
        setShow(prev => !prev)
    }
    return (
        <div className={`${children ? "lg:w-255" : "lg:w-135"} ${children ? "md:w-185" : "md:w-120"} ${children ? "w-[100%]" : "w-[100%]"} ${children ? "h-38" : "h-20"} ${children ? "flex-wrap" : "flex-nowrap"} md:flex-nowrap md:h-15 z-5 flex justify-evenly items-center rounded-0 md:rounded-lg bg-black/90 absolute top-0 md:top-8 left-[0%] md:left-[50%] md:-translate-x-1/2 md:-translate-y-1/2`}>
            {show &&
                <UserProfile name={name} email={email} image={image} show={show} setShow={setShow}></UserProfile>
            }
            <Image src="/pharamLogo.png" className='cursor-pointer' onClick={()=>{router.push("/aboutPage")}} width={120} height={120} alt="pharma logo" />
            {
                children &&
                <div>{children}</div>
            }
            <button onClick={handleProfile} className={`mb-4 md:mb-0 cursor-pointer ${children ? "w-28" : "w-10"} md:w-10 lg:w-24 h-10 rounded-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-500 hover:from-blue-900 hover:to-indigo-700 text-white transition-all duration-300`}><span className="material-symbols-outlined block lg:!hidden">account_circle</span><span className='hidden lg:block'>Profile</span></button>
            <button className={`mb-4 md:mb-0 ${children ? "w-28" : "w-10"} md:w-10 lg:w-24 h-10 font-bold rounded-lg flex justify-center items-center bg-gradient-to-r from-blue-800 to-blue-500 hover:from-blue-950 hover:to-blue-600 transition-all duration-300 text-white`} onClick={() => router.push(`/userpage/${email}`)}>
                <span className="material-symbols-outlined block lg:!hidden">home</span><span className='hidden lg:block'>Home</span>
            </button>
            <button onClick={handleLogout} className={`mb-4 md:mb-0 cursor-pointer ${children ? "w-28" : "w-10"} md:w-10 lg:w-24 h-10 rounded-lg font-bold bg-gradient-to-r from-red-800 to-red-500 hover:from-red-900 hover:to-red-600 text-white transition-all duration-300`}><span className="material-symbols-outlined block lg:!hidden">logout</span><span className='hidden lg:block'>Logout</span></button>
        </div>
    )
}

export default SmallNav
