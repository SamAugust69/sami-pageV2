"use client"
import { FC } from 'react'
import MatchInformation from '@/components/MatchInformation'
import Paragraph from '@/ui/Paragraph'
import Link from 'next/link'


interface NewLogProps {
    matchInfo: Array<string>
}


const MatchLogsTab: FC<NewLogProps> = ({matchInfo}) => {
    // console.log(matchInfo.filter((match: any) => 
    //     typeof match.match === "string" && 
    //     match.match.includes("1")
    // ))
    return (
        //map over each match, return ->
        <div className='h-128 items-center flex flex-col overflow-scroll'>
            {matchInfo[0] == undefined && <Paragraph size="sm" className='w-80 md:w-96 m-2'>no results {" "} <Link className="underline hover:text-slate-900 hover:dark:text-slate-300 transition-colors" href="/documentation">get adding!</Link></Paragraph>}
            {matchInfo.map((val: any, key: number) => {
                return (<MatchInformation key={key} index={key }matchInfo={val}/>)
            })}
        </div>
    )
}

MatchLogsTab.displayName = "MatchLogsTab"
export default MatchLogsTab