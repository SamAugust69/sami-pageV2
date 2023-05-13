"use client"
import { FC, useEffect, useState } from 'react'
import { v4 } from "uuid"


interface LogsSectionProps {
    logsToDisplay: any
}

const LogsSection: FC<LogsSectionProps> = ({logsToDisplay}) => {

    const [logs, setLogs] = useState<any>(logsToDisplay)
    console.log(logsToDisplay)
    useEffect(() => {
        setLogs(logsToDisplay)
        console.log(typeof logs)
    }, [logsToDisplay])

    return (
        <div className='rounded bg-black'>
            <p>testa</p>
            {logs !== null &&
                logs.map((val: any) => {
                    return (
                        <div key={v4()}>{val.id}</div>
                    )
                })
            }
        </div>
    )
}

export default LogsSection