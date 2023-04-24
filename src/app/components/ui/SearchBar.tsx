import { cn } from '@/app/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { FC, HTMLAttributes, useState, useRef, useEffect } from 'react'
import { ChevronDown, SearchIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Button from '@/ui/Button'
import Paragraph from '@/ui/Paragraph'


export const searchBarVariants = cva(
    "rounded flex focus:ring-2 outline-none w-80 mx-auto flex flex-col relative", {
    variants: {
        variant: {
            default: "bg-slate-400 dark:bg-slate-300 dark:text-slate-600",
        },
        size: {
            default: "my-2 py-2 px-4",
        }
    },
    defaultVariants: {
        variant: 'default',
        size: "default"
    }
})

interface SearchBarProps extends HTMLAttributes<HTMLInputElement>, VariantProps<typeof searchBarVariants> { 
    onChange: React.ChangeEventHandler<HTMLInputElement>
    filters: any
}

const SearchBar: FC<SearchBarProps> = (({
    className, onChange, children, variant, size, filters, ...props
}) => {
    const [open, setOpen] = useState(true)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const dropdownButton = useRef<HTMLButtonElement>(null)

    // [ {"filter": "matchFilter", "label": "Match"}, {"filter": "teamFilter", "label": "Team"} ]


    const handleDropDown = (e: any) => {
        if (open && !dropdownRef.current?.contains(e.target) && !dropdownButton.current?.contains(e.target)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mouseup", handleDropDown)
    })
    return (
        <div className={cn(searchBarVariants({size, variant}), className)}>
            <div className='flex justify-center items-center'>
                <SearchIcon className="w-5"/>
                <input className="bg-transparent outline-none px-2" type="text" onChange={onChange} {...props}/>
                <Button ref={dropdownButton} onClick={() => setOpen(!open)} variant="link" size="sm"><ChevronDown className={`w-5 transition-transform dark:text-slate-600 ${open ? "rotate-180" : ""}`}/></Button>
            </div>
            {open && 
            <motion.div 
            className='flex flex-col absolute top-14 left-0 bg-inherit rounded w-80 z-10 py-2'
            transition={{ duration: .1 }}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1}}
            exit={{ y: -10, opacity: 0 }}
            ref={dropdownRef}
            >
                {filters.map((val: any, key: number) => {
                    return (
                        <div className='dark:hover:bg-blue-600 flex items-center transition-colors cursor-pointer' key={key}>
                            <Paragraph className='text-left dark:text-slate-600 p-2 m-0' size="sm">{val.label}</Paragraph>
                        </div>
                    )
                })}


                
            </motion.div>}
        </div>
    )
})



SearchBar.displayName = "SearchBar"

export default SearchBar