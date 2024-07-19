import React from 'react'
import { Separator } from '../ui/separator'
import Link from 'next/link'

const UserCard = ({user}) => {
  return (
    <>
        <Separator />
        <Link href={`/users/${user._id}`} className='w-full py-5 px-4 flex items-center justify-between gap-3 hover:bg-slate-50'>
            <div className='flex gap-5 items-center'>
                <div className='rounded-full border-2 p-6 bg-cover bg-center' style={{backgroundImage: `url(${user.imageUrl})`}}>
                </div>
                <div className='flex flex-col gap-1 text-right text-sm'>
                    <div className='flex items-center gap-3 text-left'>
                        <p className='font-bold'>{user.firstName} {user.lastName}</p>
                        <p className='text-gray-500 text-sm hidden md:block'>{user.username}</p>
                    </div>
                    <p className='text-left'>{user.role}</p>
                </div>
            </div>
            <div className='flex flex-col gap-1 text-right text-sm'>
                <p className='hidden md:block'>{user.email}</p>
                <p>{user.city}, {user.state}</p>
            </div>
        </Link>
    </>
  )
}

export default UserCard
