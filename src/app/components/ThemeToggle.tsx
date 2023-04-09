"use client"

import { FC } from 'react'
import Button from '@/ui/Button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'


interface ThemeToggleProps {

}

const ThemeToggle: FC<ThemeToggleProps> = ({}) => {
    const { theme, setTheme } = useTheme()

    return (
        <Button variant="hidden" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className='scale-0 transition-all dark:-rotate-90 dark:scale-0 dark:text-slate-400 dark:hover:text-slate-100'/>
            <Moon className='absolute scale-100 transition-all hover:text-slate-900 dark:rotate-0 dark:scale-100 dark:slate-400 dark:hover:text-slate-100'/>
        </Button>
    )
}

export default ThemeToggle