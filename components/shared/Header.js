"use client"

import React, { useEffect, useState } from 'react'
import Navlist from './Navlist'
import MobileNav from './MobileNav'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"  

const Header = () => {
    
    const [path, setPath] = useState("")
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        setPath(window.location.pathname)
        const handleScroll = () => {
            const offset = window.scrollY;
            offset > 1 ? setScrolled(true) : setScrolled(false);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <header className={`${scrolled ? 'bg-black' : 'bg-transparent'} text-white z-20 fixed w-full top-0 transition-colors duration-700 p-4`}>
        <div className='wrapper flex justify-end md:justify-between items-center'>
            <div className='hidden md:block'>
                <Navlist />
            </div>
            <div className='w-full md:w-fit flex justify-between items-center gap-2'>
                <div>
                <MobileNav />
                </div>
                <div className='flex justify-center items-center gap-1 md:gap-3'>
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger className='rounded-full p-3 hover:bg-red-500 transition-colors duration-300'>
                            <Image src={"/assets/icons/settings.svg"} alt='Notifications' height={20} width={20} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Settings</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Setting 1</DropdownMenuItem>
                            <DropdownMenuItem>Setting 2</DropdownMenuItem>
                            <DropdownMenuItem>Setting 3</DropdownMenuItem>
                            <DropdownMenuItem>Setting 4</DropdownMenuItem>
                            <DropdownMenuItem>Setting 5</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link href={"/notifications/create"}>
                        <Button className="bg-gradient-to-b from-[#dd4b4b] to-[#ff6947] ml-3">Send Notification</Button>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header