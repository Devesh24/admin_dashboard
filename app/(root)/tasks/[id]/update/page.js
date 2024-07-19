"use client"

import TaskForm from '@/components/shared/TaskForm'
import { getTask } from '@/lib/actions/task.actions'
import { useEffect, useState } from 'react'

const UpdateTask = ({params: {id}}) => {
    const [task, setTask] = useState({})
    useEffect(() => {
        const getTaskbyId = async () => {
            const data = await getTask(id)
            setTask(data)
        }
        getTaskbyId()
    },[])

  return (
    <div>
        <div className='relative top-0 w-full h-[70vh] bg-cover md:bg-center text-white flex justify-center items-end' style={{backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.4)), url('/assets/images/banner.jpg')"}}>
            <div className="wrapper text-center">
                <p className="h1-bold mb-40">UPDATE TASK</p>
            </div>
        </div>
        <div className="w-full flex-center min-h-screen">
            <TaskForm type="Update" task={task} />
        </div>
    </div>
  )
}

export default UpdateTask