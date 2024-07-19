"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { Separator } from '../ui/separator'
import NotiCard from './NotiCard'
import { getAllNotis } from '@/lib/actions/notification.actions'

const NotificationSection = () => {
    const [allNotis, setAllNotis] = useState([])
    const [totalDocs, setTotalDocs] = useState(0)
    useEffect(() => {
        const getNotis = async () => {
            try {
                const notis = await getAllNotis()
                setAllNotis(notis.data)
                setTotalDocs(notis.totalDocs)
            } catch (error) {
                console.log(error);
            }
        }
        getNotis()
    },[])

    const notisPerPage = 10
    const [startInd, setStartInd] = useState(0)
    const [endInd, setEndInd] = useState(notisPerPage)
  return (
    <div className="lg:w-full md:w-[80%] h-full w-full flex-between flex-col bg-white rounded-lg px-4" id='users'>
        <div className='w-full'>
            <div className='w-full py-5 px-4 flex-between'>
                <div className='flex items-center gap-5'>
                    <Image src={"/assets/icons/bell.gif"} alt='noti' width={35} height={35} />
                    <p className='p-bold-24'>NOTIFICATIONS</p>
                </div>
            </div>
            {
                allNotis.slice(startInd, endInd).map((noti) => (
                    <NotiCard key={noti._id} noti={noti} />
                ))
            }
            <Separator />
        </div>
        <div className='py-2'>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious className={startInd <= 0 ? "pointer-events-none opacity-50" : ""}
                        onClick={() => {
                            setStartInd(prev => prev - notisPerPage)
                            setEndInd(prev => prev - notisPerPage)
                        }} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext className={endInd >= totalDocs ? "pointer-events-none opacity-50" : ""}
                        onClick={() => {
                            setStartInd(prev => prev + notisPerPage)
                            setEndInd(prev => prev + notisPerPage)
                        }} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    </div>
  )
}

export default NotificationSection