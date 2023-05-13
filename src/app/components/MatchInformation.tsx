import { FC, HTMLAttributes, useState } from 'react'
import Paragraph from '@/ui/Paragraph'
import {Button} from '@/ui/Button'
import TeamLogTab from '@/components/TeamLogTab'
import { motion, AnimatePresence } from "framer-motion"

interface MatchInformationProps extends HTMLAttributes<HTMLDivElement> {
    matchInfo: any
    index: number
    displayedLogs: any
    setDisplayedLogs: any
    matchData: any
    currentData: any
}

const MatchInformation: FC<MatchInformationProps> = ({currentData, matchInfo, index, displayedLogs, setDisplayedLogs, matchData}) => {
    // put this into a comp. later
    const [ open, setOpen ] = useState(false)

    return (
            <motion.div 
            className='flex-shrink-0 self-start flex-grow-0 border-2 rounded border-slate-400 dark:border-slate-800 bg-slate-200 dark:bg-slate-600 shadow-md w-80 md:w-96'
            transition={{ duration: .1, delay: index * 0.02 }}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1}}

            >
                <div className={` ${open ? "border-b-2" : ""} border-slate-400 dark:border-slate-800 flex justify-between items-center p-2`}>
                    <Button size="sm" onClick={() => setOpen(!open)}>Close</Button>
                    <div className='flex flex-col h-9'>
                        <Paragraph size="sm" className='m-0 text-right'>Match {matchInfo.match}</Paragraph>
                        <Paragraph size="xs" className='m-0 text-slate-900 font-light relative -top-2 text-right'>{matchInfo.teams.map((data: any, key: number) => { return (`${data.team}${key !== matchInfo.teams.length - 1 ? "," : ""} `) })}</Paragraph>
                    </div>
                </div>
                    {open &&
                    <motion.div 
                    className='py-1'
                    transition={{ duration: .1 }}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1}}
                    exit={{ y: -10, opacity: 0 }}
                    >
                        {matchInfo.teams.map((val: any, key: number) => {
                            return (<TeamLogTab currentData={currentData} matchData={matchData} displayedLogs={displayedLogs} setDisplayedLogs={setDisplayedLogs} className={key % 2 === 0 && "bg-slate-300 dark:bg-[#424f61]"} key={key} teamData={val}/>)
                        })}
                    </motion.div>
                    }
            </motion.div>
    )
}

export default MatchInformation