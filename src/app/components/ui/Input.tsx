import { forwardRef, HTMLAttributes } from 'react'
import { VariantProps, cva } from "class-variance-authority"
import { cn } from '@/app/lib/utils'

const inputVariants = cva(
    "border border-slate-700 rounded flex bg-transparent focus:ring-2 disabled:pointer-events-none outline-none valid:bg-red-100",
    {
        variants: {
            size: {
                default: "m-2 h-8 px-2"
            }
        },
        defaultVariants: {
            size: "default"
        }
    }
)

interface InputProps extends HTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
    disabled: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className, size, children, disabled, ...props
}, ref) => {
    return (
        <div className="relative" ref={ref}>
            <input required disabled={disabled} className={cn(inputVariants({size, className}))} {...props} type="text" />
            <span className="absolute top-0">{children}</span>
        </div>
    )
})

Input.displayName = "Input"
export default Input