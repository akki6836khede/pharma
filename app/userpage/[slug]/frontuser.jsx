"use client"

import React, { useEffect } from 'react'
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react";
import Image from 'next/image';
import UserProfile from '@/app/components/userProfile';
import { useRef } from 'react';
import { useState } from 'react';
import { getArray } from '@/actions/getMedicinesTable';
import useSWR from "swr"
import { updateStock } from '@/actions/addStockFile';
import StockAdder from '@/app/components/stockAdder';
import PriceChanger from '@/app/components/priceChanger';
import { getMedicines } from '@/actions/getMedFile';
import LowStockComponent from '@/app/components/lowStockComponent';
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,400,0,0&icon_names=add_circle" />


const UserPage = (props) => {
    const router = useRouter()
    const ref = useRef()
    const fetcher = async () => await getArray()
    const { data: medTable = [], error, isLoading } = useSWR("medicines", fetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
    })

    const handleLogout = async () => {
        await signOut({ redirect: false })
        router.push("/login")
    }
    const addProduct = () => {
        router.push("/addProduct")
    }
    const [show, setShow] = useState(false)
    const handleProfile = () => {
        setShow(prev => !prev)
    }
    const [stockID, setStockID] = useState('') // used in both stockAdder and priceChanger
    const [currStock, setcurrStock] = useState('')
    const [showAdder, setShowAdder] = useState(false)
    const handleaddStock = (value, currSt) => {
        setShowAdder(prev => !prev)
        setStockID(value)
        setcurrStock(currSt)
    }
    const [showPriceAdder, setShowPriceAdder] = useState(false)
    const [price, setPrice] = useState(0)
    const handleChangePrice = (value) => {
        setShowPriceAdder(prev => !prev)
        setStockID(value)
    }
    // Below is code for searching
    const [query, setQuery] = useState("")
    const [searchMedicines, setsearchMedicines] = useState([])

    useEffect(() => {
        async function fetchData() {
            const data = await getMedicines(query)
            setsearchMedicines(JSON.parse(JSON.stringify(data)))
        }
        fetchData()
    }, [query])

    const medicinesToShow = query === "" ? medTable : searchMedicines

    // Bill making arrangement
    // const [billArray, setBillArray] = useState([])
    // const handleAdd = (_id, productName, productPrice, productStock) => {
    //     setBillArray([...billArray, { _id: _id, productName: productName, productPrice: productPrice, productStock: productStock }])
    // }

    const [billArray, setBillArray] = useState([]);
    const [addedIds, setAddedIds] = useState(new Set());

    const handleAdd = (_id, productName, productPrice, productStock) => {
        if (addedIds.has(_id)) {
            setBillArray(billArray.filter(item => item._id !== _id));
            const newSet = new Set(addedIds);
            newSet.delete(_id);
            setAddedIds(newSet);
        } else {
            setBillArray([...billArray, { _id, productName, productPrice, productStock }]);
            setAddedIds(new Set([...addedIds, _id]));
        }
    };


    const handleGenerateBill = () => {
        setBillArray([]);
        setAddedIds(new Set());
        router.push(`/billGenrate?bill=${encodeURIComponent(JSON.stringify(billArray))}`);
    };

    const handleSalesClick = () => {
        router.push(`/salesPage`)
    }

    const lowStock = medicinesToShow.filter(n => n.productStock <= 30)
    const [lowShow, setLowShow] = useState(false)
    const hadleLowShow = () => {
        setLowShow(prev => !prev)
    }
    return (
        <div className='w-[100vw] h-[100vh] bg-[url("/Main_bg.jpg")] bg-cover bg-center flex justify-center items-center'>
            <div className='w-[100%] h-[100%] flex justify-center items-center bg-black/95'>
                <div className='container relative mx-auto h-screen flex flex-col justify-center items-center'>
                    {
                        lowShow &&
                        <LowStockComponent lowStock={lowStock} setLowShow={setLowShow}></LowStockComponent>
                    }
                    {
                        showPriceAdder &&
                        <PriceChanger _id={stockID} setShowPriceAdder={setShowPriceAdder} email={props.email}></PriceChanger>
                    }
                    {
                        showAdder &&
                        <StockAdder _id={stockID} showAdder={showAdder} setShowAdder={setShowAdder} email={props.email} currStock={currStock}></StockAdder>
                    }
                    {show &&
                        <UserProfile ref={ref} name={props.name} email={props.email} image={props.image} show={show} setShow={setShow}></UserProfile>
                    }
                    <div className="navbar w-[100%] h-[30%] md:h-[10%] flex flex-col md:flex-row justify-between items-center flex-shrink">
                        <div className="left h-[90%] w-[95%] md:w-[30%] flex justify-between md:justify-evenly items-center">
                            <Image src="/pharamLogo.png" onClick={() => { router.push("/aboutPage") }} className='cursor-pointer' width={140} height={140} alt="pharma logo" />
                            <button onClick={handleProfile} className='cursor-pointer w-25 md:w-10 lg:w-24 h-10 mr-4 lg:mr-0 rounded-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-500 hover:from-blue-900 hover:to-indigo-700 text-white transition-all duration-300'><span className="material-symbols-outlined block lg:!hidden">account_circle</span><span className='hidden lg:block'>Profile</span></button>
                            <button onClick={handleLogout} className='cursor-pointer w-25 md:w-10 lg:w-24 h-10 rounded-lg font-bold bg-gradient-to-r from-red-800 to-red-500 hover:from-red-900 hover:to-red-600 text-white transition-all duration-300'><span className="material-symbols-outlined block lg:!hidden">logout</span><span className='hidden lg:block'>Logout</span></button>
                        </div>
                        <div className="right h-[90%] w-[95%] md:w-[70%] flex justify-between gap-4 md:gap-0 md:justify-evenly flex-wrap md:flex-nowrap items-center">
                            <button onClick={addProduct} className='cursor-pointer w-15 md:w-10 lg:w-35 h-10 rounded-lg font-bold bg-gradient-to-r from-green-700 via-blue-700 to-purple-600 hover:from-purple-600 hover:via-blue-700 hover:to-green-700 text-white flex justify-center items-center transition-all duration-300'><span className="material-symbols-outlined block lg:!hidden">add_box</span><span className='hidden lg:block'>Add a Product</span></button>
                            <div className="relative w-66 md:w-50 lg:w-80">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    search
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search medicine..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="cursor-pointer w-full h-10 pl-10 pr-3 rounded-md border border-gray-300 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button className='cursor-pointer w-30 md:w-10 lg:w-30 font-bold h-10 rounded-lg bg-gradient-to-r from-green-400 via-green-800 to-blue-600 text-white hover:from-blue-600 hover:via-green-800 hover:to-green-400  transition-all duration-300' onClick={handleGenerateBill}><span className="material-symbols-outlined block lg:!hidden">receipt_long</span><span className='hidden lg:block'>Generate bill</span></button>
                            <button className='cursor-pointer w-30 md:w-10 lg:w-18 font-bold h-10 rounded-lg bg-gradient-to-r from-amber-300 to-amber-600 hover:from-amber-500 hover:to-amber-800 text-black transition-all duration-300' onClick={handleSalesClick}><span className="material-symbols-outlined block lg:!hidden">finance</span><span className='hidden lg:block'>Sales</span></button>
                            <button onClick={hadleLowShow}>
                                <span className="!text-yellow-300 hover:!text-yellow-600 hover:!scale-105 cursor-pointer !text-4xl material-symbols-outlined">
                                    warning
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="w-[100%] h-[70%] md:h-[90%] flex justify-center items-center">
                        <div className='w-[100%] md:w-[95%] h-[90%] border-1 border-gray-300 flex flex-col justify-evenly items-center'>
                            <div className="upper w-[100%] lg:w-[99.3%] h-[7%] lg:h-[10%] flex justify-between items-center">
                                <div className="medicineName h-[100%] w-[50%] md:w-[39.8%] border-1 border-gray-300 flex justify-start px-4 md:px-8 items-center font-bold text-black lg:text-xl md:text-base text-[12px] bg-white">Medicine Name</div>
                                <div className="stock h-[100%] w-[15%] md:w-[14.8%] border-1 border-gray-300 flex justify-center items-center font-bold text-black lg:text-xl md:text-base text-[12px] bg-white">Stock</div>
                                <div className="price h-[100%] w-[15%] md:w-[14.8%] border-1 border-gray-300 flex justify-center items-center font-bold text-black lg:text-xl md:text-base text-[12px] bg-white">Price</div>
                                <div className="actions h-[100%] w-[20%] md:w-[29.8%] border-1 border-gray-300 flex justify-center items-center font-bold text-black lg:text-xl md:text-base text-[12px] bg-white">Actions</div>
                            </div>
                            <div className="lower w-[100%] lg:w-[99.3%] h-[93%] lg:h-[88%] flex flex-col gap-0 md:gap-1 justify-start items-center overflow-y-scroll scrollbar-hide" style={{ scrollbarGutter: 'stable' }}>

                                {medicinesToShow
                                    .map(item => {
                                        return (
                                            <div key={item._id} className="upper w-[100%] h-30 md:h-15 flex flex-shrink-0 justify-between items-center hover:bg-gray-900">
                                                <div className="medicineName h-[100%] w-[50%] md:w-[39.8%] border-1 border-gray-300 flex justify-start px-4 md:px-8 items-center md:font-bold text-[12px] md:text-base text-white overflow-x-hidden">{item.productName}</div>
                                                <div className={`stock h-[100%] w-[15%] md:w-[14.8%] border-1 border-gray-300 flex justify-center items-center md:font-bold text-[12px] md:text-base ${item.productStock >= 100
                                                    ? "text-green-500"
                                                    : item.productStock > 30 && item.productStock < 100
                                                        ? "text-yellow-300"
                                                        : "text-red-500"}`}>{item.productStock}</div>
                                                <div className="price h-[100%] w-[15%] md:w-[14.8%] border-1 border-gray-300 flex justify-center items-center md:font-bold text-[12px] md:text-base text-green-500">₹{item.productPrice}</div>
                                                <div className="actions h-[100%] w-[20%] md:w-[29.8%] border-1 border-gray-300 flex flex-col md:flex-row justify-evenly items-center font-bold text-white">
                                                    <button className='cursor-pointer w-8 md:w-8 lg:w-25 h-8 md:h-8 rounded-lg bg-green-500 hover:bg-green-700 flex justify-center items-center text-black transition-all duration-300' onClick={() => {
                                                        handleaddStock(item._id, item.productStock)
                                                    }}><span className="material-symbols-outlined !text-[15px] md:!text-base block lg:!hidden">add</span><span className='hidden lg:block'>Add stock</span></button>
                                                    <button className='cursor-pointer w-8 md:w-8 lg:w-30 h-8 md:h-8 rounded-lg bg-blue-500 hover:bg-blue-700 flex justify-center items-center text-white transition-all duration-300' onClick={() => {
                                                        handleChangePrice(item._id)
                                                    }}><span className="material-symbols-outlined !text-[15px] md:!text-base block lg:!hidden">price_change</span><span className='hidden lg:block'>Change price</span></button>
                                                    <button
                                                        className={`cursor-pointer w-8 h-8 text-sm rounded-full flex justify-center items-center transition-all duration-300 ${addedIds.has(item._id) ? "text-green-400 hover:text-green-600" : "text-blue-400 hover:text-blue-600"
                                                            }`}
                                                        onClick={() => handleAdd(item._id, item.productName, item.productPrice, item.productStock)}
                                                    >
                                                        <span className="!text-3xl material-symbols-outlined">
                                                            add_circle
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPage