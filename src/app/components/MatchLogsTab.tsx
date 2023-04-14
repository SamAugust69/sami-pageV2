"use client"
import { FC } from 'react'
import MatchInformation from '@/components/MatchInformation'


interface NewLogProps {
    matchInfo: Array<string>
}


const MatchLogsTab: FC<NewLogProps> = ({matchInfo}) => {
    console.log(matchInfo.filter((match: any) => 
        typeof match.match === "string" && 
        match.match.includes("1")
    ))
    return (
        //map over each match, return ->
        <div className='h-128 items-center flex flex-col overflow-scroll scrollbar-2-thin'>
            {matchInfo.map((val: any, key: number) => {
                console.log(val)
                return (<MatchInformation key={key} matchInfo={val}/>)
            })}
        </div>
    )
}

MatchLogsTab.displayName = "MatchLogsTab"
export default MatchLogsTab