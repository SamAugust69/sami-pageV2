import { forwardRef, HTMLAttributes } from 'react'
import { VariantProps, cva } from "class-variance-authority"
import { cn } from '@/app/lib/utils'

const inputVariants = cva(
    "peer flex bg-slate-200 dark:bg-slate-600 disabled:pointer-events-none outline-none rounded-none",
    {
        variants: {
            size: {
                default: "h-8 px-1 w-full"
            }
        },
        defaultVariants: {
            size: "default"
        }
    }
)

interface InputProps extends HTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
    disabled?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className, size, children, disabled, ...props
}, ref) => {
    return (
        <div className=" mx-5 my-3 relative bg-gradient-to-r from-slate-400 to-slate-300 dark:from-slate-400 dark:to-slate-500 pb-0.5" ref={ref}>
            <input required disabled={disabled} className={cn(inputVariants({size, className}))} {...props} type="text" />
            <span className="absolute top-0 left-0 peer-focus:text-xs peer-focus:text-slate-500 dark:peer-focus:text-slate-200 peer-focus:-top-2.5 peer-valid:text-xs peer-valid:text-slate-500 dark:peer-valid:text-slate-200 peer-valid:-top-2.5 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-500 dark:peer-placeholder-shown:text-slate-200 peer-placeholder-shown:-top-2.5" placeholder=''>{children}</span>
        </div>
    )
})

Input.displayName = "Input"
export default Input