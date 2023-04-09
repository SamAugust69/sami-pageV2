import { FC } from 'react'

import Link from 'next/link'
import Button, { buttonVariants } from '@/ui/Button'
import ThemeToggle from './ThemeToggle'

interface NavbarProps {

}

const Navbar: FC<NavbarProps> = ({}) => {
    return (
        <nav className='fixed left-0 top-0 backdrop-blur-sm border-b border-slate-200 dark:border-slate-600 w-screen'>
            <div className='container max-w-7xl py-2 mx-auto flex justify-between items-center'>
            <Link className={buttonVariants({variant: "link"})} href="/">Sami Scouting</Link>
                <div className='flex gap-2 items-center '>
                    <div className='mr-2 border-r px-4 border-slate-200 dark:border-slate-600'>
                        <ThemeToggle>

                        </ThemeToggle>
                    </div>
                    <Link className={buttonVariants({variant: "link", size: "sm"})} href="/"> Documentation</Link>
                    <Button variant="default">Dashboard</Button>
                </div>
            </div>
        </nav>
    )
}


Button.displayName = "Navbar"
export default Navbar