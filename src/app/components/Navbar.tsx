"use client"

import { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { iconButtonVariants } from '@/ui/Button'
import { RxBackpack, RxDashboard } from "react-icons/rx"
import ThemeToggle from './ThemeToggle'

interface NavbarProps {

}


const Navbar: FC<NavbarProps> = ({}) => {

    const navBarItems = [
        {
            icon: RxBackpack,
            className: "bg-rose-400 text-rose-800 border-rose-800 dark:bg-rose-400",
            tooltip: "Home",
            link: "/"
        },
        {
            icon: RxBackpack,
            className: "bg-slate-300 dark:bg-slate-400 border-blue-200",
            tooltip: "Home",
            link: "/documentation"
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