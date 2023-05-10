
import { FC, useState, useEffect } from 'react'
import Paragraph from '@/ui/Paragraph'
import Heading from '@/ui/Heading'
import { motion, LayoutGroup } from 'framer-motion'
import LogSelectorTab from '@/components/LogSelectorTab'

interface TopCardsProps {
    activeLog: any
    setActiveLog: any
    localData: any
    remoteData: any
}


const TopCards: FC<TopCardsProps> = ({activeLog, setActiveLog, localData, remoteData}) => {

    const [ totalLogs, setTotalLogs ] = useState(0)
    return (
        <div className='grid gap-4 lg:grid-cols-2' >
            <div className='border-2 rounded border-slate-400 dark:border-slate-800 bg-slate-200 dark:bg-slate-600 p-6 py-4 w-full shadow-md'>
                <Heading className='font-bold text-left'>{totalLogs}</Heading>
                <Heading size="sm" className='font-normal text-slate-600 dark:text-slate-300 text-left'>Total Logs</Heading>
            </div>
            <div className='border-2 rounded border-slate-400 dark:border-slate-800 bg-slate-200 dark:bg-slate-600 px-6 py-2 w-full flex justify-between gap-2 shadow-md'>
            <LayoutGroup>
                <LogSelectorTab label="Server Logs" logs={remoteData} id="server" activeLog={activeLog} setActiveLog={setActiveLog}/>
                <LogSelectorTab label="Local Logs" logs={localData} id="local" activeLog={activeLog} setActiveLog={setActiveLog}/>
            </LayoutGroup>
            </div>
        </div>
    )
}

export default TopCards