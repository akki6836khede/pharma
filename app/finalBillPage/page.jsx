"use client"

import React from 'react'
import { useSearchParams } from "next/navigation"
import SmallNav from '../components/smallNav'
const page = () => {
    const searchParams = useSearchParams()
    const billData = searchParams.get("bill")
    const billArray = billData ? JSON.parse(billData) : []
    console.log("Hello boss", billArray)

    return (
        <div className='w-[100vw] h-[100vh] bg-[url("/Main_bg.jpg")] bg-cover bg-center flex justify-center items-center'>
            <SmallNav></SmallNav>
            <div className="bill w-[97%] md:w-110 border-1 h-110 md:h-138 lg:h-150 bg-white flex flex-col justify-evenly items-center">
                <div className="shopname w-[90%] h-20 text-xl font-bold flex justify-center items-center">{searchParams.get("shopName")}</div>
                <div className="shopname w-[90%] h-15 flex justify-start items-center"><b>Date/ Time:-</b>{searchParams.get("date")}</div>
                <div className="shopname w-[90%] h-15 flex justify-start items-center"><b>Customer name:-</b>{searchParams.get("custName")}</div>
                <div className="shopname w-[90%] h-70 flex flex-col justify-start items-center border-1">
                    <div className='w-[100%] h-10 flex justify-evenly items-center border-b-1'>
                        <div className='w-[60%] font-bold flex justify-start px-2 items-center'>Name</div>
                        <div className='w-[20%] font-bold flex justify-center items-center'>Quantity</div>
                        <div className='w-[20%] font-bold flex justify-center items-center'>Price</div>
                    </div>
                    <div className='w-[100%] h-60 overflow-y-scroll scrollbar-hide text-black'>
                        {billArray.map((item, index) => {
                            return(
                            <div key={index} className='w-[100%] h-10 flex justify-evenly items-center'>
                                <div className='w-[60%] flex justify-start items-center px-2'>{item.productName}</div>
                                <div className='w-[20%] flex justify-center items-center'>{item.quantity}</div>
                                <div className='w-[20%] flex justify-center items-center'>{item.price}</div>
                            </div>
                            )
                        })}
                    </div>
                </div>
                <div className="shopname w-[90%] h-30 flex justify-end items-center"><b>Grand total:-</b>{searchParams.get("gt")}</div>
            </div>
        </div>
    )
}

export default page
