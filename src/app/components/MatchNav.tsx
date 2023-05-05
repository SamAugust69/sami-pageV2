import { motion } from 'framer-motion'
import MatchInformation from './MatchInformation'
import { FC, useEffect, useRef, useState } from 'react'

interface MatchNavProps {
    displayedMatches: any
}

const MatchNav: FC<MatchNavProps> = ({displayedMatches}) => {
    const [ width, setWidth ] = useState(0)
    const navRef: any = useRef()

    useEffect(() => {
        setWidth(navRef.current.scrollWidth - navRef.current.offsetWidth)
    }, [displayedMatches])
    
    return (
        <motion.div ref={navRef}>
            <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width}} 
            className='flex flex-row gap-4' 
            whileTap={{cursor:"grabbing"}}>
                {displayedMatches.map((val: any, key: number) => {
                    return (
                        <MatchInformation matchInfo={val} index={key}/>
                    )
                })}
            </motion.div>
        </motion.div>
    )
}

export default MatchNav