import { FC, Ref, useState, forwardRef } from 'react'
import { motion } from "framer-motion"
import Paragraph from '@/ui/Paragraph'
import { cn } from '@/lib/utils'

interface DropdownMenuProps {
    ref?: Ref<HTMLDivElement>
    children?: any
}

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(({
    children
}, ref) => {
    return (
        <motion.div 
        className='flex flex-col absolute top-14 left-0 bg-inherit rounded w-80 z-10 py-2'
        transition={{ duration: .1 }}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1}}
        exit={{ y: -10, opacity: 0 }}
        ref={ref}
        >
            {children}
        </motion.div>
    )
})

DropdownMenu.displayName = "DropdownMenu"

interface DropdownItemProps {
    label: string
    className?: string
    selected: string
    handleSelected: any
}

const DropdownItem: FC<DropdownItemProps> = ({label, className, handleSelected, selected}) => { 
    return (
        <option>
            <input 
            className={cn(`dark:hover:bg-slate-400 flex items-center transition-colors cursor-pointer ${selected === "true"? "bg-slate-500" : ""}`, className)} 
            onChange={handleSelected}
            checked={selected === "true"}
            type="checkbox"
            />
            <Paragraph>{label}</Paragraph>
        </option>
    )
}
DropdownItem.displayName = "DropdownItem"



export {
    DropdownMenu,
    DropdownItem
} 
