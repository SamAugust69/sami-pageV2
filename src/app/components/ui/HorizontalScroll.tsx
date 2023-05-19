import { cn } from '@/app/lib/utils'
import { FC, useRef, useEffect, HTMLAttributes } from 'react'

interface HorizontalScrollProps extends HTMLAttributes<HTMLDivElement> {

}

const HorizontalScroll: FC<HorizontalScrollProps> = ({children, className}) => {
    const navRef: any = useRef()

    const handleHorizontalScroll = (e: any) => {
        e.preventDefault()
        navRef.current.scrollBy({
            left: -e.wheelDeltaY
        })
    }

    useEffect(() => {
        navRef.current.addEventListener("wheel", handleHorizontalScroll)
    }, [])

    return (
        <div ref={navRef} className={cn(`scrollbar-hide overflow-scroll relative my-4 ${className}`)}>
            {children}
        </div>
    )
}

export default HorizontalScroll