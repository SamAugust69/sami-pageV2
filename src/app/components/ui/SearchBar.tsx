import { cn } from '@/app/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { FC, forwardRef, HTMLAttributes, useState } from 'react'
import { ChevronDown, ChevronUp, SearchIcon } from "lucide-react"
import Button from '@/ui/Button'


export const searchBarVariants = cva(
    "rounded flex focus:ring-2 outline-none w-80 mx-auto flex justify-center items-center", {
    variants: {
        variant: {
            default: "bg-slate-400 dark:text-slate-700",
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

interface InputProps extends HTMLAttributes<HTMLInputElement>, VariantProps<typeof searchBarVariants> { 
    onChange: React.ChangeEventHandler<HTMLInputElement>
}


const SearchBar: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(({
    className, onChange, children, variant, size, ...props
}, ref) => {
    const [open, setOpen] = useState(false)

    return (
        <div className={cn(searchBarVariants({size, variant}), className)}>
            <SearchIcon className='w-5'/>
            <input className="bg-transparent outline-none px-2" ref={ref} type="text" onChange={onChange} {...props}/>
            <Button onClick={() => setOpen(!open)} variant="link" size="sm"><ChevronDown className='w-5'/></Button>
        </div>
    )
})

SearchBar.displayName = "SearchBar"

export default SearchBar