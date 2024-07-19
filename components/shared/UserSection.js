"use client"

import { getAllUsers } from '@/lib/actions/user.actions'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import UserCard from './UserCard'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { Separator } from '../ui/separator'
import Search from './Search'
import UserFilter from './UserFilter'

const UserSection = () => {

    const [allUsers, setAllUsers] = useState([])
    const [totalDocs, setTotalDocs] = useState(0)
    const [query, setQuery] = useState('');
    const [filterState, setFilterState] = useState("")
    const [filterRole, setFilterRole] = useState("")

    useEffect(() => {
        const getUsers = async () => {
            try {
                const users = await getAllUsers({query, filterState, filterRole})
                setAllUsers(users.data)
                setTotalDocs(users.totalDocs)
                console.log(users.data);
            } catch (error) {
                console.log(error);
            }
        }
        getUsers()
    }, [query, filterRole, filterState])

    const usersPerPage = 6
    const [startInd, setStartInd] = useState(0)
    const [endInd, setEndInd] = useState(usersPerPage)

  return (
    <div className="lg:w-[48%] flex-between flex-col md:w-[80%] w-full min-h-[830px] bg-white rounded-lg px-4" id='users'>
        <div className='w-full'>
            <div className='w-full py-5 px-4 flex-between'>
                <div className='flex items-center gap-5'>
                    <Image src={"/assets/icons/user.gif"} alt='user' width={35} height={35} />
                    <p className='p-bold-24'>USERS</p>
                </div>
                <Link href={"/users/create"}>
                    <Image src={"/assets/icons/add.svg"} alt='add' width={30} height={30} />
                </Link>
            </div>
            <Search placeholder={"Search Name..."} setQuery={setQuery} />
            <UserFilter setFilterState={setFilterState} setFilterRole={setFilterRole} />
            {
                allUsers.slice(startInd, endInd).map((user) => (
                    <UserCard key={user._id} user={user} />
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
                            setStartInd(prev => prev - usersPerPage)
                            setEndInd(prev => prev - usersPerPage)
                        }} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext className={endInd >= totalDocs ? "pointer-events-none opacity-50" : ""}
                        onClick={() => {
                            setStartInd(prev => prev + usersPerPage)
                            setEndInd(prev => prev + usersPerPage)
                        }} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    </div>
  )
}

export default UserSection