"use client"

import { getAllTasks } from '@/lib/actions/task.actions'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import TaskCard from './TaskCard'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { Separator } from '../ui/separator'
import Search from './Search'
import TaskFilter from './TaskFilter'
  

const TaskSection = () => {

    const [allTasks, setAllTasks] = useState([])
    const [totalDocs, setTotalDocs] = useState(0)
    const [query, setQuery] = useState("")
    const [filterStatus, setFilterStatus] = useState("")
    const [filterPriority, setFilterPriority] = useState("")
    useEffect(() => {
        const getTasks = async () => {
            try {
                const tasks = await getAllTasks({query, filterStatus, filterPriority})
                setAllTasks(tasks.data)
                setTotalDocs(tasks.totalDocs)
            } catch (error) {
                console.log(error);
            }
        }
        getTasks()
    }, [query, filterStatus, filterPriority])

    const tasksPerPage = 6
    const [startInd, setStartInd] = useState(0)
    const [endInd, setEndInd] = useState(tasksPerPage)

  return (
    <div className="lg:w-[48%] md:w-[80%] w-full min-h-[830px] flex-between flex-col bg-white rounded-lg px-4" id='tasks'>
        <div className='w-full'>
        <div className='w-full py-5 px-4 flex-between'>
            <div className='flex items-center gap-5'>
                <Image src={"/assets/icons/task.gif"} alt='task' width={35} height={35} />
                <p className='p-bold-24'>TASKS</p>
            </div>
            <Link href={"/tasks/create"}>
                <Image src={"/assets/icons/add.svg"} alt='add' width={30} height={30} />
            </Link>
        </div>
        <Search placeholder={"Search Title..."} setQuery={setQuery} />
        <TaskFilter setFilterStatus={setFilterStatus} setFilterPriority={setFilterPriority} />
        {
            allTasks.slice(startInd, endInd).map((task) => (
                <TaskCard key={task._id} task={task} />
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
                            setStartInd(prev => prev - tasksPerPage)
                            setEndInd(prev => prev - tasksPerPage)
                        }} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext className={endInd >= totalDocs ? "pointer-events-none opacity-50" : ""}
                        onClick={() => {
                            setStartInd(prev => prev + tasksPerPage)
                            setEndInd(prev => prev + tasksPerPage)
                        }} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    </div>
  )
}

export default TaskSection