"use client"

import { FC, useEffect, useState, createRef } from 'react'
import {Button} from '@/ui/Button'
import MatchLogsTab from "@/components/MatchLogsTab"
import SearchBar from "@/ui/SearchBar"

interface ServerLogsProps {
    serverLogs: any
}

// {
//     "match": "1",
//     "teams": [
//         {"team": "345"},
//     ]
// },



const ServerLogs: FC<ServerLogsProps> = ({serverLogs}) => {
    const [serverLogsData, setServerLogsData] = useState(serverLogs)
    const [matchInfo, setMatchInfo] = useState<any>([]);
    const [filter, setFilter] = useState<string>("")
    const [query, setQuery] = useState<string>("")

    // const [matchInfo, setMatchInfo] = useState([
    //     {match: "", teams: []}
    // ])

    const matchSort = (a: any, b: any) => {
        return parseInt(a.match) - parseInt(b.match)
    } 

    const generateMatchs = () => {
        console.log(`Generating Match Info... w/ ${serverLogsData.length} Logs`)
        console.log(serverLogsData)

        var newMatches = matchInfo
        serverLogsData.map((val: any) => {
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
            serverLogsData.map((val: any) => {
                if (val.info.match[0] === match.match) {
                    // match.teams.some((ele: any) => ele.)
                    match.teams = [...match.teams, {team: val.info.team[0]}]
                }
            })
            
        })

        const setFilter = (filter: string) => {
            setFilter(filter)
        }

        setMatchInfo(newMatches.sort(matchSort))
        console.log(newMatches.sort(matchSort))
    }


    useEffect(() => {
        generateMatchs()
    }, [])
    
    return (
        <div className='container border flex rounded flex-col md:flex-row border-slate-900 dark:border-slate-200 dark:bg-slate-910 bg-slate-310 shadow-md'>
            <div className='md:border-r border-slate-900 dark:border-slate-200'>
            <SearchBar size="sm" currentFilter={setFilter} filters={[ {"id": "0", "label": "Match", "selected": "true"}, {"id": "1", "label": "Team", "selected": "false"} ]} onChange={(e) => {setQuery(e.target.value)}}/>
                <div className='p-2 gap-2 flex justify-center border-slate-900 dark:border-slate-200 max-w-[26rem] overflow-hidden'>
                    <Button>New Log</Button>
                    <Button>Save Logs</Button>
                    <Button>Import Logs</Button>
        
                </div>
                <MatchLogsTab matchInfo={matchInfo.filter((item: any) => {
                    // item.teams.filter((item: any) => {console.log(item.team); return item.team.includes(query)
                    console.log(item)
                    return query.toLowerCase() === "" ? item : item.match.includes(query)
                })}/>
            </div>
            <div className='h-[calc(16rem*2.5)]  p-2 overflow-y-scroll border-t md:border-t-0 w-full border-slate-900 dark:border-slate-200 flex align-center justify-center flex-wrap gap-2'>

            </div>
        </div>
    )
}

export default ServerLogs


