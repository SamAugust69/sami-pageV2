"use client"
import { FC, useState, useEffect } from 'react'
import Paragraph from '@/ui/Paragraph'
import Heading from '@/ui/Heading'
import { motion, LayoutGroup } from 'framer-motion'
import LogSelectorTab from '@/components/LogSelectorTab'

interface TopCardsProps {
    localData: any
    remoteData: any
}


const TopCards: FC<TopCardsProps> = ({localData, remoteData}) => {

    const [ totalLogs, setTotalLogs ] = useState(0)

    useEffect(() => {
        setTotalLogs(remoteData !== null && localData !== null ? (localData + remoteData) : 0)
        // if (!remoteData === null && localData !== null) {
        //     setTotalLogs(localData.length + remoteData.length)
        //     console.log(totalLogs)
        // }
    }, [localData, remoteData])

    return (
        <div className='flex border-2 rounded border-slate-400 dark:border-slate-800 bg-slate-200 dark:bg-slate-600 shadow-md' >
            <div className=' p-6 py-4'>
                <Heading size='sm' className='font-bold text-left'>{localData}</Heading>
                <Paragraph size="sm" className='font-normal text-slate-600 dark:text-slate-300 text-left'>Local Data</Paragraph>
            </div>
            <div className=' p-6 py-4'>
                <Heading size='sm' className='font-bold text-left'>{remoteData}</Heading>
                <Paragraph size="sm" className='font-normal text-slate-600 dark:text-slate-300 text-left'>Remote Logs</Paragraph>
            </div>
            <div className=' p-6 py-4'>
                <Heading size='sm' className='font-bold text-left'>{totalLogs}</Heading>
                <Paragraph size="sm" className='font-normal text-slate-600 dark:text-slate-300 text-left'>Total Logs</Paragraph>
            </div>
        </div>
    )
}

export default TopCards