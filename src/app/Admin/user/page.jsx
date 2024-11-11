"use client"
import { db } from '@/app/config/firebase'
import AdminSideBar from '@/components/AdminSideBar'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import Link from 'next/link'
import { useState } from 'react'

const Page = () => {
  const [user, setUser] = useState([])
  const [search, setSearch] = useState("")


  const getUsers = async() =>{
    const ref = collection(db, "User_Detail")
    const data = await getDocs(ref)
    const fildata = data.docs.map((doc) => ({...doc.data(), id:doc.id}))
    setUser(fildata)
  }

  const deleteUser = async(usersid) => {
    await deleteDoc(doc(db, "User_Detail", usersid))
    setUser(user.filter((item) => item.id !== usersid))
  }
  
  const filterUser = async() =>{
    // const filterUser =  user ? user.filter((product)=>product.FirstName === search) : user;
  }
  getUsers()
  return (
    <>
        <section className="flex">
            <AdminSideBar/>
            <div className="flex w-full flex-col">
              <div className="w-full flex flex-col p-10 ">
                <span className="flex items-center justify-between">
                  <div className="border-[.1rem]  items-center rounded pr-4 lg:w-[16rem] w-[10rem] h-[2.5rem] flex ">
                    <input className="w-[12rem] outline-none border-none mx-4" placeholder='search for user' onChange={(e)=>setSearch(e.target.value)} type="text" />
                    {/* <img className="w-[1.2rem]"  alt="" /> */}
                  </div>
                  <Link className="bg-primary py-2 px-5 text-white text-[1rem] rounded font-semibold" href="/postjob">Add New</Link>
                </span>
                <div>
                  <table className="w-full border mt-10">
                    <thead>
                      <tr className="border-b font-semibold text-[1rem]">
                        <td className="py-3 pl-5">User Id</td>
                        <td className="">Image</td>
                        <td className="">User Email</td>
                        <td className="">FirstName</td>
                        <td className="">LastName</td>
                        <td className="">Action</td>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      user.filter((users)=>{
                        return search.toLowerCase() === "" ? users : users.First_Name.toLowerCase().includes(search) || users.Last_Name.toLowerCase().includes(search)
                      })
                      .map((users) => {
                        return(
                          <tr key={users.id} className="border-b text-[1rem] gap-3" {...users}>
                            <td className="py-5 w-[12rem] pl-5 pr-5">{users.id.substring(0, 10)}</td>
                            <td><img className="h-[3rem] flex items-center object-cover w-[3rem] rounded-full" src={users.fileURL} alt="img" /></td>
                            <td className="">{users.Email}</td>
                            <td className="">{users.First_Name}</td>
                            <td className="">{users.Last_Name}</td>
                            <td onClick={() => deleteUser(users.id)} className=""><button className="py-2 px-5 text-white bg-primary rounded">Delete</button></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              </div>
        </section>
    </>
  )
}

export default Page
