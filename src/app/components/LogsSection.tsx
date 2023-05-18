"use client"
import { FC, useEffect, useState } from 'react'
import { v4 } from "uuid"
import HorizontalScroll from './ui/HorizontalScroll'
import Log from './Log'


interface LogsSectionProps {
    logsToDisplay: any
}

const LogsSection: FC<LogsSectionProps> = ({logsToDisplay}) => {

    const [logs, setLogs] = useState<any>(logsToDisplay)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        console.log(logsToDisplay)
        setLogs(logsToDisplay)
        console.log(typeof logs)
    }, [logsToDisplay])


    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <HorizontalScroll className='flex gap-4'>
            {isMounted === true && logs != null && logs.length > 0 ? (
                logs.map((val: any, key: number) => {
                    return (
                        <Log data={val} key={key}/>
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