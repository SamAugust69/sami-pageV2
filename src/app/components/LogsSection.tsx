"use client"
import { FC, useEffect, useState } from 'react'
import { v4 } from "uuid"
import HorizontalScroll from './ui/HorizontalScroll'


interface LogsSectionProps {
    logsToDisplay: any
}

const LogsSection: FC<LogsSectionProps> = ({logsToDisplay}) => {

    const [logs, setLogs] = useState<any>(logsToDisplay)
    const [isMounted, setIsMounted] = useState(false)
    console.log(logsToDisplay)
    useEffect(() => {
        setLogs(logsToDisplay)
        console.log(typeof logs)
    }, [logsToDisplay])


    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <HorizontalScroll className='flex gap-4'>
            {/* {
                logs !== null &&
                logs.map((val: any) => {
                    return (
                        <div key={v4()}>{val.id}</div>
                    )
                })
            } */}
            {isMounted === true && logs != null && logs.length > 0 ? (
                logs.map((val: any) => {
                    return (
                        <div key={v4()} className='flex-shrink-0 self-start rounded border-2 border-slate-400 dark:border-slate-800 bg-slate-200 dark:bg-slate-600 shadow-2xl w-80 md:w-96'>
                            {val.id}
                        </div>
                    )
                })
            ) : (
                <div>No Logs Found</div>
            )
            }
        </HorizontalScroll>
    )
}

export default LogsSection