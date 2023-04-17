"use client"

import { FC } from 'react'
import Button from '@/ui/Button'
import MatchLogsTab from "@/components/MatchLogsTab"
import SearchBar from "@/ui/SearchBar"
import Log from "@/components/Log"

interface ServerLogsProps {
    matchInfo: any
}


const ServerLogs: FC<ServerLogsProps> = ({matchInfo}) => {
    return (
        <div className='container border flex rounded flex-col md:flex-row border-slate-900 dark:border-slate-200 dark:bg-slate-910 bg-slate-310 shadow-md'>
            <div className='md:border-r border-slate-900 dark:border-slate-200'>
                <div className='p-2 border-b gap-2 flex justify-center border-slate-900 dark:border-slate-200'>
                    <Button>New Log</Button>
                    <Button>Save Logs</Button>
                    <Button>Import Logs</Button>
                </div>
                <SearchBar onChange={() => {console.log("Fart")}}/>
                <MatchLogsTab matchInfo={matchInfo}/>
            </div>
            <div className='p-2 border-t md:border-t-0 w-full border-slate-900 dark:border-slate-200 flex align-center justify-center flex-wrap gap-2'>
                <Log />
                <Log />
                <Log />
                <Log />
                <Log />
            </div>
        </div>
    )
}

export default ServerLogs