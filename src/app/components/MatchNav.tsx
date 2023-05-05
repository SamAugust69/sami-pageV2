import { motion } from 'framer-motion'
import { FC, useEffect, useRef, useState } from 'react'

interface MatchNavProps {

}

const MatchNav: FC<MatchNavProps> = ({}) => {
    const [ width, setWidth ] = useState(0)
    const navRef: any = useRef()

    useEffect(() => {
        setWidth(navRef.current.scrollWidth - navRef.current.offsetWidth)
    }, [])

    return (
        <motion.div ref={navRef}>
            <motion.div drag="x" dragConstraints={{ right: 0, left: -width}} className='flex flex-row gap-4' whileTap={{cursor:"grabbing"}}>
                <div className=' border-2 flex-shrink-0 rounded border-slate-400 dark:border-slate-800 bg-slate-200 dark:bg-slate-600 w-96'>
                    fart
                </div>
                <div className=' border-2 flex-shrink-0 rounded border-slate-400 dark:border-slate-800 bg-slate-200 dark:bg-slate-600 w-96'>
                    fart
                </div>
                <div className=' border-2 flex-shrink-0 rounded border-slate-400 dark:border-slate-800 bg-slate-200 dark:bg-slate-600 w-96'>
                    fart
                </div>
                <div className=' border-2 flex-shrink-0 rounded border-slate-400 dark:border-slate-800 bg-slate-200 dark:bg-slate-600 w-96'>
                    fart
                </div>
            </motion.div>
        </motion.div>
    )
}

export default MatchNav