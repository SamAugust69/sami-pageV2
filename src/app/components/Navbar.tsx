"use client"

import { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button, buttonVariants, iconButtonVariants } from '@/ui/Button'
import { RxBackpack, RxDashboard, RxCaretRight} from "react-icons/rx"
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
            tooltip: "Home",
            link: "/documentation"
        },
        {
            icon: RxDashboard,
            tooltip: "Home",
            link: "/logs"
        },
    ]

    const router = usePathname()

    return (
        <nav className='z-20 border-r-2 border-slate-400 dark:border-slate-800 h-screen bg-slate-200 dark:bg-slate-600 w-20'>
            <div className='container py-2 mx-auto flex flex-col items-center justify-between h-full shadow-2xl'>
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
                                {key === 0 && <span className='border-b-2 w-10 border-slate-400'></span>}
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