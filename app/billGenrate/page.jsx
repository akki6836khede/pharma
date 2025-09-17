"use client"
import React from 'react'
import { useSearchParams } from "next/navigation"
import { reduceStock } from '@/actions/billStockReducer'
import { useSession } from "next-auth/react"
import { useSWRConfig } from 'swr'
import { useRouter } from "next/navigation"
import { saveBillData } from '@/actions/addToBillDB'
import SmallNav from '../components/smallNav'

const Page = () => {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const searchParams = useSearchParams()
  const billData = searchParams.get("bill")
  const billArray = billData ? JSON.parse(billData) : []

  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (!session) {
    return <p>Not signed in</p>
  }

  let email = session.user.email

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const quantities = {}
    billArray.forEach(item => {
      quantities[item._id] = formData.get(`quantity_${item._id}`)
    })

    let finalBill = []
    billArray.map(item => {
      finalBill.push({ productName: item.productName, quantity: quantities[item._id], price: item.productPrice * quantities[item._id] })
    })

    const result = await reduceStock(quantities, email)
    const now = new Date()
    const dateTimeString = now.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })

    let sum = 0
    finalBill.forEach(item => {
      sum += item.price
    })
    let gt = sum

    let custName = formData.get("cust")
    let shopName = formData.get("shopName")
    console.log(billArray)
    const result_bill = await saveBillData(custName, gt, finalBill)
    if(result_bill.success == true){
      await mutate('salesData')
    }
    if (result.success == true) {
      await mutate('medicines')
      router.push(`/finalBillPage?bill=${encodeURIComponent(JSON.stringify(finalBill))}&custName=${custName}&shopName=${shopName}&date=${dateTimeString}&gt=${gt}`)
    }

  }

  return (
    <div className='w-[100vw] h-[100vh] bg-[url("/Main_bg.jpg")] bg-cover bg-center flex justify-center items-center'>
      <SmallNav></SmallNav>
      <div className='w-[90%] h-[70%] md:w-[60%] md:h-[55%] lg:w-[50%] lg:h-[80%] bg-black/70 rounded-2xl flex flex-col justify-start items-center'>
        <div className='font-bold text-2xl h-20 my-4 bg-gradient-to-r from-blue-300 via-blue-300 to-red-300 
                bg-clip-text text-transparent'>Add quantity for products</div>

        <form
          onSubmit={handleSubmit}
          className='h-[70%] lg:h-110 w-[90%] flex flex-col justify-evenly items-center'
        >
          <div className='w-[100%] h-[80%] overflow-y-scroll scrollbar-hide flex flex-col justify-evenly items-center gap-2'>

            {billArray.map(item => (
              <div
                key={item._id}
                className='w-[100%] h-15 border border-white flex items-center justify-between p-2 bg-blue-300 rounded-md'
              >
                <div className='text-black font-bold lg:text-base text-[14px]'>{item.productName}</div>
                <input
                  type="number"
                  name={`quantity_${item._id}`}
                  placeholder='Enter quantity here'
                  className="p-1 rounded border-1 bg-white text-black w-30 text-[12px] lg:text-base lg:w-50 lg:font-bold"
                  required
                />
              </div>
            ))}
          </div>

          <input type="text" name="cust" placeholder='Enter customer name' className='w-40 lg:w-60 px-2 my-4 h-10 bg-white text-[12px] lg:text-base lg:font-bold rounded-md' />

          <input type="text" name="shopName" placeholder='Enter shop name' className='w-40 lg:w-60 px-2 my-4 h-10 bg-white text-[12px] lg:text-base lg:font-bold rounded-md' />

          <button
            type="submit"
            className='w-30 h-10 rounded-lg bg-gradient-to-r from-blue-800 to-violet-500 hover:from-blue-900 hover:to-violet-800 text-white font-bold mt-2'
          >
            Generate bill
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page
