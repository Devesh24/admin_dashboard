"use client"

import { deleteTask, getTask } from "@/lib/actions/task.actions"
import { formatDateTime } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
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

const Task = ({params: {id}}) => {
    const [task, setTask] = useState({})
    useEffect(() => {
        const getTaskbyId = async () => {
            const data = await getTask(id)
            setTask(data)
        }
        getTaskbyId()
    },[])

    const router = useRouter()
    const handleDelete = async () => {
        const deletedTask = await deleteTask(id)
        if(deletedTask){
            router.push("/")
        }
    }

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
    <div>
        <div className='relative top-0 w-full h-[70vh] bg-cover md:bg-center text-white flex justify-center items-end' style={{backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.2)), url('/assets/images/taskmain.jpg')"}}>
            <div className="wrapper text-center">
                <p className="h1-bold mb-40 tracking-wider">TASK</p>
            </div>
        </div>
        <div className="wrapper my-16">
            <div className="w-full flex justify-center">
                <div className="w-[70%] flex flex-col gap-5">
                    <h2 className="h1-bold">{task.title}</h2>
                    <p className="p-regular-20">{task.description}</p>
                    <div className="flex items-center p-regular-20 gap-3">
                        <p className="font-bold">Created At: </p>
                        <p>{formatDateTime(task.createdAt).dateOnly}</p>
                    </div>
                    <div className="flex items-center p-regular-20 gap-3">
                        <p className="font-bold">Due Date: </p>
                        <p>{formatDateTime(task.dueDate).dateOnly}</p>
                    </div>
                    {task.completedAt && <div className="flex items-center p-regular-20 gap-3">
                        <p className="font-bold">Completed At: </p>
                        <p>{formatDateTime(task.completedAt).dateOnly}</p>
                    </div>}
                    <div className="flex items-center gap-10 mt-3">
                        <div className='flex-center gap-3'>
                            <Image src={"/assets/icons/edit.svg"} alt='edit' width={25} height={25} />
                            <Link className='text-lg text-blue-500 hover:underline' href={`/tasks/${id}/update`}>Update Task</Link>
                        </div>
                        <div className='flex-center gap-3'>
                            <Image src={"/assets/icons/delete.svg"} alt='delete' width={25} height={25} />
                            <AlertDialog>
                                <AlertDialogTrigger className='text-lg text-red-600 hover:underline'>Delete Task</AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete this task and remove the data from our servers.
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
                </div>
                <div className="w-[30%] flex flex-col items-end gap-3 pt-10">
                    <p className={`${statusColor} h5-bold uppercase text-right blinking`}>{task.status}</p>
                    <div className="flex items-center justify-end gap-3">
                        <div className="p-regular-20">Priority Type:</div>
                        <div className={`${priorityColor} p-bold-20 uppercase`}>{task.priority}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Task