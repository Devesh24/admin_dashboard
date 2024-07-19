"use client"

import NotificationSection from "@/components/shared/NotificationSection";
import TaskBarGraph from "@/components/shared/TaskBarGraph";
import TaskSection from "@/components/shared/TaskSection";
import UserGraph from "@/components/shared/UserGraph";
import UserSection from "@/components/shared/UserSection";
import { getAllNotis } from "@/lib/actions/notification.actions";
import { getTaskCountBasedOnStatus } from "@/lib/actions/task.actions";
import { getUserCountBasedOnRole } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";
import CountUp from "react-countup";


export default function Home() {
    const [totalUsers, setTotalUsers] = useState(0)
    const [userDataBasedOnRole, setUserDataBasedOnRole] = useState([])
    const [totalTasks, setTotalTasks] = useState(0)
    const [taskDataBasedOnStatus, setTaskDataBasedOnStatus] = useState([])
    const [completedTasks, setCompletedTasks] = useState(0)
    const [unreadNotis, setUnreadNotis] = useState(0)

    useEffect(() => {
        const getData = async () => {
            const users = await getUserCountBasedOnRole()
            setUserDataBasedOnRole(users.data)
            setTotalUsers(users.totalUsers)
            
            const tasks = await getTaskCountBasedOnStatus()
            setTaskDataBasedOnStatus(tasks.data)
            setTotalTasks(tasks.totalTasks)
            setCompletedTasks(() => {
                const completedData = tasks.data.find(item => item.id === "Completed");
                if (completedData) {
                    return completedData.High + completedData.Medium + completedData.Low;
                }
                return 0
            })

            const notis = await getAllNotis()
            setUnreadNotis(notis.unread)
        }
        getData()
    },[])

  return (
    <div>
        <div className='relative top-0 w-full h-[80vh] bg-cover md:bg-center text-white flex justify-center items-end' style={{backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.1)), url('/assets/images/admin_main.jpg')"}}>
            <div className="wrapper text-center">
                <p className="h1-bolder mb-40">ADMIN DASHBOARD</p>
            </div>
        </div>
        <div className="w-full min-h-screen bg-gray-200 py-16" id="analytics">
            <div className="wrapper min-h-screen w-full flex flex-col gap-6">
                <div className="flex-center flex-wrap xl:flex-nowrap w-full gap-6">
                    <div className="xl:w-[25%] lg:w-[35%] md:w-[45%] w-[70%] bg-white flex-center flex-col gap-2  text-center py-6 px-16 rounded-xl">
                        <p className="p-bold-24 underline underline-offset-2">TOTAL NO. OF USERS</p>
                        <p className="h1-bold text-red-600"><CountUp end={totalUsers} /></p>
                    </div>
                    <div className="xl:w-[25%] lg:w-[35%] md:w-[45%] w-[70%] bg-white flex-center flex-col gap-2  text-center py-6 px-16 rounded-xl">
                        <p className="p-bold-24 underline underline-offset-2">TOTAL NO. OF TASKS</p>
                        <p className="h1-bold text-red-600"><CountUp end={totalTasks} /></p>
                    </div>
                    <div className="xl:w-[25%] lg:w-[35%] md:w-[45%] w-[70%] bg-white flex-center flex-col gap-2  text-center py-6 px-16 rounded-xl">
                        <p className="p-bold-24 underline underline-offset-2">COMPLETED TASKS</p>
                        <p className="h1-bold text-red-600"><CountUp end={completedTasks} /></p>
                    </div>
                    <div className="xl:w-[25%] lg:w-[35%] md:w-[45%] w-[70%] bg-white flex-center flex-col gap-2  text-center py-6 px-16 rounded-xl">
                        <p className="p-bold-24 underline underline-offset-2">UNREAD NOTIFICATIONS</p>
                        <p className="h1-bold text-red-600"><CountUp end={unreadNotis} /></p>
                    </div>
                </div>
                <div className="w-full flex flex-wrap xl:flex-nowrap xl:justify-between justify-center text-center gap-6">
                    <div className="w-full md:w-[90%] lg:w-[75%] xl:w-[55%] flex flex-col gap-6">
                        <div className="w-full flex-center flex-col bg-white py-6 rounded-xl gap-1">
                            <p className="p-bold-24 underline underline-offset-2">USERS BASED ON ROLES</p>
                            <UserGraph userDataBasedOnRole={userDataBasedOnRole} />
                        </div>
                        <div className="w-full flex-center flex-col bg-white py-6 rounded-xl gap-1">
                            <p className="p-bold-24 underline underline-offset-2">TASKS BASED ON STATUS</p>
                            <TaskBarGraph taskDataBasedOnStatus={taskDataBasedOnStatus} />
                        </div>
                    </div>
                    <div className="w-full lg:w-[60%] xl:w-[45%] flex-center">
                        <NotificationSection />
                    </div>
                </div>
                <div className="flex-center flex-wrap gap-8 w-full">
                    <UserSection />
                    <TaskSection />
                </div>
            </div>
        </div>
    </div>
  );
}
