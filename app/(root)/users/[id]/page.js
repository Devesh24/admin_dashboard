"use client"

import React, { useEffect, useState } from 'react'
import { deleteUser, getUser } from '@/lib/actions/user.actions'
import Image from 'next/image'
import Link from 'next/link'
import { formatDateTime } from '@/lib/utils'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation'
  

const User = ({params: {id}}) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        const getUserbyId = async () => {
            const data = await getUser(id)
            setUser(data)
        }
        getUserbyId()
    },[])

    const router = useRouter()
    const handleDelete = async () => {
        const deletedUser = await deleteUser(id)
        if(deletedUser){
            router.push("/")
        }
    }
  return (
    <div>
        <div className='relative top-0 w-full h-[70vh] bg-cover md:bg-center text-white flex justify-center items-end' style={{backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.4)), url('/assets/images/usermain.jpg')"}}>
            <div className="wrapper text-center">
                <p className="h1-bold mb-40 tracking-wider">PROFILE</p>
            </div>
        </div>
        <div className="wrapper flex justify-center flex-wrap lg:flex-nowrap my-20 lg:gap-20 gap-10">
            <div className='flex flex-col items-center gap-3 h-fit lg:w-[30%]'>
                <Image src={user.imageUrl} alt={user.firstName} className='aspect-square object-cover object-center rounded-full' width={300} height={300} />
                <div className='flex-center gap-3 mt-4'>
                    <Image src={"/assets/icons/edit.svg"} alt='edit' width={25} height={25} />
                    <Link className='text-lg text-blue-500 hover:underline' href={`/users/${id}/update`}>Update Profile</Link>
                </div>
                <div className='flex-center gap-3'>
                    <Image src={"/assets/icons/delete.svg"} alt='delete' width={25} height={25} />
                    <AlertDialog>
                        <AlertDialogTrigger className='text-lg text-red-600 hover:underline'>Delete Profile</AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this user account
                                and remove the data from our servers.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <div className='lg:w-[70%] bg-red-50 py-8'>
                <h2 className='h1-bold uppercase text-center tracking-wider'>{user.firstName} {user.lastName}</h2>
                <p className='p-regular-24 text-center mb-10 text-gray-500'>{user.username}</p>
                <div className='flex items-center p-regular-24 gap-3 ps-10 lg:ps-20'>
                    <p>Role: </p>
                    <p className='text-gray-600 text-xl'>{user.role}</p>
                </div>
                <div className='flex items-center p-regular-24 gap-3 ps-10 lg:ps-20 mt-3'>
                    <p>Email: </p>
                    <p className='text-gray-600 text-xl'>{user.email}</p>
                </div>
                <div className='flex items-center p-regular-24 gap-3 ps-10 lg:ps-20 mt-3'>
                    <p>City: </p>
                    <p className='text-gray-600 text-xl'>{user.city}</p>
                </div>
                <div className='flex items-center p-regular-24 gap-3 ps-10 lg:ps-20 mt-3'>
                    <p>State: </p>
                    <p className='text-gray-600 text-xl'>{user.state}</p>
                </div>
                <div className='flex items-center p-regular-24 gap-3 ps-10 lg:ps-20 mt-3'>
                    <p>Joined on: </p>
                    <p className='text-gray-600 text-xl'>{formatDateTime(user.createdAt).dateOnly}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default User