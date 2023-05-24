import { FC, Ref, useState, forwardRef, HTMLAttributes } from 'react'
import { motion } from "framer-motion"
import Paragraph from '@/ui/Paragraph'
import { cn } from '@/lib/utils'

interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    children?: any
}

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(({
    children, className
}, ref) => {
    return (
        <motion.div 
        className={cn('flex flex-col absolute top-14 left-0 bg-inherit rounded z-20 py-2', className)}
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

interface DropdownItemProps extends HTMLAttributes<HTMLInputElement> {
    label: string
    selected: string
    handleSelected: any
}

const DropdownItem: FC<DropdownItemProps> = ({label, className, handleSelected, selected}) => { 
    return (
        <option
        className={cn(`dark:hover:bg-slate-400 flex items-center transition-colors cursor-pointer ${selected === "true"? "bg-slate-500" : ""} ${className}`)} 
        onClick={handleSelected}
        >
            <Paragraph>{label}</Paragraph>
        </option>
    )
}
DropdownItem.displayName = "DropdownItem"



export {
    DropdownMenu,
    DropdownItem
} 
