"use client"

import { FC, useEffect, useState } from 'react'
import { useLocalStorage } from '@rehooks/local-storage';

import TopCards from '@/components/TopCards';
import Heading from '@/ui/Heading';
import MatchNav from '@/components/MatchNav';
import SearchBar from '@/ui/SearchBar';
import LogsSection from '@/components/LogsSection';
import axios from 'axios';
import LogButtons from './LogButtons';


const matchSort = (a: any, b: any) => {
    return parseInt(a.match) - parseInt(b.match)
} 

const generateMatches = (data: any, setMatches: any) => {
    console.log("generating matches...")
    var newMatches: any = []
    if (data === null) return
    data.map((val: any) => {
        // iterate through current match info, if val.info.match[0]( logs match number ) does not exist in matchinfo, 

        //  NEVER TRY AND SET A STATE IN A LOOP!!!!!
        if (newMatches.some((ele: any) => ele.match === val.info.match[0]) === false && val.info.match[0] != 0) {
            //add match
            newMatches = [...newMatches, {
                "match": `${val.info.match[0]}`,
                "teams": [],
            }]
        }
    })

    newMatches.map((match: any) => {
        data.map((val: any) => {
            if (val.info.match[0] === match.match) {
                match.teams = [...match.teams, {team: val.info.team[0], match: val.info.match[0], id: val.id}]
            }
        })
        
    })

    const setFilter = (filter: string) => {
        setFilter(filter)
    }

    setMatches(newMatches.sort(matchSort))
}

interface LogsDashboardProps {
}

const fetchLogs = async (setLog: any) => {
    axios.request({method: 'GET', url: 'https://api.samifart.com/'})
        .then((response) => {
            console.log("recieved logs")
            setLog(response.data)
        })
        .catch((error) => {
            throw error
        })
}


const LogsDashboard: FC<LogsDashboardProps> = ({}) => {
    // locally stored
    const [ remoteData, setRemoteData ] = useLocalStorage<any>("remote-data") // stores match information from server
    const [ localData, setLocalData ] = useLocalStorage<any>("local-data") // stores local match information from scout

    const logs = [
        {id: "server", label: "Server Logs", amount: remoteData},
        {id: "local", label: "Local Logs", amount: localData},
    ]
    
    // match displayed states
    const [ displayedMatches, setDisplayedMatches ] = useState<any>([])
    const [ displayedLogs, setDisplayedLogs ] = useLocalStorage<any>("displayed-logs")
    const [ currentData, setCurrentData ] = useState(remoteData)
    const [ activeLog, setActiveLog ] = useState(logs[0].id)

    // search states
    const [filter, setFilter] = useState<string>("")
    const [query, setQuery] = useState<string>("")


    useEffect(() => {
        fetchLogs(setRemoteData)
        if (remoteData === undefined || remoteData === null) {}
        if (localData === undefined || localData === null) setLocalData([])
        if (displayedLogs === undefined || displayedLogs === null) setDisplayedLogs([])
        generateMatches(currentData, setDisplayedMatches)
    }, [])

    useEffect(() => {
        console.log(`switching displayed matches... ${activeLog}`)
        if (activeLog === "local") {
            setCurrentData(localData)
        } else {
            setCurrentData(remoteData)
        }
    }, [activeLog])

    useEffect(() => {
        generateMatches(currentData, setDisplayedMatches)
        console.log(displayedMatches)
    }, [currentData])

    return (
        <>
            <div className='px-4 flex flex-col w-full'>
                <Heading size="sm" className='text-slate-700 font-medium text-left py-2'>Dashboard</Heading>
                <TopCards activeLog={activeLog} setActiveLog={setActiveLog} remoteData={remoteData} localData={localData}/>
                <span className='border-b-2 w-full border-slate-400 my-4'/>
                <SearchBar onChange={(e) => {setQuery(e.target.value)}} currentFilter={setFilter} filters={[ {"id": "0", "label": "Match", "selected": "true"}, {"id": "1", "label": "Team", "selected": "false"} ]}/>
                <MatchNav displayedMatches={displayedMatches.filter((item: any) => {
                    return query.toLowerCase() === "" ? item : item.match.includes(query)
                })
                } setDisplayedLogs={setDisplayedLogs} displayedLogs={displayedLogs} currentData={currentData} matchData={displayedMatches}/>
                
                <LogsSection logsToDisplay={displayedLogs}/>
            </div>
        </>
    )
}

export default LogsDashboard

// add pecent value for each teams score controbutiom in a match
// add first few parts of motes to quick info!

//TODO(from ver.1):

//SEARCH
//sort by match number
//sort by team number 
//reverse order

//OPTIMOZE
//when closed, delete data
//load data in chunks

//FEATURES
//google sheet automation
//add from image(no?)
//save page state

//INFO
//starting pos
//drive train?