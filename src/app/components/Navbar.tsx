import { FC } from 'react'

import Link from 'next/link'
import Button, { buttonVariants } from '@/ui/Button'
import ThemeToggle from './ThemeToggle'

interface NavbarProps {

}

const Navbar: FC<NavbarProps> = ({}) => {
    return (
        <nav className='fixed left-0 top-0 backdrop-blur-sm border-b border-slate-200 dark:border-slate-600 w-screen'>
            <div className='container max-w-7xl py-2 mx-auto flex justify-between items-center px-6'>
            <Link className={buttonVariants({variant: "link"})} href="/">Sami Scouting</Link>
                <div className='flex gap-2 items-center '>
                    <div className='mr-2 md:border-r px-4 border-slate-200 dark:border-slate-600'>
                        <ThemeToggle/>
                    </div>
                    <div className='hidden md:flex gap-2'>
                        <Link className={buttonVariants({variant: "link"})} href="/"> Documentation</Link>
                        <Link className={buttonVariants({variant: "default"})} href="/"> Logs</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}


Button.displayName = "Navbar"
export default Navbar