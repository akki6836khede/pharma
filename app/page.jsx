"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const handleClick = ()=>{
    router.push("/login")
  }
  return (
    <div className='w-[100vw] h-[100vh] bg-[url("/Main_bg.jpg")] bg-cover bg-center flex justify-center items-center'>
      <div className="w-[80%] h-[70%] md:w-[50%] md:h-[50%] lg:w-[40%] lg:h-[60%] bg-white/50 rounded-2xl flex flex-col justify-evenly items-center">
        <div className="left flex flex-col justify-evenly items-center w-[90%] h-[60%]">
          <Image src="/pharamLogo.png" width={300} height={300} alt="pharma logo" />
          <div className="w-[90%] h-[50%] flex justify-center items-center text-justify italic">Welcome to PharmaTrack – Simplifying your pharmacy management. Track stock, manage sales, and keep your medical store organized, all in one place.</div>
        </div>
        <div className="right w-[90%] h-[30%] flex justify-evenly items-center">
          <div className="text-blue-700 h-[100%] w-[40%] flex justify-center items-center">Login to get started</div>
          <div className="h-[100%] w-[40%] flex justify-center items-center">
            <button onClick={handleClick} className="w-30 h-10 rounded-lg bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-bold">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
}
