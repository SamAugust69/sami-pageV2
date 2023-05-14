"use client"
import { FC, useEffect, useState } from 'react'
import { v4 } from "uuid"


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
        <div>
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
                        <div key={v4()}>{val.id}</div>
                    )
                })
            ) : (
                <div>No Logs Found</div>
            )
            }
        </div>
    )
}

export default LogsSection