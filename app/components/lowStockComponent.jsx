import React from 'react'

const LowStockComponent = ({ lowStock, setLowShow }) => {
    return (
        <div className='absolute top-[52%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-80 md:w-100 h-100 rounded-3xl bg-black border-2 border-gray-700 flex flex-col justify-evenly items-center'>
            <div className='font-bold text-amber-200'>Products with low stock</div>
            <div className='w-[95%] h-75 flex flex-col justify-evenly items-center'>
                <div className='w-[100%] h-[15%] flex text-blue-300 justify-between items-center'>
                    <div className='w-[60%] h-[100%] border-1 border-white font-bold flex justify-start px-4 items-center'>Product name</div>
                    <div className='w-[39%] h-[100%] border-1 border-white font-bold flex justify-center items-center'>Stock left</div>
                </div>
                <div className='w-[100%] h-[82%] flex flex-col justify-start items-center gap-1 flex-shrink-0 border-b-1 border-white overflow-y-scroll scrollbar-hide'>
                    {lowStock.map((item,index) => {
                        return (
                            <div key={index} className='w-[100%] h-10 flex justify-between items-center flex-shrink-0'>
                                <div className='overflow-x-scroll scrollbar-hide text-nowrap w-[60%] h-[100%] border-1 text-white border-white flex justify-start px-4 items-center'>{item.productName}</div>
                                <div className='w-[39%] h-[100%] border-1 text-red-500 border-white flex justify-center items-center'>{item.productStock}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <button className='w-20 h-8 rounded-lg flex justify-center font-bold text-white items-center bg-red-500' onClick={()=>{setLowShow(prev => !prev)}}>close</button>
        </div>
    )
}

export default LowStockComponent
