"use client"
import { FC, HTMLAttributes, useEffect, useState } from 'react'
import { v4 } from "uuid"
import HorizontalScroll from './ui/HorizontalScroll'
import { EditableLog, Log } from './Log'
import { cn } from '../lib/utils'


interface LogsSectionProps extends HTMLAttributes<HTMLDivElement> {
    logsToDisplay: any
}

const LogsSection: FC<LogsSectionProps> = ({logsToDisplay, className}) => {

    const [logs, setLogs] = useState<any>(logsToDisplay)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setLogs(logsToDisplay)
    }, [logsToDisplay])


    useEffect(() => {
        setIsMounted(true)
    }, [])
    
    useEffect(() => {
        console.log(logs)
    }, [logs])

    return (
        <HorizontalScroll className={cn(`flex gap-4 ${className}`)}>
            {isMounted === true && logs != null && logs.length > 0 ? (
                logs.map((val: any, key: number) => {
                    return (
                        val.disabled === false ?
                        <EditableLog data={val} key={key}/> :
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