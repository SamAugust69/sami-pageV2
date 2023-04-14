import { cn } from '@/app/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { FC, forwardRef, HTMLAttributes } from 'react'
import { Loader2, SearchIcon } from "lucide-react"


export const searchBarVariants = cva(
    "rounded flex focus:ring-2 disabled:pointer-events-none outline-none", {
    variants: {
        variant: {
            default: "bg-slate-400 dark:bg-slate-300",
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
    return (
        <div className='relative flex justify-center mx-24'>
            <input className={cn(searchBarVariants({size, variant}), className)}ref={ref} type="text" onChange={onChange} {...props}/>
            <p className='absolute left-0'>test</p>
            <SearchIcon className='absolute left-1 top-1/2'/>
        </div>
    )
})

SearchBar.displayName = "SearchBar"

export default SearchBar