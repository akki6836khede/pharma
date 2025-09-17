import React from 'react'

const GetSalesBill = ({ billArray, setShow }) => {
    const handleClose= ()=>{
        setShow(prev => !prev)
    }
    return (
        <div className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[97%] lg:w-150 bg-white h-100 flex flex-col justify-evenly items-center rounded-3xl'>
            <div className="shopname w-[90%] h-70 flex flex-col justify-start items-center border-1">
                <div className='w-[100%] h-10 flex justify-evenly items-center border-b-1'>
                    <div className='w-[60%] font-bold flex justify-start px-4 items-center'>Name</div>
                    <div className='w-[20%] font-bold flex justify-center items-center'>Quantity</div>
                    <div className='w-[20%] font-bold flex justify-center items-center'>Price</div>
                </div>
                <div className='w-[100%] h-60 overflow-y-scroll scrollbar-hide text-black'>
                    {billArray.map((item, index) => {
                        return (
                            <div key={index} className='w-[100%] h-10 flex justify-evenly items-center flex-shrink-0'>
                                <div className='w-[60%] flex justify-start items-center px-4'>{item.productName}</div>
                                <div className='w-[20%] flex justify-center items-center'>{item.quantity}</div>
                                <div className='w-[20%] flex justify-center items-center text-blue-600'>{item.price}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <button className='w-20 h-10 rounded-lg bg-red-500 font-bold text-white' onClick={handleClose}>close</button>
        </div>
    )
}

export default GetSalesBill
