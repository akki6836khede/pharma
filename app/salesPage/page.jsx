"use client"

import React, { useEffect } from 'react'
import { getSalesArray } from '@/actions/getSalesList'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import GetSalesBill from '../components/getSalesBill'
import { useState } from 'react'
import SmallNav from '../components/smallNav'

const page = () => {
    const router = useRouter()
    const fetcher = async () => await getSalesArray()
    const { data: salesTable = [], error, isLoading } = useSWR("salesData", fetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
    })
    const getDate = (isoDate) => {
        const date = new Date(isoDate)
        const formatted = date.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        })
        return formatted
    }
    // Bill visibility functionality
    const [show, setShow] = useState(false)
    const handleView = () => {
        setShow(prev => !prev)
    }
    const [billOb, setbillOb] = useState([])
    const handleSetBillOb = (value) => {
        setbillOb(value)
    }
    const [query, setQuery] = useState("")
    const billTableDynamic =
        query === ""
            ? salesTable
            : salesTable.filter(item =>
                item.customerName.toLowerCase().includes(query.toLowerCase())
            )
    return (
        <div className='w-[100vw] h-[100vh] bg-[url("/Main_bg.jpg")] bg-cover bg-center flex flex-col justify-end md:justify-evenly items-center'>
            <SmallNav children={
                <div className="relative w-50 md:w-100">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    search
                </span>
                <input
                    type="text"
                    placeholder="Search medicine..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="cursor-pointer w-full bg-black h-10 pl-10 pr-3 rounded-md border border-gray-300 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            }></SmallNav>
            <div className='w-[100%] md:w-[90%] lg:w-[80%] h-[75%] md:h-[80%] bg-black/90 flex flex-col justify-evenly items-center relative'>
                {
                    show &&
                    <GetSalesBill billArray={billOb} setShow={setShow}></GetSalesBill>
                }
                <div className='w-[100%] lg:w-[99%] h-[10%] md:h-[6%] lg:h-[9.8%] flex justify-between items-center'>
                    <div className='h-[100%] w-[30%] md:w-[20%] lg:w-[19.8%] bg-white text-black text-[12px] md:text-base font-bold flex justify-start px-4 items-center'>Customer name</div>
                    <div className='h-[100%] w-[35%] md:w-[30%] lg:w-[29.8%] bg-white pl-6 md:pl-0 text-black text-[12px] md:text-base font-bold flex justify-center items-center'>Date & Time</div>
                    <div className='h-[100%] w-[15%] md:w-[30%] lg:w-[29.4%] bg-white text-black text-[12px] md:text-base font-bold flex justify-center items-center'>Bill</div>
                    <div className='h-[100%] w-[20%] md:w-[20%] lg:w-[19.8%] bg-white text-black text-[12px] md:text-base font-bold flex justify-center items-center'>Total amount</div>
                </div>
                <div className="tabular w-[100%] lg:w-[99%] h-[94%] lg:h-[87.8%] overflow-y-scroll scrollbar-hide flex flex-col gap-0 lg:gap-1 justify-start items-center ">
                    {billTableDynamic.map((item, index) => {
                        return (
                            <div key={index} className='hover:bg-gray-900 w-[100%] h-[10%] md:h-[6%] lg:h-[9.8%] flex justify-between items-center flex-shrink-0'>
                                <div className='h-[100%] w-[30%] md:w-[20%] lg:w-[19.8%] border-1 border-white text-white flex justify-start px-4 items-center overflow-x-scroll scrollbar-hide text-[12px] md:text-base text-nowrap'>{item.customerName}</div>
                                <div className='h-[100%] w-[35%] md:w-[30%] overflow-x-scroll scrollbar-hide text-nowrap lg:w-[29.8%] border-1 text-[12px] md:text-base border-white text-blue-400 pl-6 md:pl-0 flex justify-center items-center'>{getDate(item.date)}</div>
                                <div className='h-[100%] w-[15%] md:w-[30%] lg:w-[29.4%] border-1 border-white text-white flex justify-center items-center'>
                                    <button className='w-6 md:w-30 h-6 md:h-8 rounded-lg bg-blue-500 text-white font-bold' onClick={() => {
                                        handleSetBillOb(item.billObject)
                                        handleView()
                                    }}><span className="material-symbols-outlined block md:!hidden">receipt_long</span><span className='hidden md:block'>View bill</span></button>
                                </div>
                                <div className='h-[100%] overflow-x-scroll scrollbar-hide text-nowrap w-[20%] md:w-[20%] lg:w-[19.8%] border-1 text-[12px] md:text-base border-white text-green-400 flex justify-center items-center'>{item.billAmount}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default page
