import { cn } from '@/app/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { FC, HTMLAttributes, useState, useRef, useEffect } from 'react'
import { ChevronDown, SearchIcon } from "lucide-react"
import Button from '@/ui/Button'
import { DropdownItem, DropdownMenu } from '@/ui/DropdownMenu'


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
    currentFilter: any
    filters: any
}

const SearchBar: FC<SearchBarProps> = (({
    className, onChange, children, variant, size, filters, ...props
}) => {
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
        <div className={cn(searchBarVariants({size, variant}), className)}>
            <div className='flex justify-center items-center'>
                <SearchIcon className="w-5"/>
                <input className="bg-transparent outline-none px-2" type="text" onChange={onChange} {...props}/>
                <Button ref={dropdownButton} onClick={() => setDropdownOpen(!dropdownOpen)} variant="link" size="sm"><ChevronDown className={`w-5 transition-transform dark:text-slate-600 ${dropdownOpen ? "rotate-180" : ""}`}/></Button>
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
        </div>
    )
})



SearchBar.displayName = "SearchBar"

export default SearchBar