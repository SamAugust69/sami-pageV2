"use client"
import { FC, useState } from 'react'
import Paragraph from '@/ui/Paragraph'
import Heading from '@/ui/Heading'
import { motion } from 'framer-motion'

interface TopCardsProps {
    activeLog: any
    setActiveLog: any
    logs: any
}


const TopCards: FC<TopCardsProps> = ({activeLog, setActiveLog, logs}) => {
    return (
        <div className='grid gap-4 lg:grid-cols-2' >
            <div className='border-2 rounded border-slate-400 dark:border-slate-800 bg-slate-200 dark:bg-slate-600 p-6 py-4 w-full'>
                <Heading className='font-bold text-left'>218</Heading>
                <Heading size="sm" className='font-normal text-slate-600 dark:text-slate-400 text-left'>Total Logs</Heading>
            </div>
            <div className='border-2 rounded border-slate-400 dark:border-slate-800 bg-slate-200 dark:bg-slate-600 px-6 py-2 w-full flex justify-between gap-2'>
                {logs.map((val: any, key: number) => {
                    return (
                        <div key={key} className='rounded p-2 w-1/2 flex items-center justify-center flex-col relative cursor-pointer' onClick={() => setActiveLog(val.id)}>
                            {activeLog === val.id && (
                                <motion.div 
                                className='bg-slate-300 w-full h-full absolute'
                                layoutId='active-log'
                                />
                            )}
                            <Heading size="xs" className='font-normal text-slate-500 relative z-10'>{val.label}</Heading>
                            <p className='font-normal text-xl relative z-10'>{val.amount}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TopCards