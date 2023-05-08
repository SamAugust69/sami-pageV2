
import { FC, useState, useEffect } from 'react'
import Paragraph from '@/ui/Paragraph'
import Heading from '@/ui/Heading'
import { motion } from 'framer-motion'

interface TopCardsProps {
    activeLog: any
    setActiveLog: any
    logs: any
}


const TopCards: FC<TopCardsProps> = ({activeLog, setActiveLog, logs}) => {

    const [ totalLogs, setTotalLogs ] = useState(0)
    return (
        <div className='grid gap-4 lg:grid-cols-2' >
            <div className='border-2 rounded border-slate-400 dark:border-slate-800 bg-slate-200 dark:bg-slate-600 p-6 py-4 w-full shadow-md'>
                <Heading className='font-bold text-left'>{totalLogs}</Heading>
                <Heading size="sm" className='font-normal text-slate-600 dark:text-slate-300 text-left'>Total Logs</Heading>
            </div>
            <div className='border-2 rounded border-slate-400 dark:border-slate-800 bg-slate-200 dark:bg-slate-600 px-6 py-2 w-full flex justify-between gap-2 shadow-md'>
                {logs.map((val: any, key: number) => {
                    const [ amount, setAmoumt] = useState(0)

                    useEffect(() => {
                        setAmoumt(val.amount.length)
                    }, [])
                    return (
                        <div key={key} className='rounded p-2 w-1/2 flex items-center justify-center flex-col relative cursor-pointer' onClick={() => setActiveLog(val.id)}>
                            {activeLog === val.id && (
                                <motion.div 
                                className='bg-slate-300 dark:bg-slate-700 w-full h-full absolute'
                                layoutId='active-log'
                                />
                            )}
                            <Heading size="xs" className='font-normal text-slate-500 relative z-10'>{val.label}</Heading>
                            <p className='font-normal text-xl relative z-10'>{amount}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TopCards