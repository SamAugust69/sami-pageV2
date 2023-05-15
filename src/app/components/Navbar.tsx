"use client"

import { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { iconButtonVariants } from '@/ui/Button'
import { RxActivityLog, RxDashboard } from "react-icons/rx"
import ThemeToggle from './ThemeToggle'

interface NavbarProps {

}

// https://realtimecolors.com/get-suggestions?colors=000000-ffffff-4685ff-f2f2f2-ffb084
// #6C837D #ABB6BA #7E9595 #BCC8C2 #98AA9C
const Navbar: FC<NavbarProps> = ({}) => {

    const navBarItems = [
        {
            icon: RxActivityLog,
            className: "bg-[#6c837d] text-[#bcc8c2] border-[#98aa9c] dark:bg-[#8285ce] dark:text-[#d5ebf1]",
            tooltip: "Home",
            link: "/"
        },
        {
            icon: RxDashboard,
            className: "bg-slate-300 dark:bg-slate-400 border-blue-200",
            tooltip: "Home",
            link: "/logs"
        },
    ]

    const router = usePathname()

    return (
        <nav className='z-20 border-r-2 border-slate-400 dark:border-slate-800 min-h-max bg-slate-200 dark:bg-slate-600 w-20 shadow-2xl'>
            <div className='container py-2 mx-auto flex flex-col items-center justify-between h-screen'>
                <div className='flex flex-col items-center'>
                    {navBarItems.map((val: any, key: number) => {
                        const Icon = val.icon
                        return (
                            <>
                                <Link 
                                    href={val.link} 
                                    key={key}
                                    className={`${router === val.link ? "border-2" : ""} ${iconButtonVariants({variant: "default", size: "default"})} ${val.className}`}
                                >   
                                    <Icon className='w-5 h-5'/>
                                </Link>
                                {key === 0 && <span className='border-b-2 w-10 border-slate-400 rounded'></span>}
                            </>
                        )
                    })}
                </div>
                <ThemeToggle />
            </div>
        </nav>
    )
}


Navbar.displayName = "Navbar"
export default Navbar