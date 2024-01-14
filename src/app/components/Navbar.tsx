"use client"

import { FC, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { iconButtonVariants } from '@/ui/Button'
import { RxActivityLog } from "react-icons/rx"
import { RiArchive2Fill, RiArchive2Line, RiBook2Fill, RiBook2Line, RiFolderFill, RiFolderLine, RiHome2Line  } from "react-icons/ri"
import ThemeToggle from './ThemeToggle'

interface NavbarProps {

}

// https://realtimecolors.com/get-suggestions?colors=000000-ffffff-4685ff-f2f2f2-ffb084
// #6C837D #ABB6BA #7E9595 #BCC8C2 #98AA9C
const Navbar: FC<NavbarProps> = ({}) => {
    
    const [logDropdown, setLogDropdown] = useState(false)

    // const navBarItems = [
    //     {
    //         icon: RxActivityLog,
    //         className: "bg-[#6c837d] text-[#bcc8c2] border-[#98aa9c] dark:bg-[#8285ce] dark:text-[#d5ebf1]",
    //         tooltip: "Home",
    //         link: "/"
    //     },
    //     {
    //         icon: RxDashboard,
    //         className: "bg-slate-300 dark:bg-slate-400 border-blue-200",
    //         tooltip: "Home",
    //         link: "/logs"
    //     },
    // ]

    const router = usePathname()

    return (
        <nav className='z-20 border-r-2 border-slate-400 dark:border-slate-800 min-h-max bg-slate-200 dark:bg-slate-600 w-20 shadow-2xl'>
            <div className='container py-2 mx-auto flex flex-col items-center justify-between h-screen'>
                <div className='flex flex-col items-center'>
                        <Link 
                            href="/" 
                            className={`${router === "/" ? "border-2" : ""} ${iconButtonVariants({variant: "default", size: "default"})} bg-[#6c837d] text-[#bcc8c2] border-[#98aa9c] dark:bg-[#8285ce] dark:text-[#d5ebf1]`}
                        >   
                            <RiHome2Line className='w-5 h-5'/>
                        </Link>
                        <span className='border-b-2 w-10 border-slate-400 rounded'></span>
                        <div className='m-2 rounded border-2 border-slate-400 bg-slate-400 flex flex-col'>
                            <button 
                                className={` ${iconButtonVariants({variant: "default", size: "dropdown"})} bg-slate-300 dark:bg-slate-400 border-slate-400`}
                                onClick={() => setLogDropdown(!logDropdown)}
                            >   
                                <RiArchive2Line className='w-5 h-5'/>
        
                            </button>
                            {
                                logDropdown && (
                                    <div className='bg-slate-400 w-12 flex flex-col mt-2 gap-1'>
                                        <Link 
                                        href="/logs/server"
                                            className={` ${iconButtonVariants({variant: "default", size: "dropdown"})}  dark:bg-slate-400 border-slate-400`}
                                        >   
                                            <RiFolderLine className='w-5 h-5'/>
                    
                                        </Link>
                                        <Link 
                                            href="/logs/local"
                                            className={` ${iconButtonVariants({variant: "default", size: "dropdown"})}  dark:bg-slate-400 border-slate-400`}
                                        >   
                                            <RiBook2Line className='w-5 h-5'/>
                    
                                        </Link>
                                    </div>
                                )
                            }

                        </div>
                </div>
                <ThemeToggle />
            </div>
        </nav>
    )
}


Navbar.displayName = "Navbar"
export default Navbar