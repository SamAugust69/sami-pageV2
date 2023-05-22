import MatchInformation from './MatchInformation'
import { FC, HTMLAttributes } from 'react'
import { v4 } from "uuid"
import Paragraph from '@/ui/Paragraph'
import Link from 'next/link'
import HorizontalScroll from './ui/HorizontalScroll'

interface MatchNavProps extends HTMLAttributes<HTMLDivElement> {
    displayedMatches: any
    setDisplayedLogs: any
    displayedLogs: any
    matchData: any
    currentData: any
}

const MatchNav: FC<MatchNavProps> = ({displayedMatches, setDisplayedLogs, displayedLogs, matchData, currentData, className}) => {
    return (
        <HorizontalScroll className={className}>
            <div 
            className={`flex flex-row gap-4 ${displayedMatches.length < 1 ? "justify-center": ""}`}
            >
                {displayedMatches.length > 0 ?
                    displayedMatches.map((val: any, key: number) => {
                        //test={() => {setDisplayedLogs([...displayedLogs, {}]); console.log(displayedLogs)}}
                        return (
                            <MatchInformation matchData={matchData} currentData={currentData} displayedLogs={displayedLogs} setDisplayedLogs={setDisplayedLogs} key={key} matchInfo={val} index={key}/>
                        )
                    })
                    :
                    <Paragraph size="sm" className='w-80 md:w-full border-2 m-0 border-slate-400 dark:border-slate-800 rounded p-2 bg-slate-200 dark:bg-slate-600 shadow-md'>no results {" "} <Link className="underline hover:text-slate-900 hover:dark:text-slate-300 transition-colors" href="/documentation">get adding!</Link></Paragraph>
                }
            </div>
        </HorizontalScroll>
    )
}

export default MatchNav