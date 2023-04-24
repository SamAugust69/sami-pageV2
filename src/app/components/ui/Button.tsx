import { cn } from '@/app/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { ButtonHTMLAttributes, FC, Ref, forwardRef } from 'react'
import { Loader2 } from "lucide-react"


export const buttonVariants = cva(
    "rounded active:scale-95 focus:ring-2 disabled:pointer-events-none inline-flex items-center justify-center text-sm font-medium",
    {    
        variants: {
            variant: {
                default: "bg-slate-400 dark:bg-slate-300 dark:text-slate-900",
                link: "bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
                hidden: "bg-transparent dark:hover:bg-slate-700 hover:bg-slate-200"
            },
            size: {
                default: "h-10 py-2 px-4",
                sm: "h-8 p-2",
                xs: "h-6 p-2"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    isLoading?: boolean
    ref?: Ref<HTMLButtonElement>
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(({
    className, children, variant, isLoading, size, ...props
}, ref) => {
    return (
        <button className={cn(buttonVariants({variant, size, className}))} ref={ref} disabled={isLoading} {...props}>
            {isLoading ? <Loader2/> : null}
            {children}
        </button>
    )
})

Button.displayName = "Button"
export default Button