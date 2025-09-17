"use client";

export default function Loading({ size = "w-16 h-16", color = "border-blue-500" }) {
  return (
    <div className='fixed inset-0 flex justify-center items-center z-50 bg-[url("/Main_bg.jpg")] bg-cover bg-center'>
      <div
        className={`${size} border-8 ${color} border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
}
