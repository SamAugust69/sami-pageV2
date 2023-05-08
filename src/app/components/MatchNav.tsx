import { motion } from 'framer-motion'
import MatchInformation from './MatchInformation'
import { FC, useEffect, useRef, useState } from 'react'

interface MatchNavProps {
    displayedMatches: any
}

const MatchNav: FC<MatchNavProps> = ({displayedMatches}) => {
    const [ width, setWidth ] = useState(0)
    const navRef: any = useRef()

    const handleHorizontalScroll = (e: any) => {
        console.log(navRef.current.clientLeft)
        e.preventDefault()
        navRef.current.scroll({
            left: navRef.current.scrollLeft + e.deltaY
        })
    }

    useEffect(() => {
        setWidth(navRef.current.scrollWidth - navRef.current.offsetWidth)
        navRef.current.addEventListener("wheel", (e: any) => handleHorizontalScroll(e))
    }, [displayedMatches])
    


    return (
        <motion.div ref={navRef} className='my-4 scrollbar-hide overflow-scroll' >
            <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width}} 
            className='flex flex-row gap-4' 
            whileTap={{cursor:"grabbing"}}>
                {displayedMatches.map((val: any, key: number) => {
                    return (
                        <MatchInformation key={key} matchInfo={val} index={key}/>
                    )
                })}
            </motion.div>
        </motion.div>
    )
}

export default MatchNav