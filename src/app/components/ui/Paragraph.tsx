import { forwardRef, HTMLAttributes } from "react"
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/app/lib/utils"

const paragraphVarients = cva(
    "max-w-prose text-slate-700 dar:text-slate-300 mb-2 text-center",
    {
        variants: {
            size: {
                default: "text-base sm:text-lg",
                sm: 'text-sm, sm:text-base'
            }
        },
        defaultVariants: {
            size: "default"
        }
    }
)

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof paragraphVarients> {}

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(({
    className, size, children, ...props
}, ref) => {
    return (
        <p ref={ref} className={cn(paragraphVarients({size, className}))} {...props}>{children}</p>
    )
})

Paragraph.displayName="Paragraph"
export default Paragraph