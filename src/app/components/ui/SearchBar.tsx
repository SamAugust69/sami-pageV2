import { cn } from '@/app/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { FC, HTMLAttributes, useState, useRef, useEffect } from 'react'
import { ChevronDown, SearchIcon } from "lucide-react"
import Button from '@/ui/Button'
import { DropdownItem, DropdownMenu } from '@/ui/DropdownMenu'
import { motion } from "framer-motion"


export const searchBarVariants = cva(
    "rounded flex focus:ring-2 outline-none flex flex-col justify-center relative transition-all", {
    variants: {
        variant: {
            default: "bg-slate-400 dark:bg-slate-300 dark:text-slate-600",
        },
        size: {
            default: "py-2 px-4 h-12",
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

    const variants = {
        open: {width: "21rem"},
        closed: {width: "3.25rem"}
    }

    return (
        <motion.div 
        className={cn(searchBarVariants({size, variant}), className)}
        animate={searchOpen ? "open" : "closed"}
        variants={variants}
        transition={{duration: 0.5, type: "spring"}}
        >
            <div className='flex justify-start items-center'>
                <Button ref={dropdownButton} onClick={() => setSearchOpen(!searchOpen)} variant="link" size="sm"><SearchIcon className={`w-5 h-5 dark:text-slate-600 ${searchOpen ? "left-2": "left-1"} `}/></Button>

                <input className={`bg-transparent outline-none w-24 `} type="text" onChange={onChange} {...props}/>
                <Button ref={dropdownButton} className='mr-2' onClick={() => setDropdownOpen(!dropdownOpen)} variant="link" size="sm"><ChevronDown className={`w-5 h-5 transition-transform dark:text-slate-600 ${dropdownOpen ? "rotate-180" : ""}`}/></Button>
            </div>
            {dropdownOpen &&
                <DropdownMenu ref={dropdownRef}>
                    {
                        dropdownFilters.map((val: any, key: number) => {
                            return (<DropdownItem 
                                label={val.label} 
                                key={key} 
                                selected={val.selected} 
                                handleSelected={() => handleChange(val.id)}
                                />)
                        })
                    }
                </DropdownMenu>
            }
        </motion.div>
    )
})



SearchBar.displayName = "SearchBar"

export default SearchBar