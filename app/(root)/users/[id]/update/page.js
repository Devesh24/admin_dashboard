"use client"

import UserForm from '@/components/shared/UserForm'
import { getUser } from '@/lib/actions/user.actions'
import { useEffect, useState } from 'react'

const UpdateUser = ({params: {id}}) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        const getUserbyId = async () => {
            const data = await getUser(id)
            setUser(data)
        }
        getUserbyId()
    },[])

  return (
    <div>
        <div className='relative top-0 w-full h-[70vh] bg-cover md:bg-center text-white flex justify-center items-end' style={{backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.4)), url('/assets/images/banner.jpg')"}}>
            <div className="wrapper text-center">
                <p className="h1-bold mb-40">UPDATE USER</p>
            </div>
        </div>
        <div className="w-full flex-center min-h-screen">
            <UserForm type="Update" user={user} />
        </div>
    </div>
  )
}

export default UpdateUser