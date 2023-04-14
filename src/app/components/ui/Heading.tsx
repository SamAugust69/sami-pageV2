import { cn } from '@/app/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { HTMLAttributes, FC, forwardRef } from 'react'
import { Loader2 } from "lucide-react"


export const headingVariants = cva(
    "text-slate-900 dark:text-slate-200 text-center lg:text-left font-extrabold leading-lose",
    {    
        variants: {
            size: {
                default: "text-4xl md:text-5xl lg:text-6xl",
                sm: "text-3xl md:text-4xl lg:text-5xl",
                lg: "text-5xl md:text-6xl lg:text-7xl"
            }
        },
        defaultVariants: {
            size: "default"
        }
    }
)

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
    isLoading?: boolean
}

const Heading: FC<HeadingProps> = forwardRef<HTMLHeadingElement, HeadingProps>(({
    className, children, size, ...props
}, ref) => {
    return (
        <h1 className={cn(headingVariants({size, className}))} ref={ref} {...props}>
            {children}
        </h1>
    )
})

Heading.displayName = "Heading"
export default Heading