"use client"

import { FC } from 'react'
import { IconButton } from '@/ui/Button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'


interface ThemeToggleProps {

}

const ThemeToggle: FC<ThemeToggleProps> = ({}) => {
    const { theme, setTheme } = useTheme()

    return (
        <IconButton className="group-hover:border-yellow-400" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className='group scale-0 transition-all dark:scale-100 dark:-rotate-90 hover:text-yellow-400'/>
            <Moon className='absolute scale-100 transition-all dark:scale-0 hover:text-slate-700'/>
        </IconButton>
    )
}

export default ThemeToggle