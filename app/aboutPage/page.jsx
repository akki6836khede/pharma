"use client"

import React from 'react'
import SmallNav from '../components/smallNav'
const Page = () => {
    return (
        <div className='w-[100vw] h-[100vh] bg-[url("/Main_bg.jpg")] bg-cover bg-center flex justify-center items-center'>
            <SmallNav></SmallNav>
            <div className='w-[97%] lg:w-[50%] h-[75%] lg:h-[80%] rounded-3xl bg-black/90 flex flex-col justify-evenly items-center'>
                <div className="upper h-[8%] w-[95%] bg-gradient-to-r flex justify start items-center">
                    <div className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 vis-red-500 to-indigo-400 flex justify-start items-center text-transparent bg-clip-text w-90'>
                        About PharmaTrack
                    </div>
                </div>
                <div className="lower h-[87%] w-[95%] flex flex-col justify-evenly gap-2 items-center text-white overflow-y-scroll scrollbar-hide">
                    <div className='w-[100%] flex-shrink-0 flex flex-col justify-center items-center'>
                        <div className="w-[100%] font-bold md:text-xl text-white">Project Introduction</div>
                        <div className="w-[100%] text-gray-400 md:text-base text-[12px]">
                        Medical Stock Manager is a web-based application designed to help pharmacies and healthcare providers efficiently track, manage, and update their medical inventory in real time.
                        </div>
                    </div>
                    <div className='w-[100%] flex-shrink-0 flex flex-col justify-center items-center'>
                        <div className="w-[100%] font-bold md:text-xl text-white">Problem Statement / Purpose</div>
                        <div className="w-[100%] text-gray-400 md:text-base text-[12px]">
                        Many medical stores face issues with overstocking, stockouts, and expiry management. This project aims to reduce manual effort and ensure timely availability of medicines.
                        </div>
                    </div>
                    <div className='w-[100%] flex-shrink-0 flex flex-col justify-center items-center'>
                        <div className="w-[100%] font-bold md:text-xl text-white">Key Features</div>
                        <ul className="w-[100%] list-disc pl-6 text-gray-400 md:text-base text-[12px]">
                        <li>Keeping stocks, changing prices and changing stocks</li>
                        <li>Generating bills</li>
                        <li>Tracking products with low stocks</li>
                        <li>Tracking sales history</li>
                        </ul>
                    </div>
                    <div className='w-[100%] flex-shrink-0 flex flex-col justify-center items-center'>
                        <div className="w-[100%] font-bold text-xl text-white">Technology Stack</div>
                        <ul className="w-[100%] list-disc pl-6 text-gray-400 md:text-base text-[12px]">
                        <li>Frontend: React.js , Next.js, Tailwind CSS</li>
                        <li>Backend: Next.js Server Actions, Node.js Runtime</li>
                        <li>Database: MongoDB with Mongoose ODM</li>
                        <li>Authentication: NextAuth.js</li>
                        </ul>
                    </div>
                    <div className='w-[100%] flex-shrink-0 flex flex-col justify-center items-center'>
                        <div className="w-[100%] font-bold md:text-xl text-white">Target Users</div>
                        <ul className='list-disc pl-6 w-[100%] text-gray-400 md:text-base text-[12px]'>
                        <li>Medical stores / pharmacies</li>
                        <li>Hospitals / clinics</li>
                        <li>Medical wholesalers</li>
                        </ul>
                    </div>
                    <div className='w-[100%] flex-shrink-0 flex flex-col justify-center items-center'>
                        <div className="w-[100%] font-bold md:text-xl text-white">Contact / Credits</div>
                        <ul className="w-[100%] list-disc pl-6 md:text-base text-[12px]">
                            <li className='text-gray-400'>Name: <span className='font-bold text-gray-300'>Atharv Khede</span></li>
                            <li className='text-gray-400'>Linkedin: <a className='font-bold text-blue-500' href="http://www.linkedin.com/in/atharv-khede-9024ba376" target="_blank">www.linkedin.com/in/atharv-khede-9024ba376</a></li>
                            <li className='text-gray-400'>Github: <a className='font-bold text-blue-500' href="https://github.com/akki6836khede" target="_blank">https://github.com/akki6836khede</a></li>
                            <li className='text-gray-400'>Gmail: <a className='font-bold text-blue-500' href="mailto:atharvkhede2004@gmail.com" target="_blank">atharvkhede2004@gmail.com</a></li>
                        </ul>
                    </div>
                    <div className='w-[100%] h-20 flex-shrink-0 text-gray-400 flex justify-center items-center'>
                        &copy; 2025 PharmaTrack. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
