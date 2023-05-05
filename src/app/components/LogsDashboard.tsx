"use client"

import { FC, useEffect, useState } from 'react'
import { useLocalStorage } from '@rehooks/local-storage';
import TopCards from '@/components/TopCards';
import Heading from '@/ui/Heading';
import MatchNav from './MatchNav';


const matchSort = (a: any, b: any) => {
    return parseInt(a.match) - parseInt(b.match)
} 

const generateMatches = (data: any, matches: any, setMatches: any) => {
    var newMatches = matches
    data.map((val: any) => {
        // iterate through current match info, if val.info.match[0]( logs match number ) does not exist in matchinfo, 

        //  NEVER TRY AND SET A STATE IN A LOOP!!!!!
        if (newMatches.some((ele: any) => ele.match === val.info.match[0]) === false && val.info.match[0] != 0) {
            //add match
            newMatches = [...newMatches, {
                "match": `${val.info.match[0]}`,
                "teams": []
            }]
        }
    })

    newMatches.map((match: any) => {
        data.map((val: any) => {
            if (val.info.match[0] === match.match) {
                // match.teams.some((ele: any) => ele.)
                match.teams = [...match.teams, {team: val.info.team[0]}]
            }
        })
        
    })

    const setFilter = (filter: string) => {
        setFilter(filter)
    }

    setMatches(newMatches.sort(matchSort))
}

interface LogsDashboardProps {
    remoteLogs: Array<any>
}


// what're we tryna do, we're going to rend
const LogsDashboard: FC<LogsDashboardProps> = ({remoteLogs}) => {
    const [ remoteData, setRemoteData ] = useLocalStorage<any>("remote-data") // stores match information from server
    const [ localData, setLocalData ] = useLocalStorage<any>("local-data") // stores local match information from scout

    const logs = [
        {id: "server", label: "Server Logs", amount: remoteData.length ? remoteData.length : 0},
        {id: "local", label: "Local Logs", amount: localData.length ? localData.length : 0},
    ]

    const [ displayedMatches, setDisplayedMatches ] = useState<any>([])
    const [ activeLog, setActiveLog ] = useState(logs[0].id) // stores active log(server, local)

    

    if (remoteData === undefined || remoteData === null) setRemoteData(remoteLogs)
    if (localData === undefined || localData === null) setLocalData([])

    useEffect(() => {
        if (!remoteData) return
        generateMatches(remoteData, displayedMatches, setDisplayedMatches)
    }, [remoteData])

    return (
        <>
            <div className='px-4 flex flex-col w-full'>
                <Heading size="sm" className='text-slate-700 font-medium text-left py-2'>Dashboard</Heading>
                <TopCards logs={logs} activeLog={activeLog} setActiveLog={setActiveLog}/>
                <span className='border-b-2 w-full border-slate-400 my-4'/>
                <MatchNav displayedMatches={displayedMatches}/>
            </div>
        </>
    )
}

export default LogsDashboard