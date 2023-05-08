import { cn } from '@/app/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { FC, HTMLAttributes, useState, useRef, useEffect } from 'react'
import { ChevronDown, SearchIcon } from "lucide-react"
import {Button} from '@/ui/Button'
import { DropdownItem, DropdownMenu } from '@/ui/DropdownMenu'
import { motion } from "framer-motion"


export const searchBarVariants = cva(
    "rounded flex focus:ring-2 outline-none flex justify-center w-72 sm:w-96 relative shadow-md", {
    variants: {
        variant: {
            default: " border-2 border-slate-400 dark:border-slate-800 bg-slate-200 dark:bg-slate-600",
        },
        size: {
            default: "py-2 px-4",
            sm: "px-2 h-10"
        }
    },
    defaultVariants: {
        variant: 'default',
        size: "default"
    }
})

interface SearchBarProps extends HTMLAttributes<HTMLInputElement>, VariantProps<typeof searchBarVariants> { 
    onChange: React.ChangeEventHandler<HTMLInputElement>
    currentFilter: any
    filters: any
}

const SearchBar: FC<SearchBarProps> = (({
    className, onChange, children, variant, size, filters, ...props
}) => {
    const [searchOpen, setSearchOpen] = useState(false)

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [dropdownFilters, setDropdownFilters] = useState(filters)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const dropdownButton = useRef<HTMLButtonElement>(null)

    // [ {"filter": "matchFilter", "label": "Match"}, {"filter": "teamFilter", "label": "Team"} ]


    const handleDropDown = (e: any) => {
        if (dropdownOpen && !dropdownRef.current?.contains(e.target) && !dropdownButton.current?.contains(e.target)) {
            setDropdownOpen(false)
        }
    }

    const handleChange = (id: string) => {
        let newItems = filters.map((item: any) => {
            if (item.id != id) {
                return {...item, selected: "false"}
            }
            return {...item, selected: "true"}
        })
        setDropdownFilters(newItems)
    }

    useEffect(() => {
        document.addEventListener("mouseup", handleDropDown)
    })


    return (
        <div 
        className='w-full flex justify-center'
        >
            <div className={cn(searchBarVariants({size, variant}), className)}>
                <Button ref={dropdownButton} onClick={() => setSearchOpen(!searchOpen)} variant="link" size="sm"><SearchIcon className={`w-5 h-5 mx-1 dark:text-slate-200`}/></Button>

                <input placeholder='155' className={`bg-transparent outline-none w-2/3`} type="text" onChange={onChange} {...props}/>
                <Button ref={dropdownButton} className='mr-2' onClick={() => setDropdownOpen(!dropdownOpen)} variant="link" size="sm"><ChevronDown className={`w-5 h-5 mx-1 transition-transform dark:text-slate-200 ${dropdownOpen ? "rotate-180" : ""}`}/></Button>
                {dropdownOpen &&
                <DropdownMenu ref={dropdownRef} className="border-2 border-slate-400 dark:border-slate-800 bg-slate-200 dark:bg-slate-600">
                    {
                        dropdownFilters.map((val: any, key: number) => {
                            return (<DropdownItem 
                                label={val.label} 
                                key={key} 
                                selected={val.selected} 
                                handleSelected={() => handleChange(val.id)}
                                className='w-48'
                                />)
                        })
                    }
                </DropdownMenu>
            }
            </div>
        </div>
    )
})



SearchBar.displayName = "SearchBar"

export default SearchBar