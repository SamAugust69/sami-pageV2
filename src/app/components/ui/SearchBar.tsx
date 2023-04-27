import { cn } from '@/app/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { FC, HTMLAttributes, useState, useRef, useEffect } from 'react'
import { ChevronDown, SearchIcon } from "lucide-react"
import Button from '@/ui/Button'
import { DropdownItem, DropdownMenu } from '@/ui/DropdownMenu'
import { motion } from "framer-motion"


export const searchBarVariants = cva(
    "rounded flex focus:ring-2 outline-none mx-auto flex flex-col justify-center relative overflow-hidden transition-all", {
    variants: {
        variant: {
            default: "bg-slate-400 dark:bg-slate-300 dark:text-slate-600",
        },
        size: {
            default: "py-2 px-4 h-12",
            sm: "px-4 h-10"
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
        open: {width: "22rem"},
        closed: {width: "2rem"}
    }

    return (
        <motion.div 
        className={cn(searchBarVariants({size, variant}), className)}
        animate={searchOpen ? "open" : "closed"}
        variants={variants}
        transition={{duration: 0.1, type: "spring", bounce: 0.25}}
        >
            <div className='flex justify-center items-center'>
                <SearchIcon onClick={() => setSearchOpen(!searchOpen)} className={`w-5 h-5 absolute ${searchOpen ? "left-4": "left-1.5"} `}/>

                <input className="bg-transparent outline-none px-2" type="text" onChange={onChange} {...props}/>
                <Button ref={dropdownButton} onClick={() => setDropdownOpen(!dropdownOpen)} variant="link" size="sm"><ChevronDown className={`w-5 h-5 transition-transform dark:text-slate-600 ${dropdownOpen ? "rotate-180" : ""}`}/></Button>
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