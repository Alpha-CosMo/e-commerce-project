"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { User, House, Shirt, LucideClockArrowDown } from 'lucide-react'
import { LayoutDashboard } from 'lucide-react'

const AdminSideBar = () => {
  return (
    <>
        <header className="w-1/5 poppins pl-10 pt-10 border-r-[1.rem] border-gray-500 border-r h-screen">
            <h1 className='font-bold text-xl pb-10 text-primary' >StudCommerce</h1>
            <nav>
                <ul>
                    <div className="flex items-center gap-5">
                        <LayoutDashboard/>
                        {/* <Image src={LayoutDashboard} className="w-[1.5rem]" alt='image'></Image> */}
                        <Link className="text-gray-600 font-semibold text-sm" href="/Admin">Dashboard</Link>
                    </div>
                    <div className="flex items-center gap-5 mt-5">
                        <User/>
                        {/* <Image src={User} className="w-[1.5rem]" alt='image' ></Image> */}
                        <Link className="text-gray-600 font-semibold text-sm" href="/Admin/user">Users</Link>
                    </div>
                    <div className="flex items-center gap-5 mt-5">
                        <Shirt/>
                        {/* <Image src={User} className="w-[1.5rem]" alt='image' ></Image> */}
                        <Link className="text-gray-600 font-semibold text-sm" href="/Admin/product">Products</Link>
                    </div>
                    <div className="flex items-center gap-5 mt-5">
                        <LucideClockArrowDown/>
                        {/* <Image src={User} className="w-[1.5rem]" alt='image' ></Image> */}
                        <Link className="text-gray-600 font-semibold text-sm" href="/Admin/Order">Orders</Link>
                    </div>
                </ul>
            </nav>
        </header> 
    </>
  )
}

export default AdminSideBar
