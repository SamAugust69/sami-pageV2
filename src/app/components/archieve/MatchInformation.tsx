import { FC, useState } from 'react'
import Paragraph from '@/ui/Paragraph'
import {Button} from '@/ui/Button'
import TeamLogTab from '@/app/components/TeamLogItem'
import { motion, AnimatePresence } from "framer-motion"

interface MatchInformationProps {
    matchInfo: any
    index: number
}

const MatchInformation: FC<MatchInformationProps> = ({matchInfo, index}) => {
    // put this into a comp. later
    const [ open, setOpen ] = useState(false)

    return (
            <motion.div 
            className='rounded border border-slate-700 dark:border-slate-600 shadow-md dark:bg-slate-800 w-80 md:w-96 m-2'
            transition={{ duration: .1, delay: index * 0.02 }}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1}}

            >
                <div className='border-b border-slate-700 dark:border-slate-600 flex justify-between items-center p-2 '>
                    <Button size="sm" onClick={() => setOpen(!open)}>Close</Button>
                    <div className='flex flex-col h-9'>
                        <Paragraph size="sm" className='m-0 text-right'>Match {matchInfo.match}</Paragraph>
                        <Paragraph size="xs" className='m-0 text-slate-900 font-light relative -top-2 text-right'>{matchInfo.teams.map((data: any, key: number) => { return (`${data.team}${key !== matchInfo.teams.length - 1 ? "," : ""} `) })}</Paragraph>
                    </div>
                </div>
                    {open &&
                    <motion.div 
                    className='py-1 border-slate-600 last-of-type:div'
                    transition={{ duration: .1 }}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1}}
                    exit={{ y: -10, opacity: 0 }}
                    >
                        {matchInfo.teams.map((val: any, key: number) => {
                            return (<TeamLogTab className={key % 2 === 0 && "bg-slate-350 dark:bg-slate-850"} key={key} teamData={val}/>)
                        })}
                    </motion.div>
                    }
            </motion.div>
    )
}

export default MatchInformation