"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navlist = () => {
    const pathName = usePathname()
  return (
    <ul className='w-full flex flex-col items-center md:flex-row text-base gap-8 lg:text-lg lg:gap-10 xl:gap-12 tracking-wide'>
        <li className='hover:text-red-500'>
            <Link href={"/"}>HOME</Link>
        </li>
        <li className='hover:text-red-500'>
            <Link href={"#analytics"}>ANALYTICS</Link>
        </li>
        <li className='hover:text-red-500'>
            <Link href={"#users"}>USER MANAGEMENT</Link>
        </li>
        <li className='hover:text-red-500'>
            <Link href={"#tasks"}>TASK MANAGEMENT</Link>
        </li>
    </ul>
  )
}

export default Navlist