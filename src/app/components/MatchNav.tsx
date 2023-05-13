import { motion } from 'framer-motion'
import MatchInformation from './MatchInformation'
import { FC, useEffect, useRef, useState } from 'react'
import { v4 } from "uuid"
import Paragraph from '@/ui/Paragraph'
import Link from 'next/link'
import { getEventListeners } from 'events'

interface MatchNavProps {
    displayedMatches: any
    setDisplayedLogs: any
    displayedLogs: any
    matchData: any
    currentData: any
}

const MatchNav: FC<MatchNavProps> = ({displayedMatches, setDisplayedLogs, displayedLogs, matchData, currentData}) => {
    const navRef: any = useRef()

    const handleHorizontalScroll = (e: any) => {
        console.log(e)
        e.preventDefault()
        navRef.current.scrollBy({
            left: -e.wheelDeltaY
        })
    }

    useEffect(() => {
        navRef.current.addEventListener("wheel", handleHorizontalScroll)
    }, [])
    


    return (
        <>
            <motion.div ref={navRef} className={`scrollbar-hide overflow-scroll relative my-8`}>
                <motion.div 
                className={`flex flex-row gap-4 ${displayedMatches.length < 1 ? "justify-center": ""}`}
                >
                    {displayedMatches.length > 0 ?
                        displayedMatches.map((val: any, key: number) => {
                            //test={() => {setDisplayedLogs([...displayedLogs, {}]); console.log(displayedLogs)}}
                            return (
                                <MatchInformation matchData={matchData} currentData={currentData} displayedLogs={displayedLogs} setDisplayedLogs={setDisplayedLogs} key={v4()} matchInfo={val} index={key}/>
                            )
                        })
                        :
                        <Paragraph size="sm" className='w-80 md:w-full border-2 m-0 border-slate-400 dark:border-slate-800 rounded p-2 bg-slate-200 dark:bg-slate-600 shadow-md'>no results {" "} <Link className="underline hover:text-slate-900 hover:dark:text-slate-300 transition-colors" href="/documentation">get adding!</Link></Paragraph>
                    }
                </motion.div>
            </motion.div>
        </>
    )
}

export default MatchNav