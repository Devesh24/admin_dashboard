import React from 'react'
import { Separator } from '../ui/separator'
import { formatDateTime } from '@/lib/utils'

const NotiCard = ({noti}) => {
  return (
    <>
        <Separator />
        <div className='w-full py-6 px-4 flex items-center justify-between gap-3 hover:bg-slate-50'>
            <div className='flex flex-col gap-1 text-right text-sm w-[65%] md:w-[70%]'>
                <div className='flex items-center gap-3 text-left'>
                    <p className="font-bold">{noti.title}</p>
                    <p className='text-gray-500 text-sm hidden md:block'>{formatDateTime(noti.createdAt).dateOnly}</p>
                </div>
                <p className='text-left line-clamp-1'>{noti.description}</p>
            </div>
            <div className='flex flex-col gap-1 text-right text-sm'>
                <p className="uppercase">{noti.senderName}</p>
            </div>
        </div>
    </>
  )
}

export default NotiCard