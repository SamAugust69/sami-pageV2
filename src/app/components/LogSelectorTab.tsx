import { FC, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Heading from '@/ui/Heading'
import { v4 } from 'uuid'

interface LogSelectorTabProps {
    activeLog: any,
    setActiveLog: any
    label: any,
    logs: any
    id: any
}

const LogSelectorTab: FC<LogSelectorTabProps> = ({id, label, logs, activeLog, setActiveLog}) => {
    const [ amount, setAmoumt] = useState(0)

    useEffect(() => {
        logs != null && setAmoumt(logs.length)
    }, [logs])

    return (
        <div key={v4()} className='rounded p-2 w-1/2 flex items-center justify-center flex-col relative cursor-pointer' onClick={() => setActiveLog(id)}>
            <motion.div 
            className={`${activeLog === id ? "bg-slate-300 dark:bg-slate-700" : ""} rounded w-full h-full absolute transition-all`}
            />
            <Heading size="xs" className='font-normal text-slate-500 relative z-10'>{label}</Heading>
            <p className='font-normal text-xl relative z-10'>{amount}</p>
        </div>
    )
}

export default LogSelectorTab