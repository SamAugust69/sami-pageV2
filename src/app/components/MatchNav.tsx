import { motion } from 'framer-motion'
import MatchInformation from './MatchInformation'
import { FC, useEffect, useRef, useState } from 'react'
import Paragraph from '@/ui/Paragraph'
import Link from 'next/link'

interface MatchNavProps {
    displayedMatches: any
    setDisplayedLogs: any
}

const MatchNav: FC<MatchNavProps> = ({displayedMatches, setDisplayedLogs}) => {
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
        <motion.div ref={navRef} className={`my-4 scrollbar-hide overflow-scroll relative h-24`}>
            <motion.div 
            dragConstraints={{ right: 0, left: -width}} 
            className={`flex flex-row gap-4 ${displayedMatches.length < 1 ? "justify-center": ""}`}
            >
                {displayedMatches.length > 0 ?
                    displayedMatches.map((val: any, key: number) => {
                        return (
                            <MatchInformation key={key} matchInfo={val} index={key}/>
                        )
                    })
                    :
                    <Paragraph size="sm" className='w-80 md:w-full border-2 border-slate-400 dark:border-slate-800 rounded p-2 bg-slate-200 dark:bg-slate-600 shadow-md'>no results {" "} <Link className="underline hover:text-slate-900 hover:dark:text-slate-300 transition-colors" href="/documentation">get adding!</Link></Paragraph>
                }
            </motion.div>
        </motion.div>
    )
}

export default MatchNav