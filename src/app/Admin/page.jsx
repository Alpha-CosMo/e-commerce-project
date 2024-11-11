"use client"
import AdminSideBar from '@/components/AdminSideBar'
import { db } from '@/app/config/firebase'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import Link from 'next/link'
import { useState } from 'react'
import { ClockArrowDown, Shirt, User } from 'lucide-react'

const Page = () => {
  const [user, setUser] = useState([])


  const getUsers = async() =>{
    const ref = collection(db, "User_Detail")
    const data = await getDocs(ref)
    const fildata = data.docs.map((doc) => ({...doc.data(), id:doc.id}))
    setUser(fildata)
  }
  getUsers()
  return (
    <div className='flex'>
        <AdminSideBar/>
        <section className='h-screen w-full pt-10 px-10'>
            <div className='flex gap-5'>
                <div className='grid shadow p-5 rounded bg-white w-[14rem]'>
                    <span className='flex gap-3'><User></User> <h1>Users</h1></span>
                    <p className='text-2xl font-bold py-3 text-gray-800'>{user.length}</p>
                    <p>{user.length/100}%</p>
                </div>
                <div className='grid shadow p-5 rounded bg-white w-[14rem]'>
                    <span className='flex gap-3'><Shirt></Shirt> <h1>Products</h1></span>
                    <p className='text-2xl font-bold py-3 text-gray-800'>{user.length}</p>
                    <p>{user.length/100}%</p>
                </div>
                <div className='grid shadow p-5 rounded bg-white w-[14rem]'>
                    <span className='flex gap-3'><ClockArrowDown></ClockArrowDown> <h1>Orders</h1></span>
                    <p className='text-2xl font-bold py-3 text-gray-800'>{user.length}</p>
                    <p>{user.length/100}%</p>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Page
