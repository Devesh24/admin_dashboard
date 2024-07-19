"use client"

import { Separator } from '../ui/separator'
import Link from 'next/link'
import { formatDateTime } from '@/lib/utils'
import { useEffect, useState } from 'react'

const TaskCard = ({task}) => {
    const [statusColor, setStatusColor] = useState("")
    const [priorityColor, setPriorityColor] = useState("")

    useEffect(() => {
        if(task.status === "Pending") setStatusColor("text-red-500")
        else if(task.status === "Completed") setStatusColor("text-green-500")
        else if(task.status === "In Progress") setStatusColor("text-blue-500")

        if(task.priority === "Low") setPriorityColor("text-green-500")
        else if(task.priority === "Medium") setPriorityColor("text-orange-500")
        else if(task.priority === "High") setPriorityColor("text-red-500")
    },[task])

  return (
    <>
        <Separator />
        <Link href={`/tasks/${task._id}`} className='w-full py-6 px-4 flex items-center justify-between gap-3 hover:bg-slate-50'>
            <div className='flex flex-col gap-1 text-right text-sm w-[65%] md:w-[70%]'>
                <div className='flex items-center gap-3 text-left'>
                    <p className={`font-bold ${priorityColor}`}>{task.title}</p>
                    <p className='text-gray-500 text-sm hidden md:block'>{formatDateTime(task.createdAt).dateOnly}</p>
                </div>
                <p className='text-left line-clamp-1'>{task.description}</p>
            </div>
            <div className='flex flex-col gap-1 text-right text-sm'>
                <p className={`${statusColor} uppercase`}>{task.status}</p>
                <p>{formatDateTime(task.dueDate).dateOnly}</p>
            </div>
        </Link>
    </>
  )
}

export default TaskCard